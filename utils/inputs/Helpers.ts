export const validateName = (name: string) => {
  return name.length > 5
}

export const validateReason = (reason: string) => {
  return reason.length > 10
}

export const validateEmail = (email: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export const inputsReducer = (state: typeof INPUTS, action: {type: string, payload: string}) => {
  const stateCopy = [...state]
  const inputToUpdate = stateCopy.find((input) => input.type === action.type)
  if (inputToUpdate) {
    inputToUpdate.isValid = inputToUpdate.validate(action.payload)
    inputToUpdate.value = action.payload
  }
  return stateCopy
}

export const INPUTS = [
  {
    type: "email",
    value: "",
    isValid: true,
    validate: validateEmail
  },
  {
    type: "name",
    value: "",
    isValid: true,
    validate: validateName
  },
  {
    type: "reason",
    value: "",
    isValid: true,
    validate: validateReason
  }
]
