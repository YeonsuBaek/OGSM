import React, { useState, useEffect, ChangeEvent, useMemo } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { OGSM_TYPE } from "@/types"
import moment, { Moment } from "moment"

interface AddItemModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  ogsm?: OGSM_TYPE
  ogsmList: OGSM_TYPE[]
  onDelete: (id: number) => void
  onSave: (newOgsm: OGSM_TYPE) => void
  setSelectedItem: (id: undefined) => void
}

type FORM_TYPE =
  | "category"
  | "object"
  | "goal"
  | "strategy"
  | "measure"
  | "startDate"
  | "endDate"

type BUTTON_TYPE = "delete" | "cancel" | "save"

const OgsmModal = ({
  isOpen,
  setIsOpen,
  ogsm,
  ogsmList,
  onDelete,
  onSave,
  setSelectedItem,
}: AddItemModalProps) => {
  const [category, setCategory] = useState<string>("Category1")
  const [object, setObject] = useState<string>(ogsm?.object || "")
  const [goal, setGoal] = useState<string>(ogsm?.goal || "")
  const [strategy, setStrategy] = useState<string>(ogsm?.strategy || "")
  const [measure, setMeasure] = useState<string>(ogsm?.measure || "")
  const [startDate, setStartDate] = useState<Moment | null>(null)
  const [endDate, setEndDate] = useState<Moment | null>(null)
  const [clearedDate, setClearedDate] = useState<boolean>(false)
  const [formInvalids, setFormInvalids] = useState<FORM_TYPE[]>([])
  const [autoFocus, setAutoFocus] = useState<FORM_TYPE | null>(null)
  const ERROR_MSG = "Please keep your input between 1 and 256 characters."

  const handleChangeInput = (
    type: FORM_TYPE,
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    const { value } = e.target

    setAutoFocus(null)
    switch (type) {
      case "category":
        setCategory(value)
        break
      case "object":
        setObject(value)
        break
      case "goal":
        setGoal(value)
        break
      case "strategy":
        setStrategy(value)
        break
      case "measure":
        setMeasure(value)
        break
    }

    setFormInvalids([])
  }

  const checkLength = (value: number) => {
    const LENGTH = { MIN: 1, MAX: 256 }
    return value >= LENGTH.MIN && value <= LENGTH.MAX
  }

  const isDuplicated = (value: string) => {
    return ogsmList.findIndex((ogsm) => ogsm.object === value) !== -1
  }

  const checkValids = () => {
    const isValidObject =
      checkLength(object.trim().length) && !isDuplicated(object.trim())
    const isValidGoal = checkLength(goal.trim().length)
    const isValidStrategy = checkLength(strategy.trim().length)
    const isValidMeasure = checkLength(measure.trim().length)

    const invalids = []

    if (!isValidObject) {
      invalids.push("object")
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
    const invalids = checkValids()

    setFormInvalids(invalids as FORM_TYPE[])
    setAutoFocus(invalids[0] as FORM_TYPE)

    if (Object.keys(invalids).length > 0) {
      return
    }

    onSave({
      id: ogsm?.id || Math.random() * 10,
      category: category.trim(),
      object: object.trim(),
      goal: goal.trim(),
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      strategy: strategy.trim(),
      measure: measure.trim(),
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
    setCategory("Category1")
    setObject("")
    setGoal("")
    setStrategy("")
    setMeasure("")
    setStartDate(null)
    setEndDate(null)
    setSelectedItem(undefined)
  }

  const disabledSaveButton = useMemo(() => {
    const hasRequiredValues = category && object && goal && strategy && measure
    if (!ogsm) {
      return !hasRequiredValues
    }

    return (
      !hasRequiredValues ||
      (ogsm.category === category &&
        ogsm.object === object &&
        ogsm.goal === goal &&
        ogsm.strategy === strategy &&
        ogsm.measure === measure &&
        (ogsm?.startDate
          ? ogsm.startDate === moment(startDate).format("YYYY-MM-DD")
          : true) &&
        (ogsm?.endDate
          ? ogsm.endDate === moment(endDate).format("YYYY-MM-DD")
          : true))
    )
  }, [ogsm, category, object, goal, strategy, measure, startDate, endDate])

  useEffect(() => {
    if (ogsm) {
      const { category, object, goal, strategy, measure } = ogsm
      setCategory(category)
      setObject(object)
      setGoal(goal)
      setStrategy(strategy)
      setMeasure(measure)
      setStartDate(ogsm?.startDate ? moment(ogsm.startDate) : null)
      setEndDate(ogsm?.endDate ? moment(ogsm.endDate) : null)
    }
  }, [ogsm])

  useEffect(() => {
    if (clearedDate) {
      const timeout = setTimeout(() => {
        setClearedDate(false)
      }, 0)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [clearedDate])

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Paper elevation={3} className="ogsm-modal">
        <h2 className="ogsm-modal-title">Your OGSM</h2>
        <div className="ogsm-modal-content">
          <ul className="ogsm-modal-form-list">
            <li className="ogsm-modal-form">
              <FormLabel
                required
                htmlFor="select-category"
                className="ogsm-modal-form-title"
              >
                Category
              </FormLabel>
              <FormControl fullWidth>
                <Select
                  id="select-category"
                  value={category}
                  onChange={(e: SelectChangeEvent) =>
                    handleChangeInput("category", e)
                  }
                  size="small"
                >
                  <MenuItem value="Category1">Category1</MenuItem>
                  <MenuItem value="Category2">Category2</MenuItem>
                  <MenuItem value="Category3">Category3</MenuItem>
                </Select>
              </FormControl>
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                required
                htmlFor="add-object"
                className="ogsm-modal-form-title"
              >
                Object
              </FormLabel>
              <TextField
                error={formInvalids.includes("object")}
                helperText={
                  formInvalids.includes("object")
                    ? "Please ensure your input is unique and keep it between 1 and 256 characters."
                    : ""
                }
                autoFocus={Boolean(autoFocus === "object")}
                hiddenLabel
                value={object}
                id="add-object"
                placeholder="Enter the object"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInput("object", e)
                }
              />
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                required
                htmlFor="add-goal"
                className="ogsm-modal-form-title"
              >
                Goal
              </FormLabel>
              <TextField
                error={formInvalids.includes("goal")}
                helperText={formInvalids.includes("goal") ? ERROR_MSG : ""}
                autoFocus={Boolean(autoFocus === "goal")}
                hiddenLabel
                value={goal}
                id="add-goal"
                placeholder="Enter the goal"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInput("goal", e)
                }
              />
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                htmlFor="add-startdate"
                className="ogsm-modal-form-title"
              >
                Start Date
              </FormLabel>
              <DesktopDatePicker
                value={startDate}
                onChange={(newDate) =>
                  newDate ? setStartDate(newDate) : setStartDate(null)
                }
                format="YYYY/MM/DD"
                slotProps={{
                  field: {
                    clearable: true,
                    onClear: () => setClearedDate(true),
                  },
                }}
              />
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                htmlFor="add-enddate"
                className="ogsm-modal-form-title"
              >
                End Date
              </FormLabel>
              <DesktopDatePicker
                value={endDate}
                onChange={(newDate) =>
                  newDate ? setEndDate(newDate) : setEndDate(null)
                }
                format="YYYY/MM/DD"
                slotProps={{
                  field: {
                    clearable: true,
                    onClear: () => setClearedDate(true),
                  },
                }}
              />
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                required
                htmlFor="add-strategy"
                className="ogsm-modal-form-title"
              >
                Strategy
              </FormLabel>
              <TextField
                error={formInvalids.includes("strategy")}
                helperText={formInvalids.includes("strategy") ? ERROR_MSG : ""}
                autoFocus={Boolean(autoFocus === "strategy")}
                hiddenLabel
                value={strategy}
                id="add-strategy"
                placeholder="Enter the strategy"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInput("strategy", e)
                }
              />
            </li>
            <li className="ogsm-modal-form">
              <FormLabel
                required
                htmlFor="add-measure"
                className="ogsm-modal-form-title"
              >
                Measure
              </FormLabel>
              <TextField
                error={formInvalids.includes("measure")}
                helperText={formInvalids.includes("measure") ? ERROR_MSG : ""}
                autoFocus={Boolean(autoFocus === "measure")}
                hiddenLabel
                value={measure}
                id="add-measure"
                placeholder="Enter the measure"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInput("measure", e)
                }
              />
            </li>
          </ul>
          <footer className="ogsm-modal-footer">
            {ogsm && (
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSave}
              disabled={disabledSaveButton}
            >
              Save
            </Button>
          </footer>
        </div>
      </Paper>
    </Modal>
  )
}

export default OgsmModal
