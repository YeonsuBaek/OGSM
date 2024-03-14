import useAuth from '@/hooks/common/useAuth'
import useLogin from '@/hooks/common/useLogin'
import useLogout from '@/hooks/common/useLogout'
import { GoogleAuthProvider } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../../../firebase.config'
import { Button } from '@yeonsubaek/yeonsui'
import { onConfirm } from '@/components/blocks/modal'

interface HeaderProps {
  refetch: () => void
}

const Header = ({ refetch }: HeaderProps) => {
  const { user, login } = useAuth()
  const { mutate: mutateLogin } = useLogin()
  const { mutate: mutateLogout } = useLogout()

  const handleLogin = () => {
    const provider = new GoogleAuthProvider()

    mutateLogin(provider, {
      onSuccess: (res) => {
        login(res.user)
        refetch()
      },
      onError: () => {
        toast.error('Fail to log in.')
      },
    })
  }

  const handleLogout = () => {
    onConfirm({
      message: 'Would you like to log out?',
      labelSave: 'Logout',
      onSave: onLogout,
    })
  }

  const onLogout = () => {
    mutateLogout(auth, {
      onSuccess: () => {
        login(null)
        refetch()
      },
      onError: () => {
        toast.error('Fail to log out.')
      },
    })
  }

  return (
    <header className="header">
      <h1 className="ogsm-title">{user?.displayName ? `${user.displayName}'s OGSM` : 'You can do it!'}</h1>
      <Button variant="primary" onClick={user ? handleLogout : handleLogin}>
        {user ? '로그아웃' : '로그인'}
      </Button>
    </header>
  )
}

export default Header
