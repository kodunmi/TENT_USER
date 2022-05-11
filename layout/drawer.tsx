import React from 'react'
import {
    Avatar,
    Badge,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Theme,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { borderRadius, Box, maxWidth } from "@mui/system";
  import LogoutIcon from "remixicon-react/LogoutBoxLineIcon";
  import Arrow from "remixicon-react/ArrowRightSLineIcon";
  import { MenuList } from "../lib/menu";
  import { withTheme } from "@mui/styles";
  import { UserData } from "../lib/data";
  import styled from "styled-components";
  import { SideBar, NavBar, NavLink, MenuCount } from "../components";
  import { styled as styled2 } from "@mui/material/styles";
import { Activation, DrawerFooter } from '.';
import { DrawerProps } from '../lib/type';
import { useAuth } from '../hooks';
import { useGetMyOrdersQuery } from '../services';


  const StyledNavLink = styled(props => <NavLink {...props}/>)`
    .active-link {
      color: #eaca1f !important;
    }
  `;

  const StyledList = styled(List)`
    padding: 20px 10%;
    height: 100%;
  `;

  const StyledListItem = withTheme(styled(ListItem)`
    padding: 0px 0px 10px 0px;
    margin-top: 30px;
    &.active-link {
      border-bottom: 1px solid #eaca1f;
    }
  `);

  const StyledBadge = styled2(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px white`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const UserInfoCard = styled(ListItem)`
    background: #eaca1f;
    border-radius: 3.43269px;
    margin: 0px -15px;
    width: 245px;
  `;
  

export const SideDrawer = ({handleOpenDrawer, handleCloseDrawer, openDrawer}:DrawerProps )=> {
    const {user} = useAuth()
    const {refetch, data, isLoading , error} = useGetMyOrdersQuery({pageNumber:1, sortBy:'createdAt', order:'desc'},{
      refetchOnMountOrArgChange: true,
      skip: false,
    })
    const list = () => (
        <Box
            component="div"
          sx={{ width: "270px",height: "100%"}}
          role="presentation"
          onClick={handleCloseDrawer}
          onKeyDown={handleCloseDrawer}
        >
          <StyledList>
            <UserInfoCard alignItems="flex-start">
              <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ width: 56, height: 56, border: "3px solid white"}}
                    alt="Remy Sharp"
                    src={user.user.profileImage}
                  />
                </StyledBadge>
                <Stack>
                  <Typography variant="body1" color="white">
                    {`${user.user.fullName}`}
                  </Typography>
                  <Typography variant="caption" color="#A05F21">
                    {user.user.phoneNumber}
                  </Typography>
                </Stack>
              </Stack>
            </UserInfoCard>
            {MenuList.map((menu) => (
              <StyledNavLink key={`navlink ${menu.route}`} href={menu.route}>
                <StyledListItem
                  alignItems="flex-end"
                  button
                  key={menu.route}
                  secondaryAction={menu.countable ? <MenuCount>{ menu.route === "/notifications" ? 12 : menu.route == "/orders" ? !error && !isLoading && data.data.myOrderCount : 6} </MenuCount> : menu.route === "/profile" ? user.user.profileVerified ? <Activation background="green">ACTIVATED</Activation>:<Activation background="red">UNACTIVATED</Activation> : ""}
                >
                  <ListItemIcon>
                    <menu.icon color="#EACA1F" />
                  </ListItemIcon>
                  <ListItemText primary={menu.display} />
                </StyledListItem>
              </StyledNavLink>
            ))}
            <DrawerFooter secondaryAction={<Arrow />} alignItems="flex-start" >
              <ListItemIcon>
                <LogoutIcon color="#EACA1F" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </DrawerFooter>
          </StyledList>
        </Box>
      );
    return (
        <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        {list()}
      </Drawer>
    )
}
