"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import OgsmList from "@/components/features/main/OgsmList"
import OgsmModal from "@/components/blocks/modal/OgsmModal"

export type MODAL_TYPE = "Edit" | "View"

const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalType, setModalType] = useState<MODAL_TYPE>("Edit")

  return (
    <>
      <Container maxWidth="sm">
        <main>
          <h1 style={{ fontSize: "24px", margin: "20px 0px" }}>
            You can do it!
          </h1>
          <Button
            onClick={() => {
              setIsOpen(true)
              setModalType("Edit")
            }}
            variant="contained"
            startIcon={<Add />}
            style={{ textTransform: "none", marginBottom: "16px" }}
          >
            Add OGSM
          </Button>
          <OgsmList setIsOpen={setIsOpen} setModalType={setModalType} />
        </main>
      </Container>
      <OgsmModal isOpen={isOpen} setIsOpen={setIsOpen} type={modalType} />
    </>
  )
}

export default Main
