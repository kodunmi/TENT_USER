import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, Divider, Fade, Modal, Stack, Typography, Grid, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { EmptyData, OrderCard, TentSpinner,ErrorData } from "../../components";
import { useAuth } from "../../hooks";
import { AppLayout } from "../../layout";
import { OrderProps, OrderType, InstallmentOrderType } from "../../lib/type";
import { useGetMyOrdersQuery } from "../../services/order";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneIcon from '@mui/icons-material/PhoneCallback';
import { WithAuth } from "../../HOC";
import NumberFormat from "react-number-format";
import moment from "moment";
import { FrontendUrl } from "../../lib";
import { useSnackbar } from "notistack";
import { useMakePaymentMutation } from "../../services";
import { LoadingButton } from "@mui/lab";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let [orderInModal, setOrderInModal] = useState<OrderType | undefined | InstallmentOrderType>();
  const [makePayment, { isLoading: makingPayment }] = useMakePaymentMutation()
  const { user } = useAuth()
  const handleOpen = (order: OrderType): void => {
    setOrderInModal(order)
    setOpen(true);
  }
  const [page, setpage] = useState(1)

  const { refetch, data, isLoading, error } = useGetMyOrdersQuery({ pageNumber: page, sortBy: 'createdAt', order: 'desc' },{
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    refetch()
  }, [])

  const handleClose = () => setOpen(false);

  

  console.log(data);
  
  
  orderInModal = orderInModal as OrderType;

  
  
  const handlePayment = async () => {
    try {
    
      let order = orderInModal as OrderType;
      const res = await makePayment({ orderId: order._id, redirectLink: `${FrontendUrl}payments` }).unwrap()

      window.location.href = res.data.data.link

    } catch (err) {
      enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
        variant: 'warning'
      });
    }
  }
   
  


  const viewOrder = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      disableAutoFocus
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
                borderRadius: "7px",
                maxHeight: "80vh",
                overflowY: "auto",
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
                <Typography sx={{ fontWeight: "bolder" }} color={(orderInModal ? orderInModal.status === "completed" ? "#04C300 !important" : orderInModal.status === "processing" ? "#007aff !important" : "red !important" : '')} variant="h4">
                  Order Summary
                </Typography>
                <Typography mt={6} variant="body1">
                  ORDER ID #{orderInModal.orderId}
                </Typography>
                <Typography variant="caption">
                  Payment Date:{  moment(orderInModal.createdAt).format('Do MMM YYYY') }
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
                      primary="Legal fee:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.legalFee}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Infrastructure fee:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.infrastructureFee}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Survey fee:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.surveyFee}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Engineering supervision fee:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.engineeringSupervisionFee}
                    />
                  </ListItem>
                  <hr />
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Discount:"
                      sx={{ color: 'text.secondary' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', color: 'text.secondary' }}
                      primary={orderInModal.discount}
                    />
                  </ListItem>
                  <ListItem sx={{ padding: '0px !important' }}>
                    <ListItemText
                      primary="Total Estimated Price:"
                      sx={{ fontWeight: '900' }}
                    />
                    <ListItemText
                      sx={{ textAlign: 'right', fontWeight: '900' }}
                      primary={
                        <NumberFormat
                        value={Math.trunc(orderInModal.totalEstimatedPrice)}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="# "
                      />
                      }
                    />
                  </ListItem>
                </List>
                {
                  orderInModal.status === 'completed' && (
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
                      <LoadingButton sx={{
                        padding: "10px 30px",
                        marginRight: "10px"
                      }} loading={makingPayment} onClick={() => handlePayment()} fullWidth variant="contained" color="neutral">
                        Proceed to Payment
                      </LoadingButton>
                      <Button  variant="contained" color="primary">
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
        <Box sx={{ overflow: 'scroll', height: {md:"70vh", sm: "85vh", lg:"70vh", xs:"85vh"} }}>
          <Stack mt={2}>

            {
              error ? <ErrorData/>  : isLoading ? <TentSpinner /> : data.data.myOrderCount < 1 ? <EmptyData/> : data.data.myOrders.map((order: OrderType) => <OrderCard handleModalOpen={(order) => handleOpen(order)} order={order} />
              )
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

export default WithAuth(Orders);
