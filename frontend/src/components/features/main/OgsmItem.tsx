import React, { useMemo } from "react"
import { Divider, ListItem, ListItemText } from "@mui/material"
import { OGSM_TYPE } from "@/types"
import moment from "moment"

interface OgsmItemProps {
  ogsm: OGSM_TYPE
  onOpenModal: (id?: number) => void
}

const OgsmItem = ({ ogsm, onOpenModal }: OgsmItemProps) => {
  const calculateDaysDiff = (start: string, end?: string) => {
    const today = moment().format("YYYY-MM-DD")
    const targetDate = end || today

    return moment(targetDate).diff(start, "days")
  }

  const deadline = useMemo(
    () => calculateDaysDiff(moment().format("YYYY-MM-DD"), ogsm.endDate),
    [ogsm.endDate]
  )

  const runningDay = useMemo(
    () =>
      calculateDaysDiff(
        ogsm.startDate || moment().format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ) + 1,
    [ogsm.startDate]
  )

  const formatDaysLabel = (days: number, label: string) => {
    const formattedDays = days >= 0 ? `D-${deadline}` : `D+${deadline * -1}`
    return days ? formattedDays : label
  }

  const dDay = useMemo(
    () => formatDaysLabel(deadline, "Working towards my goal... 🌟"),
    [deadline]
  )

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
