import { Grid, ListItem, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode } from "react";
import { SideBar, NavBar } from "../components";
import styled from "styled-components";
import { Box } from "@mui/system";
import { SideDrawer } from ".";

const drawerWidth = 200;

interface AppLayoutProps {
  children: ReactNode;
  basic?: boolean;
}

export const DrawerFooter = styled(ListItem)`
  position: absolute;
  bottom: 20px;
  right: 50%;
  transform: translateX(50%);
`;

export const Activation = styled.span`
  color: white;
  background-color: ${(props: { background: string }) => props.background};
  border-radius: 99px;
  padding: 4px 5px 2px 5px;
  font-size: 8px;
  font-weight: 900;
  line-height: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Bg = styled.div`
    width: 100%;
    height: 200px;
    background: url("/images/hero.png") center center/cover no-repeat;

    @media (max-width: 900px) {
      display: none;
    }
  `;

const Content = styled(Grid)`
max-width: 90%;
margin: auto;
max-height: calc(100% - 200px);
margin-top: -100px;
@media (max-width: 900px) {
  margin-top: 10px;
  max-width: 100%;
}

@media (max-width: 1100px) {
  max-width: 98%;
} ;
`;
const SGrid = styled(Grid)`
height: calc(100vh - 200px);

@media (max-width: 900px) {
  height: 100vh;
  width: 100%;
} ;
`;

const NoPGrid = styled(SGrid)`
padding-left: 0px !important;
`;

const Main = styled(Box)`
width: 100%;
height: 100%;
border-radius: 6px;
overflow: hidden;
`;

const Main2 = styled(Box)`
width: 100%;
height: 100vh;
border-radius: 6px;
overflow: auto;
`;

export const AppLayout = ({ children, basic }: AppLayoutProps) => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: "action.hover",
          height: { sm: "100%", xs: "100%", lg: "100vh", md: "100vh" },
        }}
      >
        <NavBar onclick={toggleDrawer(true)} />
        {basic ? (
          <Main2
            sx={{
              backgroundColor: "action.hover",
            }}
            component="main"
          >
            {children}
          </Main2>
        ) : (
          <Main>
            <Bg />
            <Content columnSpacing={{ lg: 3, md: 3, sm: 0, xs: 0 }} container>
              <NoPGrid
                lg={3}
                md={3}
                sx={{
                  display: {
                    sm: "none",
                    lg: "block",
                    md: "block",
                    xs: "none",
                    paddingLeft: "0px",
                  },
                }}
                item
              >
                <SideBar />
              </NoPGrid>
              <SGrid lg={9} md={9} sm={12} item>
                <Main
                  sx={{
                    backgroundColor: {
                      sm: "none",
                      lg: "background.paper",
                      md: "background.paper",
                      xs: "background.paper",
                    },
                  }}
                  component="main"
                >
                  {children}
                </Main>
              </SGrid>
            </Content>
          </Main>
        )}
      </Box>
      <SideDrawer
        handleCloseDrawer={toggleDrawer(false)}
        handleOpenDrawer={toggleDrawer(true)}
        openDrawer={openDrawer}
      />
    </React.Fragment>
  );
};
