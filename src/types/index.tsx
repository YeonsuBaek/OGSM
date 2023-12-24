export type OGSM_TYPE = {
  id: number
  objective: string
  goal: string
  startDate?: string | null
  endDate?: string | null
  strategy: string
  measure: string
}

export enum NUMBER_SUFFIX {
  NULL = "",
  FIRST = "st",
  SECOND = "nd",
  THIRD = "rd",
  OTHER = "th",
}
