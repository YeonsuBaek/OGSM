import { Modal, Paper } from "@mui/material"
import React, { ReactNode } from "react"

interface ModalProps {
  children: ReactNode | ReactNode[]
  isOpen: boolean
  title?: string
}

const ModalWrapper = ({ children, title, isOpen }: ModalProps) => {
  return (
    <Modal open={isOpen} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Paper elevation={3} className="ogsm-modal">
        {title && <h2 className="ogsm-modal-title">{title}</h2>}
        <div className="ogsm-modal-content">{children}</div>
      </Paper>
    </Modal>
  )
}

export default ModalWrapper
