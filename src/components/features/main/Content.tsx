import React, { useState } from "react"
import OgsmList from "./OgsmList"
import { OGSM_TYPE } from "@/types"
import useSaveOgsm from "@/hooks/ogsm/useSaveOgsm"
import useMutation from "@/hooks/ogsm/useMutation"
import { toast } from "react-toastify"
import OgsmAddButton from "@/components/blocks/button/OgsmAddButton"
import NewOgsmModal from "@/components/features/main/NewOgsmModal"
import EditOgsmModal from "@/components/features/main/EditOgsmModal"

interface ContentProps {
  ogsmList: OGSM_TYPE[]
  refetch: () => void
}

const Content = ({ ogsmList, refetch }: ContentProps) => {
  const { mutate: mutateSaveOgsm } = useSaveOgsm()
  const { mutate: mutateDeleteOgsm } = useMutation({ method: "DELETE" })
  const { mutate: mutateUpdateOgsm } = useMutation({ method: "POST" })
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<OGSM_TYPE | undefined>(undefined)

  const handleOpenModal = (id?: number) => {
    if (id) {
      const item = ogsmList.find((ogsm) => ogsm.id === id)
      setSelectedItem(item)
    }
    setIsEditModalOpen(true)
  }

  const onDelete = (id: number) => {
    mutateDeleteOgsm(
      { id, ogsmList },
      {
        onSuccess: () => {
          refetch()
          toast.success("Deleted the data.")
        },
        onError: () => {
          toast.error("Fail to delete the data.")
        },
      }
    )
  }

  const onSave = (newOgsm: OGSM_TYPE) => {
    const existingOgsmIndex = ogsmList.findIndex((ogsm) => ogsm.id === newOgsm.id)

    if (existingOgsmIndex !== -1) {
      mutateUpdateOgsm(
        { ogsmList, newOgsm },
        {
          onSuccess: () => {
            refetch()
            toast.success("Saved the changes.")
          },
          onError: () => {
            toast.error("Fail to save the changes.")
          },
        }
      )
    } else {
      mutateSaveOgsm(
        { newOgsm },
        {
          onSuccess: () => {
            refetch()
            toast.success("Added the data.")
          },
          onError: () => {
            toast.error("Fail to add the data.")
          },
        }
      )
    }
  }

  return (
    <>
      <OgsmAddButton onClick={() => setIsNewModalOpen(true)} />
      <OgsmList ogsmList={ogsmList} onOpenModal={handleOpenModal} onSave={onSave} />
      <NewOgsmModal
        isOpen={isNewModalOpen}
        setIsOpen={setIsNewModalOpen}
        ogsmList={ogsmList}
        onSave={onSave}
        setSelectedItem={setSelectedItem}
      />
      {selectedItem && (
        <EditOgsmModal
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          ogsm={selectedItem}
          ogsmList={ogsmList}
          onDelete={onDelete}
          onSave={onSave}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  )
}

export default Content
