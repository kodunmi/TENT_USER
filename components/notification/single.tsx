import { ListItem, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { NotificationType } from '../../pages/notifications'
import styles from 'styled-components'
import { useDispatch } from 'react-redux'
import { setActiveNotification } from '../../redux'
import { useAuth } from '../../hooks'


const NotificationTypeBadge = styles.div`
background: ${(props:{background:string}) => props.background};
border-radius: 19px;
color: #FFFFFF;
padding: 0px 15px;
font-size: 13px;
`

const Dot = styles.div`
    height: 10px;
  min-width: 10px;
  background-color: ${(props:{background:string}) => props.background};
  border-radius: 50%;
  display: block;
  margin-top: 6px;
`


export const NotificationCard = (notification: NotificationType) => {
    const dispatch = useDispatch()
    const {user} = useAuth()
    return (
        <ListItem sx={{cursor: 'pointer'}}  onClick={()=>dispatch(setActiveNotification(notification))}>
            <Stack justifyContent="space-evenly" spacing={2} direction="row">
            <Dot background={notification.read ? "#C8C8C8":"#FEC545"}/>
            <Stack>
                <Stack  direction="row" justifyContent="space-between">
                    <NotificationTypeBadge background={notification.read ? "#C8C8C8":"#FEC545"} >{notification.type}</NotificationTypeBadge>
                    <Typography variant="caption">{notification.date}</Typography>
                </Stack>
                <Typography  color={notification.read && "#888888"} sx={{borderBottom:"1.50318px solid #CCCCCC;"}} pb={3} mb={3} variant="body1">{notification.title}</Typography>
            </Stack>
            
        </Stack>
        </ListItem>
        
    )
}
