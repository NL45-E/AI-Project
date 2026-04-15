export function prompt(question, input) {
    return `
Classify into: login, register, info (about us and source), report (if user request), false, bug

Q: "${question}"
A: "${input}"

Return:
{"option":"","reply":"","bug":""}
Rules:
- one option only
- bug="" unless bug
- reply is your response to user (short)
- false if no match
- explain if bug
`;
}