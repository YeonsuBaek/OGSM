"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import OgsmList from "@/components/features/main/OgsmList"
import OgsmModal from "@/components/blocks/modal/OgsmModal"
import { OGSM_TYPE } from "@/types"

const dummyOgsmList: OGSM_TYPE[] = [
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
  const [ogsmList, setOgsmList] = useState<OGSM_TYPE[]>(dummyOgsmList)
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

  const onDelete = (id: number) => {
    const newOgsmList = ogsmList.filter((ogsm) => ogsm.id !== id)
    setOgsmList(newOgsmList)
  }

  const onSave = (newOgsm: OGSM_TYPE) => {
    const existingOgsmIndex = ogsmList.findIndex(
      (ogsm) => ogsm.id === newOgsm.id
    )
    let newOgsmList: OGSM_TYPE[]

    if (existingOgsmIndex !== -1) {
      newOgsmList = [...ogsmList]
      newOgsmList[existingOgsmIndex] = {
        ...ogsmList[existingOgsmIndex],
        ...newOgsm,
      }
    } else {
      newOgsmList = [...ogsmList, newOgsm]
    }

    setOgsmList(newOgsmList)
  }

  return (
    <>
      <Container maxWidth="md">
        <main>
          <h1 className="ogsm-title">You can do it!</h1>
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            startIcon={<Add />}
            className="ogsm-add-button"
          >
            OGSM
          </Button>
          <OgsmList ogsmList={ogsmList} onOpenModal={handleOpenModal} />
        </main>
      </Container>
      <OgsmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ogsm={selectedItem}
        onDelete={onDelete}
        onSave={onSave}
        setSelectedItem={setSelectedItem}
      />
    </>
  )
}

export default Main
