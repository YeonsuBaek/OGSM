import React, { useState, useEffect, ChangeEvent } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { OGSM_TYPE } from "@/app/main/page"
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
  const [startDate, setStartDate] = useState<Moment>(moment(null))
  const [endDate, setEndDate] = useState<Moment>(moment(null))

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

  const handleClose = (type: "delete" | "cancel" | "save") => {
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
    setStartDate(moment(null))
    setEndDate(moment(null))
    setSelectedItem(undefined)
  }

  useEffect(() => {
    if (ogsm) {
      const { category, object, goal, strategy, measure, startDate, endDate } =
        ogsm
      setCategory(category)
      setObject(object)
      setGoal(goal)
      setStrategy(strategy)
      setMeasure(measure)
      setStartDate(startDate ? moment(startDate) : moment(null))
      setEndDate(endDate ? moment(endDate) : moment(null))
    }
  }, [ogsm])

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        elevation={3}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "80%",
          height: "480px",
          padding: "16px",
          backgroundColor: "#fff",
          overflowY: "auto",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Your OGSM</h2>
        <ul style={{ marginBottom: "16px" }}>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="select-category"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Category
            </FormLabel>
            <FormControl fullWidth>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                aria-labelledby="select-category"
                value={category}
                label="Category"
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
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-object"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Object
            </FormLabel>
            <TextField
              value={object}
              aria-labelledby="add-object"
              label="Object"
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
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-goal"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Goal
            </FormLabel>
            <TextField
              value={goal}
              aria-labelledby="add-goal"
              label="Goal"
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
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-strategy"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Strategy
            </FormLabel>
            <>
              <DesktopDatePicker
                value={startDate}
                label="Start Date"
                onChange={(newDate) =>
                  newDate ? setStartDate(newDate) : setStartDate(moment(null))
                }
                format="YYYY/MM/DD"
              />
              <DesktopDatePicker
                value={endDate}
                label="End Date"
                onChange={(newDate) =>
                  newDate ? setEndDate(newDate) : setStartDate(moment(null))
                }
                format="YYYY/MM/DD"
              />
              <TextField
                value={strategy}
                aria-labelledby="add-strategy"
                label="Strategy"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInput("strategy", e)
                }
              />
            </>
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-measure"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Measure
            </FormLabel>
            <TextField
              value={measure}
              aria-labelledby="add-measure"
              label="Measure"
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
        <footer
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            gap: "8px",
          }}
        >
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
          >
            Save
          </Button>
        </footer>
      </Paper>
    </Modal>
  )
}

export default OgsmModal
