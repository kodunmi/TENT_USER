import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Modal, Stack, Typography, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { EmptyData, OrderCard, TentSpinner,ErrorData } from "../../components";
import { useAuth } from "../../hooks";
import { AppLayout } from "../../layout";
import { OrderProps, OrderType } from "../../lib/type";
import { useGetMyOrdersQuery } from "../../services/order";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/PhoneCallback';

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [orderInModal, setOrderInModal] = useState<OrderType | undefined>();
  const { user } = useAuth()
  const handleOpen = (order: OrderType): void => {
    setOrderInModal(order)
    setOpen(true);
  }

  const { refetch, data, isLoading, error } = useGetMyOrdersQuery({ pageNumber: 1, sortBy: 'createdAt', order: 'desc' }, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => {
    refetch()
  }, [])

  const data2: Array<OrderType> = [
    {
      addedBuilding: true,
      status: "processing",
      paymentCompleted: false,
      _id: "616219ba06f7ac55a019a98e",
      estateId: {
        estateLocation: {
          address: "Adeleke Street, Off PMP Headquaters",
          city: "Wuse",
          state: "Abuja",
          zipCode: 6749003
        },
        _id: "6161e20f16e9a84b78f7317a",
        estateName: "Pen Villa Estate"
      },
      landSize: 7152,
      paymentMethod: "fullPayment",
      user: "616197db0a75444594c134f5",
      estateName: "Pen Villa Estate",
      landEstimatedPrice: 71520,
      building: {
        buildingType: "Pent House",
        numberOfRoom: 7,
        buildingEstimatedPrice: 70000
      },
      orderId: "ORD9830000",
      createdAt: "2021-10-09T22:37:46.493Z",
      updatedAt: "2021-10-09T22:37:46.501Z",
      totalEstimatedPrice: 141520
    },
    {
      addedBuilding: true,
      status: "complete",
      paymentCompleted: false,
      _id: "616219ba06f7ac55a019a98e",
      estateId: {
        estateLocation: {
          address: "Adeleke Street, Off PMP Headquaters",
          city: "Wuse",
          state: "Abuja",
          zipCode: 6749003
        },
        _id: "6161e20f16e9a84b78f7317a",
        estateName: "Pen Villa Estate"
      },
      landSize: 7152,
      paymentMethod: "fullPayment",
      user: "616197db0a75444594c134f5",
      estateName: "Pen Villa Estate",
      landEstimatedPrice: 71520,
      building: {
        buildingType: "Pent House",
        numberOfRoom: 7,
        buildingEstimatedPrice: 70000
      },
      orderId: "ORD9830000",
      createdAt: "2021-10-09T22:37:46.493Z",
      updatedAt: "2021-10-09T22:37:46.501Z",
      totalEstimatedPrice: 141520
    },
    {
      addedBuilding: true,
      status: "terminate",
      paymentCompleted: false,
      _id: "616219ba06f7ac55a019a98e",
      estateId: {
        estateLocation: {
          address: "Adeleke Street, Off PMP Headquaters",
          city: "Wuse",
          state: "Abuja",
          zipCode: 6749003
        },
        _id: "6161e20f16e9a84b78f7317a",
        estateName: "Pen Villa Estate"
      },
      landSize: 7152,
      paymentMethod: "fullPayment",
      user: "616197db0a75444594c134f5",
      estateName: "Pen Villa Estate",
      landEstimatedPrice: 71520,
      building: {
        buildingType: "Pent House",
        numberOfRoom: 7,
        buildingEstimatedPrice: 70000
      },
      orderId: "ORD9830000",
      createdAt: "2021-10-09T22:37:46.493Z",
      updatedAt: "2021-10-09T22:37:46.501Z",
      totalEstimatedPrice: 141520
    }
  ]

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
        {
          orderInModal && (
            <Card
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { lg: "500px", xs: "90%", sm: "70%", md: "500px" },
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: "7px"
              }}
            >
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
              />
              <CardContent sx={{ px: "10px" }}>
                <Typography sx={{ fontWeight: "bolder" }} color={(orderInModal ? orderInModal.status === "complete" ? "#04C300 !important" : orderInModal.status === "processing" ? "#007aff !important" : "red !important" : '')} variant="h4">
                  Order Summary
                </Typography>
                <Typography mt={6} variant="body1">
                  ORDER ID #{orderInModal.orderId}
                </Typography>
                <Typography variant="caption">
                  Payment Date: {orderInModal.createdAt}
                </Typography>
                <List sx={{
                  bgcolor: "action.hover",
                  borderRadius: "10px",
                  padding: "30px 20px 20px",
                  mt: "20px",
                  mb: "20px",
                }}>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Added Building:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.addedBuilding ? "Yes" : "No"}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Estate Name:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.estateName}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Payment Method:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.paymentMethod === "instalmentPayment" ? "Instalment Payment" : "Full Payment"}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Land Size:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.landSize}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Land Size:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.landSize}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="land Estimated Price:"
                      sx={{ fontWeight: 900 }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', fontWeight: 'bolder' }}
                      primary={orderInModal.landEstimatedPrice}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Total Estimated Price:"
                      sx={{ fontWeight: '900' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', fontWeight: '900' }}
                      primary={orderInModal.totalEstimatedPrice}
                    />
                  </ListItem>
                </List>
                {
                  orderInModal.status === 'complete' && (
                    <div>
                      <Typography variant="caption">
                        This is a summary of your order. You can speak to an agent
                        if you require further assistance.
                      </Typography>

                      <Box sx={{
                        bgcolor: "action.hover",
                        borderRadius: "10px",
                        padding: "10px",
                        mb: "-25px",
                        mt: "20px"
                      }}>
                        <Typography variant="caption">
                          Click here to Download Provisional Offer Letter or check your mail
                        </Typography>
                      </Box>
                    </div>
                  )
                }


              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  px: "10px",
                  pb: '10px'
                }}
              >
                {
                  orderInModal.status === "processing" && (
                    <Stack direction="row" sx={{ width: "100%" }}>
                      <Button sx={{
                        padding: "10px 30px",
                        marginRight: "10px"
                      }} fullWidth variant="contained" color="neutral">
                        Proceed to Payment
                      </Button>
                      <Button variant="contained" color="primary">
                        <PhoneIcon fontSize="inherit" />
                      </Button>
                    </Stack>

                  )
                }

              </CardActions>
            </Card>
          )
        }

      </Fade>
    </Modal>
  )
  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px", width: "100%" }}>
        <Stack mb={1} direction="row" justifyContent="space-between">
          <Typography variant="h5">My Orders</Typography>
          <Typography variant="h5">{!isLoading && data.data.myOrderCount}</Typography>
        </Stack>
        <Divider variant="middle" />
        <Box sx={{ overflow: 'scroll', height: "100vh" }}>
          <Stack mt={2}>

            {
              isLoading ? <TentSpinner /> : error ? <ErrorData/> : data.data.myOrderCount < 1 ? <EmptyData/> : data.data.myOrders.map((order: OrderType) => {
                <OrderCard handleModalOpen={(order) => handleOpen(order)} order={order} />
              })
            }

            {/* {
              data2.map((data) => <OrderCard handleModalOpen={(order) => handleOpen(order)} order={data} />)
            } */}
          </Stack>
        </Box>

      </Box>
      {viewOrder}
    </AppLayout>
  );
};

export default Orders;
