import { OGSM_TYPE } from "@/types"
import { useState } from "react"

type DATA_TYPE = {
  newOgsm: OGSM_TYPE
}

type MUTATION_FN_TYPE = {
  onSuccess: () => void
  onError: () => void
}

const useSaveOgsm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const mutate = async (data: DATA_TYPE, mutationFn: MUTATION_FN_TYPE) => {
    const { newOgsm } = data
    const { onSuccess, onError } = mutationFn
    setIsLoading(true)

    try {
      const response = await fetch(
        "https://my-json-server.typicode.com/yeonsuBaek/ogsm/ogsm",
        { method: "PUT", body: JSON.stringify(newOgsm) }
      )
      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      setError(error)
      onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}

export default useSaveOgsm
