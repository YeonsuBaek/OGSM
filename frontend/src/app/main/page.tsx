"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import AddItemModal from "@/components/blocks/modal/AddItemModal"
import ModifyItemModal from "@/components/ModifyItemModal"
import OgsmList from "@/components/features/main/OgsmList"

const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenItem, setIsOpenItem] = useState<boolean>(false)

  return (
    <>
      <Container maxWidth="sm">
        <main>
          <h1 style={{ fontSize: "24px", margin: "20px 0px" }}>
            You can do it!
          </h1>
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            startIcon={<Add />}
            style={{ textTransform: "none", marginBottom: "16px" }}
          >
            Add OGSM
          </Button>
          <OgsmList setIsOpen={setIsOpenItem} />
        </main>
      </Container>
      <AddItemModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ModifyItemModal
        isOpen={isOpenItem}
        setIsOpen={setIsOpenItem}
        setIsOpenAdd={setIsOpen}
      />
    </>
  )
}

export default Main
