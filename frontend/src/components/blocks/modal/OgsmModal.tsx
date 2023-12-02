import React, { useState } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
} from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { OGSM_TYPE } from "@/app/main/page"
import moment from "moment"

interface AddItemModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  ogsm?: OGSM_TYPE
}

const OgsmModal = ({ isOpen, setIsOpen, ogsm }: AddItemModalProps) => {
  const [category, setCategory] = useState<string>("Category1")

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
                value={ogsm?.category || category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
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
              value={ogsm?.object}
              aria-labelledby="add-object"
              label="Object"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
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
              value={ogsm?.goal}
              aria-labelledby="add-goal"
              label="Goal"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
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
                defaultValue={ogsm?.startDate && moment(ogsm?.startDate)}
                label="Start Date"
              />
              <DesktopDatePicker
                defaultValue={ogsm?.endDate && moment(ogsm?.endDate)}
                label="End Date"
              />
              <TextField
                value={ogsm?.strategy}
                aria-labelledby="add-strategy"
                label="Strategy"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
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
              value={ogsm?.measure}
              aria-labelledby="add-measure"
              label="Measure"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
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
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => setIsOpen(false)}
          >
            Save
          </Button>
        </footer>
      </Paper>
    </Modal>
  )
}

export default OgsmModal
