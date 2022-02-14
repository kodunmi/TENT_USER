import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux'
import { NotificationType } from '../../pages/notifications'


type NotificationState = {
    notifications: Array<NotificationType> 
    active: NotificationType | null
}

const nots:Array<NotificationType> = [
    
]

const slice = createSlice({
    name: 'notification',
    initialState: { notifications: nots, active: null } as NotificationState,
    reducers: {
        setActiveNotification (state, action: PayloadAction<NotificationType>) {
            state.active = action.payload
        },

        unsetActiveNotification (state) {
            state.active = null
        },
    },
  })

export const { setActiveNotification,unsetActiveNotification } = slice.actions

export default slice.reducer

export const selectAllNotifications = (state: RootState) => state.notification.notifications
export const selectActiveNotification = (state: RootState) => state.notification.active