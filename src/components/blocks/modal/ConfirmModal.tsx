import { Modal } from '@yeonsubaek/yeonsui'
import { useState } from 'react'

export interface ConfirmModalProps {
  message: string
  onSave: () => void
  isOpen?: boolean
  labelCancel?: string
  labelSave?: string
  title?: string
  afterClose?: () => void
}

const ConfirmModal = ({
  isOpen = true,
  message,
  onSave,
  labelCancel,
  labelSave,
  title = '',
  afterClose = () => {},
}: ConfirmModalProps) => {
  const [open, setOpen] = useState(isOpen)

  const handleCancel = () => {
    setOpen(false)
    afterClose()
  }

  const handleSave = () => {
    setOpen(false)
    onSave()
  }

  return (
    <Modal
      isOpen={open}
      onClose={handleCancel}
      onSave={handleSave}
      labelClose={labelCancel}
      labelSave={labelSave}
      title={title}
    >
      {message}
    </Modal>
  )
}

export default ConfirmModal
