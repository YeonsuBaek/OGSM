import { Button } from "@mui/material"
import React from "react"

interface ModalFooterProps {
  isDisabledSaveButton: boolean
  onClose: () => void
  onSave: () => void
  onDelete?: () => void
}

const ModalFooter = ({ isDisabledSaveButton, onClose, onSave, onDelete }: ModalFooterProps) => {
  return (
    <footer className="ogsm-modal-footer">
      {onDelete && (
        <Button variant="outlined" color="error" onClick={onDelete}>
          Delete
        </Button>
      )}
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" disableElevation onClick={onSave} disabled={isDisabledSaveButton}>
        Save
      </Button>
    </footer>
  )
}

export default ModalFooter
