"use client"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { GoogleAuthProvider } from "firebase/auth"
import { createContext, ReactNode, useState } from "react"
import { ToastContainer } from "react-toastify"

interface ProvidersProps {
  children: ReactNode | ReactNode[]
}

type USER_TYPE = any

interface AuthContextProps {
  user: USER_TYPE
  login: (data: USER_TYPE) => void
}

export const AuthContext =
  createContext<AuthContextProps | undefined>(undefined)

export const Providers = ({ children }: ProvidersProps) => {
  const [user, setUser] = useState<USER_TYPE>(null)

  const login = (data: GoogleAuthProvider) => {
    setUser(data)
  }

  return (
    <AuthContext.Provider value={{ user, login }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
        <ToastContainer
          position='top-right'
          autoClose={3000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </LocalizationProvider>
    </AuthContext.Provider>
  )
}
