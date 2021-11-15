import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "../../components";
import styled from "styled-components";
import { MenuList } from "../../lib/menu";
import { Box, maxHeight, Theme } from "@mui/system";
import { withTheme } from "@mui/styles";
import { Activation, DrawerFooter } from "../../layout";
import LogoutIcon from "remixicon-react/LogoutBoxLineIcon";
import Arrow from "remixicon-react/ArrowRightSLineIcon";
import { UserData } from "../../lib/data";

const StyledNavLink = styled(props => <NavLink {...props} />)`
  .active-link {
    color: #eaca1f !important;
  }
`;

const StyledListItem = withTheme(styled(ListItem)`
border-bottom: 1px solid ${props => props.theme.palette.text.secondary};
padding: 0px 0px 10px 0px;
margin-top: 30px;
&.active-link {
  border-bottom: 1px solid #eaca1f;
}
`)

export const MenuCount = styled("div")({
  background: "#04C300",
  borderRadius: "50%",
  color: "#ffff",
  fontSize: "8px",
  width: "16px",
  height: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "5px",
  marginBottom: "10px",
});

const MenuMain = withTheme(styled(Box)`
  height: 100%;
  padding: 5px 20px;
  border-radius: 6px;
  box-shadow: 0px 8px 12px ${(props) => props.theme.palette.action.hover};
  overflow: auto;
`)

export const SideBar = () => {
  return (
    <MenuMain sx={{backgroundColor:"background.paper"}}>
      <List sx={{height:"100%"}}>
        {MenuList.map((menu) => (
          <StyledNavLink key={`navlink ${menu.route}`} href={menu.route}>
            <StyledListItem
              button
              key={menu.route}
              secondaryAction={menu.countable ? <MenuCount>{ menu.route === "/notifications" ? 12 : menu.route == "/orders" ? 12 : 6} </MenuCount> : menu.route === "/profile" ? UserData.user.accountVerified ? <Activation background="green">ACTIVATED</Activation>:<Activation background="red">UNACTIVATED</Activation> : ""}
            >
              <ListItemIcon>
                <menu.icon />
              </ListItemIcon>
              <ListItemText primary={menu.display} />
            </StyledListItem>
          </StyledNavLink>
        ))}
        <DrawerFooter sx={{color:"#EA371F"}} secondaryAction={<Arrow/>} alignItems="flex-start">
          <ListItemIcon>
            <LogoutIcon color="#EA371F" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </DrawerFooter>
      </List>
    </MenuMain>
  );
};
