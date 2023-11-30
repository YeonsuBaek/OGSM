import React from "react"
import { Divider, ListItem, ListItemText } from "@mui/material"
import { OGSM_TYPE } from "./OgsmList"
import { MODAL_TYPE } from "@/app/main/page"

interface OgsmItemProps {
  ogsm: OGSM_TYPE
  setIsOpen: (isOpen: boolean) => void
}

const OgsmItem = ({ ogsm, setIsOpen }: OgsmItemProps) => {
  return (
    <>
      <ListItem
        role="button"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        <ListItemText primary={ogsm.goal} secondary={`D-${ogsm.dDay}`} />
      </ListItem>
      <Divider component="li" />
    </>
  )
}

export default OgsmItem
