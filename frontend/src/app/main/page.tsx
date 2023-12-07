"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import OgsmList from "@/components/features/main/OgsmList"
import OgsmModal from "@/components/blocks/modal/OgsmModal"
import { OGSM_TYPE } from "@/types"
import useGetOgsm from "@/hooks/useGetOgsm"
import useSaveOgsm from "@/hooks/useSaveOgsm"

const Main = () => {
  const { data: ogsmList } = useGetOgsm()
  const { mutate: mutateSaveOgsm } = useSaveOgsm({
    onSuccess: () => console.log("success"),
    onError: () => console.log("error"),
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<OGSM_TYPE | undefined>(
    undefined
  )

  const handleOpenModal = (id?: number) => {
    if (id) {
      const item = ogsmList.find((ogsm) => ogsm.id === id)
      setSelectedItem(item)
    }
    setIsOpen(true)
  }

  const onDelete = (id: number) => {
    const newOgsmList = ogsmList.filter((ogsm) => ogsm.id !== id)
  }

  const onSave = (newOgsm: OGSM_TYPE) => {
    // const existingOgsmIndex = ogsmList.findIndex(
    //   (ogsm) => ogsm.id === newOgsm.id
    // )
    // let newOgsmList: OGSM_TYPE[]

    // if (existingOgsmIndex !== -1) {
    //   newOgsmList = [...ogsmList]
    //   newOgsmList[existingOgsmIndex] = {
    //     ...ogsmList[existingOgsmIndex],
    //     ...newOgsm,
    //   }
    // } else {
    //   newOgsmList = [...ogsmList, newOgsm]
    // }

    mutateSaveOgsm({ newOgsm })
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
      {isOpen && (
        <OgsmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ogsm={selectedItem}
          onDelete={onDelete}
          onSave={onSave}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  )
}

export default Main
