import React from "react"
import { Divider, ListItem, ListItemText } from "@mui/material"
import { OGSM_TYPE } from "./OgsmList"
import { MODAL_TYPE } from "@/app/main/page"

interface OgsmItemProps {
  ogsm: OGSM_TYPE
  setIsOpen: (isOpen: boolean) => void
  setModalType: (type: MODAL_TYPE) => void
}

const OgsmItem = ({ ogsm, setIsOpen, setModalType }: OgsmItemProps) => {
  return (
    <>
      <ListItem
        role="button"
        onClick={() => {
          setIsOpen(true)
          setModalType("View")
        }}
      >
        <ListItemText primary={ogsm.goal} secondary={`D-${ogsm.dDay}`} />
      </ListItem>
      <Divider component="li" />
    </>
  )
}

export default OgsmItem
