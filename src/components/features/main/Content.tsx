import useAuth from "@/hooks/useAuth"
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material"
import React, { useState } from "react"
import OgsmList from "./OgsmList"
import { OGSM_TYPE } from "@/types"
import OgsmModal from "@/components/blocks/modal/OgsmModal"
import useSaveOgsm from "@/hooks/useSaveOgsm"
import useMutation from "@/hooks/useMutation"
import { toast } from "react-toastify"

interface ContentProps {
  ogsmList: OGSM_TYPE[]
  refetch: () => void
}

const Content = ({ ogsmList, refetch }: ContentProps) => {
  const { user } = useAuth()
  const { mutate: mutateSaveOgsm } = useSaveOgsm()
  const { mutate: mutateDeleteOgsm } = useMutation({ method: "DELETE" })
  const { mutate: mutateUpdateOgsm } = useMutation({ method: "POST" })
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
    const existingOgsmIndex = ogsmList.findIndex(
      (ogsm) => ogsm.id === newOgsm.id
    )

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
      {user && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="contained"
          startIcon={<Add />}
          className="ogsm-add-button"
        >
          OGSM
        </Button>
      )}
      {user && ogsmList.length > 0 ? (
        <OgsmList
          ogsmList={ogsmList}
          onOpenModal={handleOpenModal}
          onSave={onSave}
        />
      ) : (
        <p className="ogsm-no-data">
          {user ? "No data available." : "Please use after logging in."}
        </p>
      )}

      {isOpen && (
        <OgsmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
