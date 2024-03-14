import useAuth from '@/hooks/common/useAuth'
import { Button } from '@yeonsubaek/yeonsui'
import React from 'react'

interface OgsmAddButtonProps {
  onClick: () => void
}

const OgsmAddButton = ({ onClick }: OgsmAddButtonProps) => {
  const { user } = useAuth()

  return user ? (
    <Button onClick={onClick} startIcon="Edit">
      OGSM
    </Button>
  ) : null
}

export default OgsmAddButton
