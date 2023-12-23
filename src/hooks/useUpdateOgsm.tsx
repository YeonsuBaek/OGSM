import { useState } from "react"
import useAuth from "./useAuth"
import { db } from "../../firebase.config"
import { collection, doc, updateDoc } from "firebase/firestore"
import { OGSM_TYPE } from "@/types"

type DATA_TYPE = {
  ogsmList: OGSM_TYPE[]
  newOgsm: OGSM_TYPE
}

type MUTATION_FN_TYPE = {
  onSuccess: () => void
  onError: () => void
}

const useUpdateOgsm = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const mutate = async (data: DATA_TYPE, mutationFn: MUTATION_FN_TYPE) => {
    const { ogsmList, newOgsm } = data
    const { onSuccess, onError } = mutationFn
    const userId = user.email.replace("@", "")
    setIsLoading(true)

    try {
      const collectionRef = collection(db, "ogsm")
      const docRef = doc(collectionRef, userId)
      const updatedOgsm = ogsmList.map((ogsm) => {
        if (ogsm.id === newOgsm.id) {
          return { ...ogsm, ...newOgsm }
        }
        return ogsm
      })

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

export default useUpdateOgsm
