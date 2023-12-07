import { OGSM_TYPE } from "@/types"
import { useEffect, useState } from "react"

const useFetchOgsm = () => {
  const [data, setData] = useState<OGSM_TYPE[]>([])
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/yeonsuBaek/ogsm/ogsm",
          { method: "GET" }
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}

export default useFetchOgsm
