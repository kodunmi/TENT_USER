import { AppLayout } from "../layout";
import styled from "styled-components";
import { ArrowRightButton, AtmCard, IconButton, IPhone, TentCard, TentSpinner, TentTextField } from "../components";
import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, Fade, FormControl, FormControlLabel, Grid, InputAdornment, List, ListItem, ListItemText, MenuItem, Modal, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { withTheme } from "@mui/styles";
import ArrowRight from "remixicon-react/ArrowRightLineIcon";
import HomeIcon from "remixicon-react/Home5LineIcon";
import Pin from "remixicon-react/MapPinLineIcon";
import SizeIcon from "remixicon-react/ShapeLineIcon";
import { Box, maxHeight, Theme } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React, { useEffect, useRef, useState } from "react";
import { useGetCardFacilitiesQuery, useGetFacilitiesQuery, useMakePaymentMutation } from "../services";
import { BuildingType, FrontendUrl, InstallmentOrderType, OrderType, paymentMethodEnums } from "../lib";
import { getEstimateProps, useGetEstimateMutation } from "../services/order";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import PhoneIcon from '@mui/icons-material/PhoneCallbackTwoTone';
import Home from 'remixicon-react/Home5LineIcon'
import NumberFormat from "react-number-format";
import moment from "moment";


const Bg = styled.div`
  width: 100%;
  height: 400px;
  background: url("/images/hero2.png") center center/cover no-repeat;
  @media (max-width: 900px) {
    height: 200px;
  }
`;

const InvoiceItem = styled.div`
 box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
 border-radius: 6px;
 width: 100%;
 padding: 20px;
  `

const MainImage = withTheme(styled.div`
  max-width: 100%;
  height: 250px;
  // background: url("/images/main.png") center center/contain no-repeat;
  position: relative;
  z-index: 1;
  &:after {
    content: "";
    filter: blur(10px);
    border-radius: 6px;
    top: 20px;
    background: url(/images/main.png);
    position: absolute;
    left: 20px;
    float: left;
    width: 300px;
    height: 250px;
    z-index: -1;
    opacity: ${(props) =>
    props.theme.palette.mode === "dark" ? 0.3 : 1};

    @media (max-width: 370px) {
      width: 250px;
      height: 200px;
    }
  }

  img {
    @media (max-width: 370px) {
      width: 250px;
      height: 200px;
    }
  }
`);

const Content = withTheme(styled(Card)`
  max-width: 90%;
  // margin-bottom: ;
  margin: -100px auto 30px;
  // margin-top: ;
  box-shadow: 0px 8px 12px ${(props) => props.theme.palette.action.hover};
  @media (max-width: 900px) {
    margin-top: -50px;
    max-width: 100%;
  }

  @media (max-width: 1100px) {
    max-width: 95%;
  } ;
`);

const Footer = withTheme(styled.div`
  background: ${(props) =>
    props.theme.palette.mode === "dark" ? "black" : "#fff2ac"};
  height: 250px;
  position: relative;
  display: flex;
  align-items: center;
  // margin-bottom: 100px;
  justify-content: center;
  // overflow:hidden;
`);

const MainBtn = withTheme(styled(Button)`
  padding: 10px 20px;
`);

const IPhoneContainer = styled.div`
  // top: -30px;
  // left: 200px;
  // position: absolute;
  margin-top: -45px;
  @media (max-width: 1100px) {
    margin-left: -100px;
  } 
`;

const PaymentCard = styled.div`
  padding: 15px 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: #ffff;
`;




