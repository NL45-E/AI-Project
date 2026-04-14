export function prompt(question, input) {
    return `
Classify into: login, register, about, false, bug

Q: "${question}"
A: "${input}"

Return:
{"option":"","reply":"","bug":""}
Rules:
- one option only
- bug="" unless bug
- reply is your response to user (short)
- false if no match`;
}