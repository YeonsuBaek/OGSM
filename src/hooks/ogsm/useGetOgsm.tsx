import { OGSM_TYPE } from "@/types"
import { useEffect, useMemo, useState } from "react"
import { db } from "../../../firebase.config"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"

interface useFetchOgsmProps {
  email?: string
}

const useFetchOgsm = ({ email }: useFetchOgsmProps) => {
  const [data, setData] = useState<OGSM_TYPE[]>([])
  const [error, setError] = useState<unknown | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefetch, setIsRefetch] = useState(false)

  useEffect(() => {
    if (!email) {
      setData([])
      setIsLoading(false)
      return
    }

    const id = email.replace("@", "")
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "user")
        const docRef = doc(collectionRef, id)
        const response = await getDoc(docRef)

        if (response.exists()) {
          const list = response.data()["ogsm"].map((item: OGSM_TYPE) => {
            return {
              ...item,
              id: item.id || `${id}-${item.goal}`,
            }
          })
          setData(list)
        } else {
          await setDoc(docRef, { ogsm: [] })
          setData([])
        }
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (id || isRefetch) {
      fetchData()
      setIsRefetch(false)
    }
  }, [email, isRefetch])

  const refetch = () => {
    setIsRefetch(true)
  }

  return { data, isLoading, error, refetch }
}

export default useFetchOgsm
