import { Card,Grid, Stack, Typography,Theme, Button } from "@mui/material";
import React from "react";
import { withTheme } from "@mui/styles";
import styled from "styled-components";
import { OrderProps,OrderType } from "../../lib/type";
import Pin from 'remixicon-react/MapPinLineIcon'
import Home from 'remixicon-react/Home2LineIcon'

interface StatusProps {
  background: string
}
const SCard = withTheme(styled(Card)`
  border-radius: 9.35294px;
  border: 0.5px solid #cccccc;
  padding: 20px;
  box-shadow: none;
  background-color: ${(props)=> props.theme.palette.background.paper};
  background-image: none !important;
  margin-bottom: 12px;
`);
export const IconButton = styled.div`
  background: rgba(234, 202, 31, 0.25);
  border-radius: 6px;
  width: 50px;
  height: 50px;
  display: flex;
    align-items: center;
    justify-content: center;
    color: #EACA1F;
`;

const Status = styled.div`
background: ${(props: StatusProps)=> props.background};
border-radius: 154.324px;
padding: 5px 10px;
display: inline-block;
height: fit-content;
font-size: 14px;
color: #fff;
`

interface CardOrderProps  {
  order: OrderType,
  handleModalOpen: (order: OrderType) => void
}



export const OrderCard = ({order,handleModalOpen}: CardOrderProps) => {
  return (
    <SCard onClick={() => handleModalOpen(order)}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Stack spacing={4} direction="row">
            <IconButton>
              {
                order.addedBuilding ?  <Home/> :  <Pin/>
              }
            </IconButton>
            <Stack spacing={0}>
                <Typography mb={0} variant="h6">
                    {order.landSize} sqm
                </Typography>
                <Typography variant="caption">
                    {order.estateId.estateLocation.address}
                </Typography>
            </Stack>

        </Stack>
        {
          order.status == "terminate" && <Status background="red" >FAILED</Status>
        }
        {
          order.status === "complete" && <Status background="#04C300" >SUCCESSFUL</Status>
        }
        {
          order.status === "processing" && <Status background="#00A3FF">PROCESSING</Status>
        }        
      </Grid>
    </SCard>
  );
};
