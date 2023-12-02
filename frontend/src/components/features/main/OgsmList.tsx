import React from "react"
import { List } from "@mui/material"
import OgsmItem from "./OgsmItem"
import { OGSM_TYPE } from "@/types"

interface OgsmListProps {
  onOpenModal: (id?: number) => void
  ogsmList: OGSM_TYPE[]
}

const OgsmList = ({ onOpenModal, ogsmList }: OgsmListProps) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {ogsmList.map((ogsm: OGSM_TYPE) => {
        return <OgsmItem ogsm={ogsm} onOpenModal={onOpenModal} key={ogsm.id} />
      })}
    </List>
  )
}

export default OgsmList
