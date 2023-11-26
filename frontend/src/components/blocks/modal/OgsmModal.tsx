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

interface AddItemModalProps {
  type?: "Edit" | "View"
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const OgsmModal = ({ type = "Edit", isOpen, setIsOpen }: AddItemModalProps) => {
  const [category, setCategory] = useState<string>("Category1")
  const [currentType, isCurrentType] = useState<string>(type)

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
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
          {type === "Edit" ? "What is your OGSM?" : "Your OGSM"}
        </h2>
        <ul style={{ marginBottom: "16px" }}>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="select-category"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {type === "Edit" ? "Select a Category" : "Category"}
            </FormLabel>
            {type === "Edit" ? (
              <FormControl fullWidth>
                <InputLabel id="select-category-label">Category</InputLabel>
                <Select
                  labelId="select-category-label"
                  aria-labelledby="select-category"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value="Category1">Category1</MenuItem>
                  <MenuItem value="Category2">Category2</MenuItem>
                  <MenuItem value="Category3">Category3</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <p aria-labelledby="select-category-label">Category</p>
            )}
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-object"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {type === "Edit" ? "Write your Object" : "Object"}
            </FormLabel>
            {type === "Edit" ? (
              <TextField
                aria-labelledby="add-object"
                label="Object"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            ) : (
              <p aria-labelledby="add-goal">Goal</p>
            )}
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-goal"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {type === "Edit" ? "Write your Goal" : "Goal"}
            </FormLabel>
            {type === "Edit" ? (
              <TextField
                aria-labelledby="add-goal"
                label="Goal"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            ) : (
              <p aria-labelledby="add-goal">Goal</p>
            )}
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-strategy"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {type === "Edit" ? "Write your Strategy" : "Strategy"}
            </FormLabel>
            {type === "Edit" ? (
              <>
                <DesktopDatePicker label="Start Date" />
                <DesktopDatePicker label="End Date" />
                <TextField
                  aria-labelledby="add-strategy"
                  label="Strategy"
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                />
              </>
            ) : (
              <>
                <p>2023.10.30 - 2024.01.30</p>
                <p aria-labelledby="add-strategy">Strategy</p>
              </>
            )}
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-measure"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              {type === "Edit" ? "Write your Measure" : "Measure"}
            </FormLabel>
            {type === "Edit" ? (
              <TextField
                aria-labelledby="add-measure"
                label="Measure"
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={3}
              />
            ) : (
              <p aria-labelledby="add-measure">Measure</p>
            )}
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
          {type === "Edit" ? (
            <>
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
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setIsOpen(false)}
                color="error"
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  isCurrentType("Edit")
                }}
              >
                Modify
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </>
          )}
        </footer>
      </Paper>
    </Modal>
  )
}

export default OgsmModal
