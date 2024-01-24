import React from "react"
import { List } from "@mui/material"
import OgsmItem from "./OgsmItem"
import { OGSM_TYPE } from "@/types"
import useAuth from "@/hooks/common/useAuth"

interface OgsmListProps {
  onOpenModal: (id?: number) => void
  ogsmList: OGSM_TYPE[]
  onSave: (ogsm: OGSM_TYPE) => void
}

const OgsmList = ({ onOpenModal, ogsmList, onSave }: OgsmListProps) => {
  const { user } = useAuth()

  if (!user) {
    return <p className="ogsm-no-data">Please use after logging in.</p>
  }

  if (ogsmList.length <= 0) {
    return <p className="ogsm-no-data">No data available.</p>
  }

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {ogsmList.map((ogsm: OGSM_TYPE) => {
        return (
          <OgsmItem
            ogsm={ogsm}
            onOpenModal={onOpenModal}
            onSave={onSave}
            key={ogsm.id}
          />
        )
      })}
    </List>
  )
}

export default OgsmList
