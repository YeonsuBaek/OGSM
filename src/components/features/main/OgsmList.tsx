import React, { useState } from "react"
import { List } from "@mui/material"
import OgsmItem from "./OgsmItem"
import { OGSM_TYPE } from "@/types"
import useAuth from "@/hooks/common/useAuth"
import EditOgsmModal from "./EditOgsmModal"
import useMutation from "@/hooks/ogsm/useMutation"
import { toast } from "react-toastify"

interface OgsmListProps {
  ogsmList: OGSM_TYPE[]
  refetch: () => void
}

const OgsmList = ({ ogsmList, refetch }: OgsmListProps) => {
  const { user } = useAuth()
  const { mutate: mutateDeleteOgsm } = useMutation({ method: "DELETE" })
  const { mutate: mutateUpdateOgsm } = useMutation({ method: "POST" })
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
  }

  if (!user) {
    return <p className="ogsm-no-data">Please use after logging in.</p>
  }

  if (ogsmList.length <= 0) {
    return <p className="ogsm-no-data">No data available.</p>
  }

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {ogsmList.map((ogsm: OGSM_TYPE) => {
          return <OgsmItem ogsm={ogsm} onOpenModal={handleOpenModal} onSave={onSave} key={ogsm.id} />
        })}
      </List>
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

export default OgsmList
