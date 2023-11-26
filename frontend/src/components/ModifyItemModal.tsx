import React from "react"
import { Button, FormLabel, Modal, Paper } from "@mui/material"

interface ModifyItemModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  setIsOpenAdd: (isOpenAdd: boolean) => void
}

const ModifyItemModal = ({
  isOpen,
  setIsOpen,
  setIsOpenAdd,
}: ModifyItemModalProps) => {
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
              Write your Object
            </FormLabel>
            <p aria-labelledby="select-category-label">Category</p>
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-object"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Write your Object
            </FormLabel>
            <p aria-labelledby="add-object">Object</p>
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-goal"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Write your Goal
            </FormLabel>
            <p aria-labelledby="add-goal">Goal</p>
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-strategy"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Write your Strategy
            </FormLabel>
            <p>2023.10.30 - 2024.01.30</p>
            <p aria-labelledby="add-strategy">Strategy</p>
          </li>
          <li style={{ marginBottom: "8px", listStyleType: "none" }}>
            <FormLabel
              id="add-measure"
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Write your Measure
            </FormLabel>
            <p aria-labelledby="add-measure">Measure</p>
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
              setIsOpen(false)
              setIsOpenAdd(true)
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
        </footer>
      </Paper>
    </Modal>
  )
}

export default ModifyItemModal
