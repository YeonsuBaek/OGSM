import { User } from "firebase/auth"

export type OGSM_TYPE = {
  id: number
  objective: string
  goal: string
  strategy: string
  measure: string
  startDate?: string | null
  endDate?: string | null
  isDone?: boolean
}

export const enum NUMBER_SUFFIX {
  NULL = "",
  FIRST = "st",
  SECOND = "nd",
  THIRD = "rd",
  OTHER = "th",
}

export type USER_TYPE = User | null

export type FORM_TYPE = "objective" | "goal" | "strategy" | "measure" | "startDate" | "endDate"

export const enum MODAL_ERROR_MSG {
  LENGTH = "Please keep your input between 1 and 256 characters.",
  DUPLICATE = "Please ensure your input is unique and keep it between 1 and 256 characters.",
}
