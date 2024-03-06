"use client"
import { USER_TYPE } from "@/types"
import { createContext, ReactNode, useState } from "react"
import { ToastContainer } from "react-toastify"

interface ProvidersProps {
  children: ReactNode | ReactNode[]
}

interface AuthContextProps {
  user: USER_TYPE
  login: (data: USER_TYPE) => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

export const Providers = ({ children }: ProvidersProps) => {
  const [user, setUser] = useState<USER_TYPE>(null)

  const login = (data: USER_TYPE) => {
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={5}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthContext.Provider>
  )
}
