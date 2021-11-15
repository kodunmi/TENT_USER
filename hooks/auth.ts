import { useMemo } from 'react'
import { selectCurrentUser } from '../redux'
import { useTypedSelector } from '.'

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser)
  return useMemo(() => ({ user }), [user])
}
