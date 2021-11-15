import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Modal, Stack, Typography,Grid } from "@mui/material";
import { Box } from "@mui/system";
import React,{useState} from "react";
import { OrderCard } from "../../components";
import { useAuth } from "../../hooks";
import { AppLayout } from "../../layout";
import { OrderProps } from "../../lib/type";

const data: Array<OrderProps> = [
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "FAILED",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "FAILED",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "PROCESSING",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    status: "SUCCESSFUL",
    type: "building",
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [orderInModal, setOrderInModal] = useState<OrderProps|undefined>();
  const {user} = useAuth()
  const handleOpen = (order: OrderProps):void => {
    setOrderInModal(order)
    setOpen(true);
  } 
  console.log(user);
  
  const u = () => {
    console.log("lksmkmss")
  }
  const handleClose = () => setOpen(false);

  const viewOrder = (
<Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:{lg:"500px",xs:"90%",sm:"70%",md:"500px"} ,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "7px"
          }}
        >
          <CardHeader
            sx={{
              borderBottom: "1px solid #F5F5F5",
              px:{lg:"30px", md:"30px",sm:"10px",xs:"50px 10px"}, 
              pt:"30px",
              textAlign: "left",
              color: "white !important",
              backgroundColor:(orderInModal ? orderInModal.status === "SUCCESSFUL" ?"#04C300 !important" : orderInModal.status === "PROCESSING" ? "#007aff !important": "red !important":"")
            }}
            subheader={
              <Grid container>
                <Grid item sm={6} md={6} lg={6} xs={6}> 
                  <Typography color="white" align="left" variant="body2">
                      {orderInModal && "AUG 24, 2020"}
                  </Typography>
                      
                </Grid>
                <Grid item sm={6} md={6} lg={6} xs={6}> 
                  <Typography color="white" align="right" variant="body2">
                     {orderInModal && `Transaction ID: ${orderInModal.type}`}
                  </Typography>
                      
                </Grid>
              </Grid>
            }
          />
          <CardContent sx={{ px:{lg:"30px", md:"30px",sm:"10px",xs:"50px 10px"}  }}>
           {orderInModal && orderInModal.title}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px:{lg:"30px", md:"30px",sm:"10px",xs:"50px 10px"} 
            
            }}
          >
            <Button  sx={{
              padding:"10px 30px",
              backgroundColor:(orderInModal ? orderInModal.status === "SUCCESSFUL" ?"#04C300 !important" : orderInModal.status === "PROCESSING" ? "#007aff !important": "red !important":'')

            }} disabled fullWidth variant="contained" color={"success"}>
              <Typography color="white" align="center" variant="h6">
              {orderInModal && orderInModal.status}
              </Typography>
             
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  )
  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px", width:"100%" }}>
        <Stack mb={1} direction="row" justifyContent="space-between">
          <Typography variant="h5">My Orders</Typography>
          <Typography variant="h5">700</Typography>
        </Stack>
        <Divider variant="middle" />
        <Box sx={{overflow: 'scroll',height:"100vh"}}>
          <Stack mt={2}>
          {
            data.map((data) => <OrderCard handleModalOpen={(order) => handleOpen(order)} order={data}/>)
          }
        </Stack>
        </Box>
        
      </Box>
          {viewOrder}
    </AppLayout>
  );
};

export default Orders;
