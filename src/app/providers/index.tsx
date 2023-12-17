"use client"
import { GoogleAuthProvider } from "firebase/auth"
import { createContext, ReactNode, useState } from "react"

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
      {children}
    </AuthContext.Provider>
  )
}
