import React from "react"
import { List } from "@mui/material"
import OgsmItem from "./OgsmItem"
import { MODAL_TYPE } from "@/app/main/page"

interface OgsmListProps {
  setIsOpen: (isOpen: boolean) => void
}

export type OGSM_TYPE = {
  key: string
  goal: string
  dDay: number
}

const OgsmList = ({ setIsOpen }: OgsmListProps) => {
  const ogsmList: OGSM_TYPE[] = [
    {
      key: "Study English",
      goal: "Study English",
      dDay: 10,
    },
    {
      key: "Study Math",
      goal: "Study Math",
      dDay: 20,
    },
  ]
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {ogsmList.map((ogsm: OGSM_TYPE) => {
        return <OgsmItem ogsm={ogsm} setIsOpen={setIsOpen} key={ogsm.key} />
      })}
    </List>
  )
}

export default OgsmList
