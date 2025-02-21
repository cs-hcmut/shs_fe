const userInputs = [
  "company_code",
  "login_id",
  "name",
  "authority_group",
  "pic_code",
  "pic_number",
  "phone",
  "affiliation",
  "location",
  "department",
  "date_of_employment",
  "zip_code",
  "address_name",
  "address_number",
  "email",
  "password",
] as const;

const inputNamesSet = new Set([...userInputs] as const);

export const InputFieldNames = Array.from(inputNamesSet);

export type InputFieldName = (typeof InputFieldNames)[number];
