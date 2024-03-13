import React, { useState, ChangeEvent } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { FORM_TYPE, MODAL_ERROR_MSG, OGSM_TYPE } from '@/types'
import moment, { Moment } from 'moment'
import TextFieldForm from '../../blocks/form/TextFieldForm'
import DatePickerForm from '../../blocks/form/DatePickerForm'
import { Modal } from '@yeonsubaek/yeonsui'

interface EditOgsmModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  ogsmList: OGSM_TYPE[]
  onDelete: (id: number) => void
  onSave: (newOgsm: OGSM_TYPE) => void
  setSelectedItem: (id: undefined) => void
  ogsm: OGSM_TYPE
}

const EditOgsmModal = ({
  isOpen,
  setIsOpen,
  ogsmList,
  onDelete,
  onSave,
  setSelectedItem,
  ogsm,
}: EditOgsmModalProps) => {
  const [requiredData, setRequiredData] = useState<{ [key: string]: string }>({
    objective: ogsm.objective,
    goal: ogsm.goal,
    strategy: ogsm.strategy,
    measure: ogsm.measure,
  })
  const [date, setDate] = useState<{ [key: string]: Moment | null }>({
    start: ogsm.startDate ? moment(ogsm.startDate) : null,
    end: ogsm.endDate ? moment(ogsm.endDate) : null,
  })
  const [isDone, setIsDone] = useState(ogsm.isDone || false)
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
    return duplicateValue.length > 1
  }

  const checkInValids = () => {
    const { objective, goal, strategy, measure } = requiredData
    const isValidObject = checkLength(objective.trim().length) && !isDuplicated(objective.trim())
    const isValidGoal = checkLength(goal.trim().length)
    const isValidStrategy = checkLength(strategy.trim().length)
    const isValidMeasure = checkLength(measure.trim().length)

    const invalids: FORM_TYPE[] = []

    if (!isValidObject) {
      invalids.push('objective')
    }
    if (!isValidGoal) {
      invalids.push('goal')
    }
    if (!isValidStrategy) {
      invalids.push('strategy')
    }
    if (!isValidMeasure) {
      invalids.push('measure')
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
      id: ogsm?.id,
      objective: requiredData.objective.trim(),
      goal: requiredData.goal.trim(),
      strategy: requiredData.strategy.trim(),
      measure: requiredData.measure.trim(),
      startDate: date.start ? moment(date.start).format('YYYY-MM-DD') : null,
      endDate: date.end ? moment(date.end).format('YYYY-MM-DD') : null,
      isDone,
    })

    handleClose()
  }

  const handleDelete = () => {
    if (ogsm) {
      onDelete(ogsm.id)
    }

    handleClose()
  }

  const handleClose = () => {
    setIsOpen(false)
    setRequiredData({ objective: '', goal: '', strategy: '', measure: '' })
    setDate({ start: null, end: null })
    setIsDone(false)
    setSelectedItem(undefined)
    setFormInvalids([])
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Edit Ogsm"
      onClose={handleClose}
      labelClose="Cancel"
      onSave={handleSave}
      headerButton="Delete"
      onClick={handleDelete}
    >
      <ul className="ogsm-modal-form-list">
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-object"
            label="Objective"
            required={true}
            invalid={formInvalids.includes('objective')}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === 'objective')}
            value={requiredData.objective}
            placeholder="Enter the object"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput('objective', e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-goal"
            label="Goal"
            required={true}
            invalid={formInvalids.includes('goal')}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === 'goal')}
            value={requiredData.goal}
            placeholder="Enter the goal"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput('goal', e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-strategy"
            label="Strategy"
            required={true}
            invalid={formInvalids.includes('strategy')}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === 'strategy')}
            value={requiredData.strategy}
            placeholder="Enter the strategy"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput('strategy', e)}
          />
        </li>
        <li className="ogsm-modal-form">
          <TextFieldForm
            id="new-add-measure"
            label="Measure"
            required={true}
            invalid={formInvalids.includes('measure')}
            errorText={MODAL_ERROR_MSG.LENGTH}
            autoFocus={Boolean(autoFocus === 'measure')}
            value={requiredData.measure}
            placeholder="Enter the measure"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeInput('measure', e)}
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
    </Modal>
  )
}

export default EditOgsmModal
