import React, { useState, ChangeEvent, useMemo } from "react"
import { SelectChangeEvent } from "@mui/material"
import { FORM_TYPE, OGSM_TYPE, MODAL_ERROR_MSG } from "@/types"
import moment, { Moment } from "moment"
import TextFieldForm from "../../blocks/form/TextFieldForm"
import DatePickerForm from "../../blocks/form/DatePickerForm"
import ModalWrapper from "../../blocks/modal/ModalWrapper"
import ModalFooter from "../../blocks/modal/ModalFooter"

interface NewOgsmModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  ogsmList: OGSM_TYPE[]
  onSave: (newOgsm: OGSM_TYPE) => void
}

const NewOgsmModal = ({ isOpen, setIsOpen, ogsmList, onSave }: NewOgsmModalProps) => {
  const [requiredData, setRequiredData] = useState<{ [key: string]: string }>({
    objective: "",
    goal: "",
    strategy: "",
    measure: "",
  })
  const [date, setDate] = useState<{ [key: string]: Moment | null }>({
    start: null,
    end: null,
  })
  const [formInvalids, setFormInvalids] = useState<FORM_TYPE[]>([])
  const [autoFocus, setAutoFocus] = useState<FORM_TYPE | null>(null)

  const handleChangeInput = (type: FORM_TYPE, e: SelectChangeEvent | ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { value } = e.target

    setAutoFocus(null)
    setRequiredData({ ...requiredData, [type]: value })
    setFormInvalids([])
  }

  const checkLength = (value: number) => {
    const LENGTH = { MIN: 1, MAX: 256 }
    return value >= LENGTH.MIN && value <= LENGTH.MAX
  }

  const isDuplicated = (value: string) => {
    const duplicateValue = ogsmList.filter((ogsm) => ogsm.objective === value)
    return duplicateValue.length >= 1
  }

  const checkInValids = () => {
    const { objective, goal, strategy, measure } = requiredData
    const isValidObject = checkLength(objective.trim().length) && !isDuplicated(objective.trim())
    const isValidGoal = checkLength(goal.trim().length)
    const isValidStrategy = checkLength(strategy.trim().length)
    const isValidMeasure = checkLength(measure.trim().length)

    const invalids: FORM_TYPE[] = []

    if (!isValidObject) {
      invalids.push("objective")
    }
    if (!isValidGoal) {
      invalids.push("goal")
    }
    if (!isValidStrategy) {
      invalids.push("strategy")
    }
    if (!isValidMeasure) {
      invalids.push("measure")
    }

    return invalids
  }

  const handleSave = () => {
    const invalids = checkInValids()

    setFormInvalids(invalids)
    setAutoFocus(invalids[0])

    if (Object.keys(invalids).length > 0) {
      return
    }

    onSave({
      id: Math.random() * 10,
      objective: requiredData.objective.trim(),
      goal: requiredData.goal.trim(),
      strategy: requiredData.strategy.trim(),
      measure: requiredData.measure.trim(),
      startDate: date.start ? moment(date.start).format("YYYY-MM-DD") : null,
      endDate: date.end ? moment(date.end).format("YYYY-MM-DD") : null,
      isDone: false,
    })

    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    setRequiredData({
      objective: "",
      goal: "",
      strategy: "",
      measure: "",
    })
    setDate({ startDate: null, endDate: null })
    setFormInvalids([])
  }

  const isDisabledSaveButton = useMemo(() => {
    const { objective, goal, strategy, measure } = requiredData
    const hasRequiredValues = objective && goal && strategy && measure
    return !hasRequiredValues
  }, [requiredData])

  return (
    <ModalWrapper isOpen={isOpen} title="New OGSM">
      <ul className="ogsm-modal-form-list">
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-object"
            label="Objective"
            required={true}
            invalid={formInvalids.includes("objective")}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === "objective")}
            value={requiredData.objective}
            placeholder="Enter the object"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput("objective", e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-goal"
            label="Goal"
            required={true}
            invalid={formInvalids.includes("goal")}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === "goal")}
            value={requiredData.goal}
            placeholder="Enter the goal"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput("goal", e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-strategy"
            label="Strategy"
            required={true}
            invalid={formInvalids.includes("strategy")}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === "strategy")}
            value={requiredData.strategy}
            placeholder="Enter the strategy"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput("strategy", e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-measure"
            label="Measure"
            required={true}
            invalid={formInvalids.includes("measure")}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === "measure")}
            value={requiredData.measure}
            placeholder="Enter the measure"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput("measure", e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <DatePickerForm
            label="Start Date"
            value={date.startDate}
            onChange={(newDate) => setDate({ ...date, start: newDate || null })}
          />
        </li>
        <li className="ogsm-modal-form">
          <DatePickerForm
            label="End Date"
            value={date.endDate}
            onChange={(newDate) => setDate({ ...date, end: newDate || null })}
          />
        </li>
      </ul>
      <ModalFooter isDisabledSaveButton={isDisabledSaveButton} onClose={handleClose} onSave={handleSave} />
    </ModalWrapper>
  )
}

export default NewOgsmModal
