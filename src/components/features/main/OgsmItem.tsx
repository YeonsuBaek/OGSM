import React, { useMemo } from "react"
import { Divider, ListItem, ListItemText } from "@mui/material"
import { OGSM_TYPE, NUMBER_SUFFIX } from "@/types"
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

  const deadline = useMemo(() => {
    if (ogsm?.endDate) {
      return calculateDaysDiff(moment().format("YYYY-MM-DD"), ogsm.endDate)
    }
  }, [ogsm?.endDate])

  const runningDay = useMemo(
    () =>
      calculateDaysDiff(
        ogsm.startDate || moment().format("YYYY-MM-DD"),
        moment().format("YYYY-MM-DD")
      ) + 1,
    [ogsm.startDate]
  )

  const formatDaysLabel = (days: number, label: string) => {
    if (days && deadline) {
      return days >= 0 ? `D-${deadline}` : `D+${deadline * -1}`
    }
    return label
  }

  const dDay = useMemo(() => {
    if (deadline) {
      return formatDaysLabel(deadline, "Working towards my goal... 🌟")
    }
  }, [deadline])

  const rDay = useMemo(() => {
    if (runningDay && deadline && deadline >= 0) {
      const suffix = (day: number) => {
        if (day <= 0) return NUMBER_SUFFIX.NULL
        if (day === 1) return NUMBER_SUFFIX.FIRST
        if (day === 2) return NUMBER_SUFFIX.SECOND
        if (day === 3) return NUMBER_SUFFIX.THIRD
        return NUMBER_SUFFIX.OTHER
      }

      return `(${runningDay}${suffix(runningDay)} day)`
    }
    return ""
  }, [runningDay, deadline])

  return (
    <>
      <ListItem
        className="ogsm-item"
        role="button"
        onClick={() => onOpenModal(ogsm.id)}
      >
        <ListItemText primary={ogsm.goal} secondary={`${dDay} ${rDay}`} />
      </ListItem>
      <Divider component="li" />
    </>
  )
}

export default OgsmItem
