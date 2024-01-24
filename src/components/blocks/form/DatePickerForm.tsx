import { FormLabel } from "@mui/material"
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { Moment } from "moment"
import React from "react"

interface DatePickerFormProps {
  label: string
  value: Moment | null
  onChange: (newDate: Moment | null) => void
}

const DatePickerForm = ({ label, value, onChange }: DatePickerFormProps) => {
  return (
    <>
      <FormLabel className="ogsm-modal-form-title">{label}</FormLabel>
      <DesktopDatePicker
        value={value}
        onChange={onChange}
        format="YYYY/MM/DD"
        slotProps={{
          field: {
            clearable: true,
          },
        }}
      />
    </>
  )
}

export default DatePickerForm
