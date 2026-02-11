import { Route, Routes } from 'react-router-dom'
import Analyze from './pages/Analyze.jsx'
import Home from './pages/Home.jsx'
import AssistantWidget from './components/AssistantWidget.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
      </Routes>
      <AssistantWidget />
    </>
  )
}

export default App
