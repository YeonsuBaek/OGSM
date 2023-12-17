"use client"
import React, { useState } from "react"
import { Add } from "@mui/icons-material"
import { Button, Container } from "@mui/material"
import OgsmList from "@/components/features/main/OgsmList"
import OgsmModal from "@/components/blocks/modal/OgsmModal"
import { OGSM_TYPE } from "@/types"
import useGetOgsm from "@/hooks/useGetOgsm"
import useSaveOgsm from "@/hooks/useSaveOgsm"
import useLogin from "@/hooks/useLogin"
import useLogout from "@/hooks/useLogout"
import { GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../../firebase.config"

const Main = () => {
  const { data: ogsmList } = useGetOgsm()
  const { mutate: mutateSaveOgsm } = useSaveOgsm()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] =
    useState<OGSM_TYPE | undefined>(undefined)
  const { mutate: mutateLogin } = useLogin()
  const { mutate: mutateLogout } = useLogout()
  const [userData, setUserData] = useState<any>(null)

  const handleOpenModal = (id?: number) => {
    if (id) {
      const item = ogsmList.find((ogsm) => ogsm.id === id)
      setSelectedItem(item)
    }
    setIsOpen(true)
  }

  const onDelete = (id: number) => {
    const newOgsmList = ogsmList.filter((ogsm) => ogsm.id !== id)
  }

  const onSave = (newOgsm: OGSM_TYPE) => {
    // const existingOgsmIndex = ogsmList.findIndex(
    //   (ogsm) => ogsm.id === newOgsm.id
    // )
    // let newOgsmList: OGSM_TYPE[]

    // if (existingOgsmIndex !== -1) {
    //   newOgsmList = [...ogsmList]
    //   newOgsmList[existingOgsmIndex] = {
    //     ...ogsmList[existingOgsmIndex],
    //     ...newOgsm,
    //   }
    // } else {
    //   newOgsmList = [...ogsmList, newOgsm]
    // }

    mutateSaveOgsm(
      { newOgsm },
      {
        onSuccess: () => console.log("success"),
        onError: () => console.log("error"),
      }
    )
  }

  const handleLogin = () => {
    const provider = new GoogleAuthProvider()

    mutateLogin(provider, {
      onSuccess: (res) => {
        setUserData(res.user)
      },
      onError: () => {
        console.log("Not Found")
      },
    })
  }

  const handleLogout = () => {
    mutateLogout(auth, {
      onSuccess: () => {
        setUserData(null)
      },
      onError: () => {
        console.log("Not Found")
      },
    })
  }

  return (
    <>
      <Container maxWidth="md">
        <main>
          <header className="header">
            <h1 className="ogsm-title">
              {userData ? `${userData.displayName}'s OGSM` : "You can do it!"}
            </h1>
            {userData ? (
              <Button variant="text" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <Button variant="text" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </header>
          <Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            startIcon={<Add />}
            className="ogsm-add-button"
          >
            OGSM
          </Button>
          <OgsmList ogsmList={ogsmList} onOpenModal={handleOpenModal} />
        </main>
      </Container>
      {isOpen && (
        <OgsmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ogsm={selectedItem}
          onDelete={onDelete}
          onSave={onSave}
          setSelectedItem={setSelectedItem}
        />
      )}
    </>
  )
}

export default Main