export default function HomePage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClosePaymentTypeModal = () => setOpenPaymentTypeModal(false);
  const [building, setBuilding] = useState<Array<BuildingType>>([])
  const [formState, setFormState] = useState<getEstimateProps>()
  const [openPaymentTypeModal, setOpenPaymentTypeModal] = useState(false)
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false)
  let [orderInModal, setOrderInModal] = useState<OrderType | InstallmentOrderType | undefined>();
  const { refetch, data, error, isLoading } = useGetFacilitiesQuery('', {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open])


  const { data: cardData, error: cardDataError, isLoading: isLoadingCardData } = useGetCardFacilitiesQuery('', {
    refetchOnMountOrArgChange: true,
    skip: false,
    refetchOnReconnect: true,
  })
  const [getEstimate, { isLoading: gettingEstimate }] = useGetEstimateMutation()

  const [makePayment, { isLoading: makingPayment }] = useMakePaymentMutation()

  const handleEstateChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {

    const fac = data.data.filter(fac => {
      return fac._id == value
    });

    setBuilding(fac[0].buildings)
    setFormState((prev) => ({ ...prev, estateId: value }))

  }

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setOpenPaymentTypeModal(true)

  }

  const handleGetEstimate = async () => {

    try {
      const resp = await getEstimate(formState).unwrap()
      console.log(resp);
      if (formState.paymentMethod == 'fullPayment') {
        setOrderInModal(resp.data as OrderType)
      } else {
        setOrderInModal(resp.data as InstallmentOrderType)
      }

      setOpenInvoiceModal(true)
      enqueueSnackbar('Order placed successfully', { variant: 'success' })

    } catch (err) {
      enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
        variant: 'warning'
      });
    }
    console.log(formState);

  }

  const handlePayment = async () => {
    try {

      let orderId: string
      if (orderInModal && formState.paymentMethod == 'fullPayment') {
        const fullPayment = orderInModal as OrderType
        orderId = fullPayment._id
      } else {
        const installmentPayment = orderInModal as InstallmentOrderType
        orderId = installmentPayment.order._id
      }
      const res = await makePayment({ orderId: orderId, redirectLink: `${FrontendUrl}payments` }).unwrap()

      window.location.href = res.data.data.link

    } catch (err) {
      enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
        variant: 'warning'
      });
    }
  }
  const RadioLabel = ({ primary, secondary }: { primary: string, secondary: string }) => {
    return <Stack>
      <Typography variant="h5">
        {primary}
      </Typography>
      <Typography variant="body1">
        {secondary}
      </Typography>
    </Stack>
  }


  const PaymentOptionModalTitle = (
    <Stack>
      <Typography textAlign="center" variant="h4">
        Payment Option
      </Typography>
      <Typography textAlign="center" variant="body1">
        Choose a payment plan you are comfortable with.
      </Typography>
    </Stack>
  )

  const InvoiceModal = () => {

    if (orderInModal && formState.paymentMethod == 'fullPayment') {

      orderInModal = orderInModal as OrderType
      return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openInvoiceModal}
          // onClose={() => setOpenInvoiceModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          disableEnforceFocus={true}
          disableAutoFocus={true}
          BackdropProps={{
            timeout: 500,
          }}
          disableEscapeKeyDown={true}
        >
          <Fade in={openInvoiceModal}>
            {
              orderInModal && (
                <Card
                  sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { lg: "500px", xs: "90%", sm: "70%", md: "500px" },
                    bgcolor: "background.secondary",
                    boxShadow: 24,
                    borderRadius: "5px",
                    maxHeight: "80%",
                    overflowY: "auto",
                  }}
                >
                  <CardHeader
                    sx={{
                      backgroundColor: "#EACA1F",
                      padding: "20px 0px 20px 20px",
                      textAlign: "left",
                    }}
                    title='Invoice Estimate'
                  />


                  <CardContent sx={{ px: "10px" }}>
                    <InvoiceItem>
                      <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: "15px", marginTop: "10px" }}>

                          {
                            orderInModal.addedBuilding ? <Home color="#EACA1F" /> : <Pin color="#EACA1F" />
                          }

                        </div>

                        <div>
                          <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>1,200sqm of Land</h3>
                          <p style={{ marginTop: "0px", fontSize: "16.087px", color: '#788190' }}>Diplomatic Hill Est. Bwari - Kaduna Ex...</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: "40px" }}>
                        <p>
                          <NumberFormat
                            value={Math.trunc(orderInModal.totalEstimatedPrice)}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="NGN "
                          />
                        </p>
                        <p>{moment(orderInModal.createdAt).format('Do MMM YYYY')}</p>
                      </div>
                    </InvoiceItem>
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
                    <p>This This is a summary of your order. You can speak to an agent if you require further assistance.</p>
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
                    <Stack direction="row" sx={{ width: "100%" }}>
                      <LoadingButton sx={{
                        padding: "10px 30px",
                        marginRight: "10px"
                      }} fullWidth variant="contained" color="neutral"
                        onClick={handlePayment}
                        loading={makingPayment}
                      >
                        Proceed to Payment
                      </LoadingButton>
                      <Button variant="contained" color="primary">
                        <PhoneIcon fontSize="medium" />
                      </Button>
                    </Stack>
                  </CardActions>


                </Card>
              )
            }

          </Fade>
        </Modal>
      )
    }

    // if(orderInModal && formState.paymentMethod == 'instalmentPayment'){

    orderInModal = orderInModal as InstallmentOrderType
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openInvoiceModal}
        // onClose={() => setOpenInvoiceModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableEnforceFocus={true}
        disableAutoFocus={true}
        BackdropProps={{
          timeout: 500,
        }}
        disableEscapeKeyDown={true}
      >
        <Fade in={openInvoiceModal}>
          {
            orderInModal && (
              <Card
                sx={{
                  position: "absolute" as "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { lg: "500px", xs: "90%", sm: "70%", md: "500px" },
                  bgcolor: "background.secondary",
                  boxShadow: 24,
                  borderRadius: "5px",
                  maxHeight: "80%",
                  overflowY: "auto",
                }}
              >
                <CardHeader
                  sx={{
                    backgroundColor: "#EACA1F",
                    padding: "20px 0px 20px 20px",
                    textAlign: "left",
                  }}
                  title='Invoice Estimate'
                />


                <CardContent sx={{ px: "10px" }}>
                  {/* <Grid  columns={3} container spacing={1} sx={{ width:'100%' }}>
                    <Grid xs={4} md={4} lg={4} sm={4} item>
                      <TentCard rounded>
                      {orderInModal.paymentPlan.firstPayment}
                      </TentCard>
                    </Grid>
                    <Grid xs={4} md={4} lg={4} sm={4} item>
                      <TentCard rounded>
                      {orderInModal.paymentPlan.secondPayment}
                      </TentCard>
                    </Grid>
                    <Grid xs={4} md={4} lg={4} sm={4} item>
                      <TentCard rounded>
                      {orderInModal.paymentPlan.thirdPayment}
                      </TentCard>
                    </Grid>
                  </Grid> */}
                  <Grid sx={{ mb: '20px' }} container spacing={1}>
                    <Grid item xs={4}>
                    <PaymentCard>
                      <p>First<hr/> instalment</p>
                      <h2>{orderInModal.paymentPlan.firstPayment}</h2>
                    </PaymentCard>
                      
                    </Grid>
                    <Grid item xs={4}>
                      <PaymentCard>
                        <p>Second<hr/> instalment</p>
                        <h2>{orderInModal.paymentPlan.secondPayment}</h2>
                      </PaymentCard>
                      
                    </Grid>
                    <Grid item xs={4}>
                      <PaymentCard>
                        <p>Third<hr/> instalment</p>
                        <h2>{orderInModal.paymentPlan.thirdPayment}</h2>
                      </PaymentCard>
                      
                    </Grid>

                  </Grid>
                  <InvoiceItem>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: "15px", marginTop: "10px" }}>

                        {
                          orderInModal.order.addedBuilding ? <Home color="#EACA1F" /> : <Pin color="#EACA1F" />
                        }

                      </div>

                      <div>
                        <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>1,200sqm of Land</h3>
                        <p style={{ marginTop: "0px", fontSize: "16.087px", color: '#788190' }}>Diplomatic Hill Est. Bwari - Kaduna Ex...</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: "space-between", marginLeft: "40px" }}>
                      <p>
                        <NumberFormat
                          value={Math.trunc(orderInModal.order.totalEstimatedPrice)}
                          displayType="text"
                          thousandSeparator={true}
                          prefix="NGN "
                        />
                      </p>
                      <p>{moment(orderInModal.order.createdAt).format('Do MMM YYYY')}</p>
                    </div>
                  </InvoiceItem>
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
                        primary={orderInModal.order.addedBuilding ? "Yes" : "No"}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Estate Name:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.estateName}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Payment Method:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.paymentMethod === "instalmentPayment" ? "Instalment Payment" : "Full Payment"}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Land Size:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.landSize}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="land Estimated Price:"
                        sx={{ fontWeight: 900 }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', fontWeight: 'bolder' }}
                        primary={orderInModal.order.landEstimatedPrice}
                      />
                    </ListItem>

                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Legal fee:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.legalFee}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Infrastructure fee:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.infrastructureFee}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Survey fee:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.surveyFee}
                      />
                    </ListItem>
                    <ListItem sx={{ padding: '0px !important' }}>
                      <ListItemText
                        primary="Engineering supervision fee:"
                        sx={{ color: 'text.secondary' }}
                      />
                      <ListItemText
                        sx={{ textAlign: 'right', color: 'text.secondary' }}
                        primary={orderInModal.order.engineeringSupervisionFee}
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
                        primary={orderInModal.order.discount}
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
                            value={Math.trunc(orderInModal.order.totalEstimatedPrice)}
                            displayType="text"
                            thousandSeparator={true}
                            prefix="# "
                          />
                        }
                      />
                    </ListItem>
                  </List>
                  <p>This This is a summary of your order. You can speak to an agent if you require further assistance.</p>
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
                  <Stack direction="row" sx={{ width: "100%" }}>
                    <LoadingButton sx={{
                      padding: "10px 30px",
                      marginRight: "10px"
                    }} fullWidth variant="contained" color="neutral"
                      onClick={handlePayment}
                      loading={makingPayment}
                    >
                      Proceed to Payment
                    </LoadingButton>
                    <Button variant="contained" color="primary">
                      <PhoneIcon fontSize="medium" />
                    </Button>
                  </Stack>
                </CardActions>


              </Card>
            )
          }

        </Fade>
      </Modal>
    )
    // }
  }



  const PaymentTypeModal = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openPaymentTypeModal}
      onClose={handleClosePaymentTypeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openPaymentTypeModal}>
        <Card
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { lg: "500px", xs: "90%", sm: "70%", md: "500px" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "13px"
          }}
        >
          <CardHeader
            sx={{
              borderBottom: "1px solid #F5F5F5",
              padding: "20px 0px 20px 20px",
              textAlign: "left",
            }}
            title={PaymentOptionModalTitle}
          />
          {
            <form>
              <CardContent sx={{ px: { lg: "50px", md: "50px", sm: "30px", xs: "50px 10px" } }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    onChange={(e) => setFormState((prev) => ({ ...prev, paymentMethod: e.target.value as 'instalmentPayment' | 'fullPayment' }))}
                    aria-label="payment"
                    name="paymentMethod"
                  >
                    <FormControlLabel sx={{ mb: "30px" }} value="fullPayment" control={<Radio />} label={RadioLabel({ primary: 'Full Payment', secondary: 'Pay 100% of the total value once.' })} />
                    <FormControlLabel value="instalmentPayment" control={<Radio />} label={RadioLabel({ primary: 'instalment Payment', secondary: 'Pay 50% of the total value upfront and the balance in 30 days.' })} />
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 50px",
                }}
              >
                <LoadingButton
                  loading={gettingEstimate}
                  sx={{
                    padding: "15px 30px"
                  }} fullWidth variant="contained" color="neutral" onClick={() => handleGetEstimate()}>
                  Save and continue
                </LoadingButton>
              </CardActions>
            </form>
          }

        </Card>
      </Fade>
    </Modal>
  )

  const GetEstimateModal = (
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
            width: { lg: "500px", xs: "90%", sm: "70%", md: "500px" },
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "13px"
          }}
        >
          <CardHeader
            sx={{
              borderBottom: "1px solid #F5F5F5",
              padding: "40px 0px 20px 10%",
              textAlign: "left",
            }}
            title="Get estimate"
          />
          {
            isLoading ? <TentSpinner /> : (
              <form onSubmit={handleSubmit}>
                <CardContent sx={{ px: { lg: "50px", md: "50px", sm: "30px", xs: "50px 10px" } }}>
                  <Stack spacing={4}>
                    <TextField
                      required
                      onChange={handleEstateChange}
                      name="estateId"
                      type="select"
                      select
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Pin />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {
                        error ? <p>Error</p> : isLoading ? <MenuItem>Loading...</MenuItem> : data.data.map(fac => <MenuItem key={`e-${fac._id}`} value={fac._id} >{fac.estateName}</MenuItem>)
                      }
                    </TextField>
                    <Stack direction="row" spacing={2}>
                      <Grid item lg={6} sm={6} md={6} xs={6}>
                        <TextField
                          onChange={handleChange}
                          required
                          name="landSize"
                          type="number"
                          placeholder="Size"
                          fullWidth
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SizeIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item lg={6} sm={6} md={6} xs={6}>
                        <TextField
                          onChange={(e) => setFormState((prev) => ({ ...prev, buildingTypeId: e.target.value }))}
                          name="buildingTypeId"
                          select
                          fullWidth
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <HomeIcon />
                              </InputAdornment>
                            ),
                          }}
                        >
                          {
                            building.map(building => <MenuItem key={`c-${building._id}`} value={building._id} >{building.buildingType}</MenuItem>)
                          }
                        </TextField>
                      </Grid>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px 50px",
                  }}
                >
                  <Button sx={{
                    padding: "15px 30px"
                  }} fullWidth variant="contained" color="neutral" type="submit" >
                    Submit
                  </Button>
                </CardActions>
              </form>

            )
          }

        </Card>
      </Fade>
    </Modal>
  );
  return (
    <AppLayout basic>
      <Bg />
      <Content>
        <Grid
          container
          sx={{
            padding: {
              lg: "123px 180px",
              md: "100px 120px",
              sm: "70px 50px",
              xs: "50px 30px",
            },
          }}
        // spacing={4}
        >
          <Grid item lg={6} md={6} sm={12}>
            <Typography mb={3} variant="h5">
              Investing in Real Estateis a major keystone of <b>Wealth.</b>
            </Typography>
            <Typography mb={5} variant="subtitle1">
              Tent Group real estate is accessible. Just a select a location and
              set your size. it’s that simple.
            </Typography>
            <Button
              sx={{
                padding: "15px 30px"
              }}
              variant="contained"
              color="neutral"
              endIcon={<ArrowRightButton />}
              onClick={handleOpen}
            >
              Get estimate
            </Button>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            sx={{
              padding: {
                lg: "0px 150px",
                md: "0px 100px",
                sm: "40px 0px",
                xs: "40px 0px",
              },
            }}
          >
            <MainImage>
              {" "}
              <img
                style={{ borderRadius: "6px" }}
                alt="logo"
                src="/images/main.png"
                height="250px"
                width="300px"
              />
            </MainImage>
          </Grid>
        </Grid>
        <Footer>
          <IPhoneContainer>
            <IPhone />
          </IPhoneContainer>
          <Stack
            sx={{
              marginLeft: { lg: "50px", md: "30px", sm: "20px", xs: "10px" },
              padding: { xs: "20px 10px 20px 0px" },
            }}
          >
            <Typography mb={{ lg: 5, xs: 0, md: 4, sm: 3 }} variant="h6">
              Start your real estate journey or build <br />
              your ideal Home with <b>Tent Group</b>
            </Typography>
            <Stack
              // direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
              direction={{ xs: "column", sm: "row" }}
            >

              <TentTextField
                style={{ height: "100%" }}
                sx={{
                  marginRight: "5px",
                  width: { lg: "400px", md: "200px", sm: "100%" },
                  border: "none",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  height: "100%",
                }}
                placeholder="Email"
                fullWidth
              />

              <Button
                sx={{
                  fontSize: { xs: "9px", sm: "9px", lg: "13px", md: "13px" },
                }}
                variant="contained"
                endIcon={<ArrowRight />}
                color="neutral"
              >
                JOIN OUR NEWSLETTER
              </Button>
            </Stack>
          </Stack>
        </Footer>
      </Content>
      <Box sx={{ marginBottom: "50px" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "640": {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            "768": {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            "1024": {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            "1300": {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
        >
          {
            isLoadingCardData ? <TentSpinner /> : cardDataError ? 'error' : (
              cardData.data.map((data) => {
                return <SwiperSlide key={`index-slide-${data._id}`}>
                  <AtmCard {...data} />
                </SwiperSlide>
              })
            )
          }
        </Swiper>
      </Box>
      {GetEstimateModal}
      {PaymentTypeModal}
      {InvoiceModal()}
    </AppLayout>
  );
}
