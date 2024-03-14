import { createRoot, Root } from 'react-dom/client'
import ConfirmModal, { ConfirmModalProps } from './ConfirmModal'

const destroyFns: Array<() => void> = []

const callDestroy = (root: Root, close: () => void): void => {
  root?.unmount()

  for (let i = 0; i < destroyFns.length; i += 1) {
    const fn = destroyFns[i]
    if (fn === close) {
      destroyFns.splice(i, 1)
      break
    }
  }
}

const onConfirm = (config: ConfirmModalProps) => {
  const div: HTMLDivElement = document.createElement('div')
  const root = createRoot(div)

  const render = (props: ConfirmModalProps) => {
    const labelCancel = props?.labelCancel || 'Cancel'
    const labelSave = props?.labelSave || 'Save'

    setTimeout(() => {
      root.render(<ConfirmModal {...props} labelCancel={labelCancel} labelSave={labelSave} />)
    }, 0)
  }

  const close = () => {
    render({ ...config, isOpen: false })
  }

  const destroy = () => {
    callDestroy(root, close)
  }

  render({ ...config, isOpen: true, afterClose: destroy })
  destroyFns.push(close)

  return {
    destroy,
    close,
  }
}
export { onConfirm }
