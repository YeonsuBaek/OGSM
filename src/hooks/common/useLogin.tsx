import { useState } from "react"
import { auth } from "../../../firebase.config"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

type MUTATION_FN_TYPE = {
  onSuccess: (params?: any) => void
  onError: () => void
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown | null>(null)

  const mutate = async (
    data: GoogleAuthProvider,
    mutationFn: MUTATION_FN_TYPE
  ) => {
    const provider = data
    const { onSuccess, onError } = mutationFn
    setIsLoading(true)

    try {
      const response = await signInWithPopup(auth, provider)
      if (response) {
        onSuccess(response)
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

export default useLogin
