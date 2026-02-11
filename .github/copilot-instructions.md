Use this file to provide workspace specific guidance to Copilot.

- [ ] Verify that the copilot-instructions.md file in the .github directory is created.

- [ ] Clarify Project Requirements. Ask for project type, language, and frameworks if they are not already provided.

- [ ] Scaffold the Project. Ensure the previous step is complete, prefer the project setup tool when possible, run scaffolding commands from the workspace root, and fall back to manual file creation if no template exists.

- [ ] Customize the Project. Confirm the earlier steps are finished, plan the required changes, then apply the modifications with the appropriate tools. Skip this for "Hello World" projects.

- [ ] Install Required Extensions. Only install extensions explicitly listed by the get_project_setup_info tool; otherwise mark this step complete without changes.

- [ ] Compile the Project. Confirm dependencies are installed, run the relevant diagnostics or build commands, and check any markdown instructions in the repo for project specific notes.

- [ ] Create and Run Task. Determine whether a VS Code task is required (see https://code.visualstudio.com/docs/debugtest/tasks). If so, create it with create_and_run_task based on package.json, README.md, and the project structure.

- [ ] Launch the Project. Only after all prior steps are finished. Ask the user whether to launch in debug mode before starting anything.

- [ ] Ensure Documentation is Complete. Confirm README.md and this file exist and reflect the current project state, and keep this file free of HTML comments.

Execution Guidelines
--------------------
Progress Tracking:
- Use the manage_todo_list tool when available to mirror the checklist.
- Mark items complete with short summaries once they are finished.
- Review the current todo status before beginning a new step.

Communication Rules:
- Keep explanations brief and avoid dumping large command outputs.
- When skipping a step, mention that fact succinctly (example: "No extensions needed").
- Only describe the project structure when the user asks.

Development Rules:
- Use the workspace root (.) as the working directory unless the user says otherwise.
- Avoid adding media or external links unless explicitly requested.
- Call out placeholder content so the user knows to replace it.
- Only use the VS Code API tool for extension projects.
- Assume the project is already open in VS Code; do not instruct the user to reopen it elsewhere.
- Honor any additional rules surfaced by the project setup information.

Folder Creation Rules:
- Treat the current directory as the project root.
- When running terminal commands, explicitly operate from '.' to avoid drifting directories.
- Do not create new folders unless the user asks, except for a .vscode folder needed for tasks.json.
- If scaffolding tools complain about folder names, instruct the user to create the correct folder and reopen it in VS Code.

Extension Installation Rules:
- Install only the extensions referenced by the get_project_setup_info tool.

Project Content Rules:
- Default to a "Hello World" implementation when requirements are unspecified.
- Avoid adding unnecessary links or integrations.
- Do not generate images, videos, or other media unless explicitly requested.
- When using placeholder assets, state clearly that they should be replaced later.
- Make sure every generated component has a clear purpose tied to the user's workflow.
- Ask for clarification before building unconfirmed features.
- When creating a VS Code extension, query the VS Code API documentation for the relevant references.

Task Completion Rules:
- Consider the work finished only when the project scaffolding and compilation succeed, this instruction file exists, README.md is current, and the user has clear launch/debug guidance.
- Update the plan before starting any new major step.

Additional Notes:
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices at every stage.
