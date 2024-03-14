import { TextField } from '@yeonsubaek/yeonsui'
import React, { ChangeEvent } from 'react'

interface TextFieldFormProps {
  id: string
  label: string
  required: boolean
  invalid: boolean
  errorText: string
  autoFocus: boolean
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TextFieldForm = ({
  id,
  label,
  required,
  invalid,
  errorText,
  autoFocus,
  value,
  placeholder,
  onChange,
}: TextFieldFormProps) => {
  return (
    <>
      <TextField
        label={label}
        isError={invalid}
        helperText={invalid ? errorText : ''}
        autoFocus={autoFocus}
        value={value}
        id={id}
        placeholder={placeholder}
        size="large"
        onChange={onChange}
        required
      />
    </>
  )
}

export default TextFieldForm
