import React, { useState } from "react"
import OgsmList from "./OgsmList"
import { OGSM_TYPE } from "@/types"
import useSaveOgsm from "@/hooks/ogsm/useSaveOgsm"
import { toast } from "react-toastify"
import OgsmAddButton from "@/components/blocks/button/OgsmAddButton"
import NewOgsmModal from "@/components/features/main/NewOgsmModal"

interface ContentProps {
  ogsmList: OGSM_TYPE[]
  refetch: () => void
}

const Content = ({ ogsmList, refetch }: ContentProps) => {
  const { mutate: mutateSaveOgsm } = useSaveOgsm()
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)

  const onSave = (newOgsm: OGSM_TYPE) => {
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

  return (
    <>
      <OgsmAddButton onClick={() => setIsNewModalOpen(true)} />
      <OgsmList ogsmList={ogsmList} refetch={refetch} />
      <NewOgsmModal isOpen={isNewModalOpen} setIsOpen={setIsNewModalOpen} ogsmList={ogsmList} onSave={onSave} />
    </>
  )
}

export default Content
