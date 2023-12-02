"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import OgsmList from "@/components/features/main/OgsmList"
import OgsmModal from "@/components/blocks/modal/OgsmModal"

export type MODAL_TYPE = "Edit" | "View"

export type OGSM_TYPE = {
  id: number
  category: string
  object: string
  goal: string
  startDate?: string
  endDate?: string
  strategy: string
  measure: string
}

const ogsmList: OGSM_TYPE[] = [
  {
    id: 1,
    category: "Category1",
    object: "Object1",
    goal: "Goal1",
    startDate: "2023-10-02",
    endDate: "2023-12-05",
    strategy: "Strategy1",
    measure: "Measure1",
  },
  {
    id: 2,
    category: "Category2",
    object: "Object2",
    goal: "Goal2",
    startDate: "2023-12-02",
    endDate: "2023-12-10",
    strategy: "Strategy2",
    measure: "Measure2",
  },
  {
    id: 3,
    category: "Category3",
    object: "Object1",
    goal: "Goal3",
    strategy: "Strategy3",
    measure: "Measure3",
  },
  {
    id: 4,
    category: "Category4",
    object: "Object4",
    goal: "Goal4",
    startDate: "2023-10-10",
    endDate: "2023-10-30",
    strategy: "Strategy4",
    measure: "Measure4",
  },
]

const Main = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] =
    useState<OGSM_TYPE | undefined>(undefined)

  const handleOpenModal = (id?: number) => {
    if (id) {
      const item = ogsmList.find((ogsm) => ogsm.id === id)
      setSelectedItem(item)
    }
    setIsOpen(true)
  }

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
          <OgsmList ogsmList={ogsmList} onOpenModal={handleOpenModal} />
        </main>
      </Container>
      <OgsmModal isOpen={isOpen} setIsOpen={setIsOpen} ogsm={selectedItem} />
    </>
  )
}

export default Main
