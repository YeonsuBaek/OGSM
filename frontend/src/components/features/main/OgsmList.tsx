import React from "react"
import { List } from "@mui/material"
import OgsmItem from "./OgsmItem"
import { OGSM_TYPE } from "@/app/main/page"

interface OgsmListProps {
  setIsOpen: (isOpen: boolean) => void
  ogsmList: OGSM_TYPE[]
}

const OgsmList = ({ setIsOpen, ogsmList }: OgsmListProps) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {ogsmList.map((ogsm: OGSM_TYPE) => {
        return <OgsmItem ogsm={ogsm} setIsOpen={setIsOpen} key={ogsm.id} />
      })}
    </List>
  )
}

export default OgsmList
