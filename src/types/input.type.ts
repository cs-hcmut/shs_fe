const userInputs = ["name", "phone", "email", "password", "username"] as const;

const inputNamesSet = new Set([...userInputs] as const);

export const InputFieldNames = Array.from(inputNamesSet);

export type InputFieldName = (typeof InputFieldNames)[number];
