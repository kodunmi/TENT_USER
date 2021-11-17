import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux'
import { NotificationType } from '../../pages/notifications'


type NotificationState = {
    notifications: Array<NotificationType> 
    active: NotificationType | null
}

const nots:Array<NotificationType> = [
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "Processing Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem i"
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "Processing Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "Processing Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "Processing Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "Processing Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: true,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
    { 
        title: "Your Provisional Offer Letter has been confrimed, please see details below.",
        type: "New Order",
        date: "Dec 2020",
        sender: "kodunmi lekan",
        read: false,
        message: "Hi Tactical! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam. Ut aliquet tristique nisl vitae volutpat. Nulla aliquet porttitor venenatis. Donec a dui et dui fringilla consectetur id nec massa. Aliquam erat volutpat. Sed ut dui ut lacus dictum fermentum vel tincidunt neque.Duis nunc eros, mattis at dui ac, convallis semper risus. In adipiscing ultrices tellus, in suscipit massa vehicula eu."
    },
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