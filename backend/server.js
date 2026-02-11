import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const hasApiKey = Boolean(apiKey)

if (!hasApiKey) {
  console.warn(
    'Warning: GEMINI_API_KEY is not set. Responses will be mocked until you add a valid key to backend/.env.',
  )
}

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const genAI = hasApiKey ? new GoogleGenerativeAI(apiKey) : null

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Uzhavar AI backend is running' })
})

app.post('/chat', async (req, res) => {
  const { message, locale = 'en' } = req.body || {}

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  if (!hasApiKey) {
    return res.status(503).json({
      error: 'AI service is not configured yet. Add GEMINI_API_KEY to backend/.env and restart the server.',
      reply: `(${locale === 'ta' ? 'உங்கள் ஏஐ அமைப்பை பூர்த்தி செய்யுங்கள்.' : 'Configure the AI key to enable live answers.'})`,
    })
  }

  try {
    const systemPrompt =
      'You are an agricultural expert helping farmers from Tamil Nadu. Use simple, encouraging language. Reply in Tamil when the locale is "ta". Otherwise, mirror the user\'s language and keep answers short and actionable.'

    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemPrompt,
    })

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: `User locale: ${locale}\n\nUser message: ${message}` }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
      },
    })

    const reply = result?.response?.text?.()?.trim() || 'No response received.'
    return res.json({ reply })
  } catch (error) {
    console.error('Gemini error:', error)

    const status = error?.status || error?.response?.status || 500
    const detailMessage = error?.message || 'Unknown error'

    return res.status(status).json({
      error: 'Failed to fetch AI response',
      details: detailMessage,
      suggestion:
        status === 401 || status === 403
          ? `Verify your GEMINI_API_KEY has access to ${modelName} and restart the backend.`
          : undefined,
    })
  }
})

app.listen(port, () => {
  console.log(`Uzhavar AI backend is running on http://localhost:${port}`)
})
