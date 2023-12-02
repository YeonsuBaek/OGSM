import React, { useMemo } from "react"
import { Divider, ListItem, ListItemText } from "@mui/material"
import { OGSM_TYPE } from "@/app/main/page"
import moment from "moment"

interface OgsmItemProps {
  ogsm: OGSM_TYPE
  onOpenModal: (id?: number) => void
}

const OgsmItem = ({ ogsm, onOpenModal }: OgsmItemProps) => {
  const deadline = useMemo(() => {
    if (ogsm.endDate) {
      const today = moment().format("YYYY-MM-DD")
      const diff = moment(ogsm.endDate).diff(today, "days")
      return diff
    }
    return null
  }, [ogsm.endDate])

  const runningDay = useMemo(() => {
    if (ogsm.startDate) {
      const today = moment().format("YYYY-MM-DD")
      const diff = moment(today).diff(ogsm.startDate, "days") + 1
      return diff
    }
    return null
  }, [ogsm.startDate])

  const dDay = useMemo(() => {
    if (deadline) {
      return deadline >= 0 ? `D-${deadline}` : `D+${deadline * -1}`
    }
    return "Working towards my goal... 🌟"
  }, [deadline])

  const rDay = useMemo(() => {
    if (runningDay && deadline && deadline >= 0) {
      const suffix = ["", "st", "rd", "th"]
      const suffixIndex = runningDay >= 3 ? 3 : runningDay <= 0 ? 0 : runningDay

      return `(${runningDay}${suffix[suffixIndex]} day)`
    }
    return ""
  }, [runningDay, deadline])

  return (
    <>
      <ListItem role="button" onClick={() => onOpenModal(ogsm.id)}>
        <ListItemText primary={ogsm.goal} secondary={`${dDay} ${rDay}`} />
      </ListItem>
      <Divider component="li" />
    </>
  )
}

export default OgsmItem
