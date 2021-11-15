import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData, UserDataType } from '../../lib'
import type { RootState } from '../../redux'

type AuthState = {
  user: UserDataType | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: UserDataType; token: string }>
    ) => {
      state.user = user
      state.token = token
    },
    setProfilePicture: (
      state,
      {payload: {url}}: PayloadAction<{ url: string}>
    ) =>{
      state.user.profileImage = url
    },
    setProfile: (
      state,
      {payload}: PayloadAction<UserDataType>
    ) =>{
      state.user = payload
    },
  },
})

export const { setCredentials, setProfilePicture, setProfile } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
