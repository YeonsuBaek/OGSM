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

  const handleChangeInput = (
    type: FORM_TYPE,
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    const { value } = e.target

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
  }

  const handleClose = (type: BUTTON_TYPE) => {
    if (type === "delete" && ogsm) {
      onDelete(ogsm.id)
    }

    if (type === "save") {
      onSave({
        id: ogsm?.id || Math.random() * 10,
        category,
        object,
        goal,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        strategy,
        measure,
      })
    }
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
    if (!ogsm) {
      return !(category && object && goal && strategy && measure)
    }

    return (
      ogsm.category === category &&
      ogsm.object === object &&
      ogsm.goal === goal &&
      ogsm.strategy === strategy &&
      ogsm.measure === measure &&
      (ogsm?.startDate
        ? ogsm.startDate === moment(startDate).format("YYYY-MM-DD")
        : true) &&
      (ogsm?.endDate
        ? ogsm.endDate === moment(endDate).format("YYYY-MM-DD")
        : true)
    )
  }, [ogsm, category, object, goal, strategy, measure, startDate, endDate])

  useEffect(() => {
    if (ogsm) {
      const { category, object, goal, strategy, measure, startDate, endDate } =
        ogsm
      setCategory(category)
      setObject(object)
      setGoal(goal)
      setStrategy(strategy)
      setMeasure(measure)
      setStartDate(startDate ? moment(startDate) : null)
      setEndDate(endDate ? moment(endDate) : null)
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
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose("delete")}
              >
                Delete
              </Button>
            )}
            <Button variant="outlined" onClick={() => handleClose("cancel")}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={() => handleClose("save")}
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
