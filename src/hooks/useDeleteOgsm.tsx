import { useState } from "react"
import useAuth from "./useAuth"
import { db } from "../../firebase.config"
import { collection, doc, updateDoc } from "firebase/firestore"
import { OGSM_TYPE } from "@/types"

type DATA_TYPE = {
  id: number
  ogsmList: OGSM_TYPE[]
}

type MUTATION_FN_TYPE = {
  onSuccess: () => void
  onError: () => void
}

const useDeleteOgsm = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const mutate = async (data: DATA_TYPE, mutationFn: MUTATION_FN_TYPE) => {
    const { id: ogsmId, ogsmList } = data
    const { onSuccess, onError } = mutationFn
    const userId = user.email.replace("@", "")
    setIsLoading(true)

    try {
      const collectionRef = collection(db, "ogsm")
      const docRef = doc(collectionRef, userId)
      const updatedOgsm = ogsmList.filter((ogsm) => ogsm.id !== ogsmId)

      await updateDoc(docRef, { ogsm: updatedOgsm })
      onSuccess()
    } catch (error) {
      setError(error)
      onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}

export default useDeleteOgsm
