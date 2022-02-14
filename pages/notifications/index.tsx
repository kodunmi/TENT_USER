import { Divider, InputAdornment, Stack, TextField,Grid, Typography, Theme, IconButton, Slide, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { withTheme } from "@mui/styles";
import styled from "styled-components";
import { AppLayout } from "../../layout";
import Search from "remixicon-react/SearchLineIcon";
import { NotificationCard } from "../../components";
import { useSelector } from 'react-redux'
import { selectActiveNotification, selectAllNotifications, unsetActiveNotification } from "../../redux";
import ArrowLeft from "remixicon-react/ArrowLeftLineIcon";
import { useAppDispatch } from "../../hooks";
import { WithAuth } from "../../HOC";
import { useGetNotificationsQuery } from "../../services";
import { io } from "socket.io-client";
import { NotificationEvents } from "../../lib";
import moment from "moment";
import Image from 'next/image'

export interface NotificationType{
    title: string,
    date: string,
    receiver: string,
    isRead: boolean,
    body: string,
}


const socket = io('https://tent-group-server.herokuapp.com', {
      query: {
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyYmJlNmNlY2I1ZjAwMTZhNDMwMWIiLCJpYXQiOjE2NDQ4NDIzMjB9.Hzl1SZobio5FMCVu-sfdnp9ftOqYgxWPftezzyY9_Io`
      }
  });



const Notifications = () => {
  // const nots = useSelector(selectAllNotifications) 
  // const active = useSelector(selectActiveNotification)
  // const dispatch = useAppDispatch()
  const [active, setActive] = useState<NotificationType>()
  const [nots, setNots] = useState<NotificationType[]>([])
  let booleanSlide = active ? true : false
  let MobileSlide = active ? false : true
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const xs = useMediaQuery(theme.breakpoints.up("xs"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const [page, setPage] = useState(1)

  const {data, isLoading, isError} = useGetNotificationsQuery({page:page})

  console.log(data);

  useEffect(() => {

    const pagination = {
      pageNumber: 1
  }

    socket.on('connect', () => {
      console.log('connected');
      socket.emit(NotificationEvents.GetAllNotifications, pagination, (data: {data:{notificationCount:number,notifications: Array<NotificationType>,page:number, pages:number } } ) =>{
          console.log(data.data);

          setNots(data.data.notifications)
      })
    });

    socket.on(NotificationEvents.NewNotification, (not: any) => {
      console.log(not);
    });


    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  }, [])
  

  const SGrid = withTheme(styled(Grid)`
  transition: all 1s ease-out;
 
`);

  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px", width: "100%" }}>
        <Stack
          mb={1}
          direction={{ xs: "column", sm: "column", lg: "row", md: "row" }}
          justifyContent="space-between"
        >
          <TextField
            size="small"
            sx={{
              border: "none",
              backgroundColor: "action.hover",
              borderRadius: "5px",
            }}
            name="officeAddress"
            type="search"
            placeholder="Insert Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Box sx={{ height: "100vh", overflow: "scroll" }}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 6, sm: 6, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Slide direction="right" in={lg || md ? true : MobileSlide} mountOnEnter unmountOnExit>
            <Grid display={{sm:(active ? "none" : "block"),xs:(active ? "none" : "block"),md:"block",lg:"block"}} md={5} sm={12} xs={12} lg={5} item>
                <Box sx={{ height: "calc(100vh - 100px)", overflow: "scroll"}}>
                   {
                    nots.map((not:NotificationType)=><NotificationCard handleClick={setActive} key={`a-${not.title}`} notification={not}/>)
                   }
                </Box>
                
            </Grid>
            </Slide>
            <Slide direction="left" in={lg || md ? true : booleanSlide} mountOnEnter unmountOnExit>
            <Grid  sx={{ mt: {xs: '0px !important'} }} mt={0} md={7} sm={12} xs={12} lg={7} item>
              {
                active ? 
                <React.Fragment>
                  <IconButton onClick={()=> setActive(undefined)}>
                    <ArrowLeft/>
                  </IconButton>
                  <NotificationCard notification={active}/>

                  <Box px={5}>
                    <Typography variant="body1">
                     From tent group
                    </Typography>
                    <Typography variant="caption">
                      {moment( active.date).format("MMMM Do YYYY")}
                    </Typography>
                    <Typography dangerouslySetInnerHTML={{ __html: active.body }} mt={4} variant="body1">
                      
                    </Typography>
                  </Box>
                </React.Fragment>
                : <Image src="/images/no-mail.svg" alt="me" width="100px" height="100px" />
              }
            </Grid>
            {/* <div>
            <IconButton onClick={()=> dispatch(unsetActiveNotification())}>
                    <ArrowLeft/>
                  </IconButton>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus nisi praesentium numquam esse vel sint doloribus rerum labore reprehenderit dolorum fugiat nobis ipsa beatae, vero deleniti? Facilis architecto minus corporis?</p>
            </div> */}
           
            </Slide>
            
            
          </Stack>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default WithAuth(Notifications);
