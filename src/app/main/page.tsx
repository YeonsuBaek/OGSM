"use client"
import React, { useEffect, useState } from "react"
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
import useAuth from "@/hooks/useAuth"
import { getAuth } from "firebase/auth"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useMutation from "@/hooks/useMutation"

const Main = () => {
  const { user, login } = useAuth()
  const { data: ogsmList, refetch } = useGetOgsm({ email: user?.email })
  const { mutate: mutateSaveOgsm } = useSaveOgsm()
  const { mutate: mutateDeleteOgsm } = useMutation({ method: "DELETE" })
  const { mutate: mutateUpdateOgsm } = useMutation({ method: "POST" })
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<OGSM_TYPE | undefined>(
    undefined
  )
  const { mutate: mutateLogin } = useLogin()
  const { mutate: mutateLogout } = useLogout()
  const authService = getAuth()

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

  const handleLogin = () => {
    const provider = new GoogleAuthProvider()

    mutateLogin(provider, {
      onSuccess: (res) => {
        login(res.user)
        refetch()
      },
      onError: () => {
        toast.error("Fail to log in.")
      },
    })
  }

  const handleLogout = () => {
    mutateLogout(auth, {
      onSuccess: () => {
        login(null)
        refetch()
      },
      onError: () => {
        toast.error("Fail to log out.")
      },
    })
  }

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoadingUser(false)
        login(user)
      }
    })
  }, [])

  if (isLoadingUser) {
    return <div />
  }

  return (
    <>
      <Container maxWidth="md">
        <main>
          <header className="header">
            <h1 className="ogsm-title">
              {user ? `${user?.displayName}'s OGSM` : "You can do it!"}
            </h1>
            {user ? (
              <Button variant="text" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <Button variant="text" onClick={handleLogin}>
                로그인
              </Button>
            )}
          </header>
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
        </main>
      </Container>
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

export default Main
