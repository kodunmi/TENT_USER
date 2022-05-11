import {
  AppBar,
  Badge,
  createTheme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  PaletteMode,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box, styled, Theme } from "@mui/system";
import React, { useEffect } from "react";
import NotificationsIcon from "remixicon-react/QuestionAnswerLineIcon";
import AccountCircle from "remixicon-react/User2LineIcon";
import MoreIcon from "remixicon-react/Menu2LineIcon";
import Avatar from "@mui/material/Avatar";
import Image from 'next/image';
import { Search } from "@mui/icons-material";
import { useAuth } from "../../hooks";
import { useRouter } from "next/router";


export function NavBar({onclick}) {
  const isDarkModeEnabled = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useTheme();
  const {user} = useAuth()
  const router = useRouter()

  return (
    <Box>
      <AppBar
        sx={{backgroundColor:"background.paper", color:"text.primary", backgroundImage:"none"}}
        position="static"
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Image alt="logo" src="/images/logo-dark.png" layout='fixed' height="40px" width="55px"/>
          </Box>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              sx={{ mr: "30px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=> router.push('/notifications')}
            >
              <Badge
                variant="dot"
                color="error"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Avatar src={user.user.profileImage} style={{ cursor: "pointer" }} onClick={()=> router.push('/profile')} />
          </Box>

          <Box pl={2} sx={{ display: { xs: "none", md: "block" } }}>
            <Grid spacing={0} style={{ cursor: "pointer" }} container onClick={()=> router.push('/profile')}>
              <Grid md={12} item>
                <Typography
                  sx={{ lineHeight: "1" }}
                  variant="subtitle1"
                  component="p"
                >
                   {user.user.fullName}
                </Typography>
              </Grid>
              <Grid md={12} item>
                <Typography
                  sx={{ lineHeight: "1" }}
                  variant="overline"
                  component="p"
                >
                  {user.user.tentUserId}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
              onClick={onclick}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
