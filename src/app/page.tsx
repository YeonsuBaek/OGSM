"use client"
import React from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import Main from "./main/page"

const Home = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Main />
    </LocalizationProvider>
  )
}

export default Home
