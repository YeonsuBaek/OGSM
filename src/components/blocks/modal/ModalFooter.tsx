import { Button } from '@yeonsubaek/yeonsui'
import React from 'react'

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
        <Button variant="secondary" onClick={onDelete}>
          Delete
        </Button>
      )}
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSave} disabled={isDisabledSaveButton}>
        Save
      </Button>
    </footer>
  )
}

export default ModalFooter
