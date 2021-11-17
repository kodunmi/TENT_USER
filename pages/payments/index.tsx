import {
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Grid,
  Card,
  Button,
  Paper,
  Modal,
  Fade,
  CardHeader,
  CardContent,
  CardActions,
  Backdrop,
  MenuItem,
} from "@mui/material";
import { Box, display } from "@mui/system";
import React from "react";
import { ArrowRightButton, EmptyData, ErrorData, IconButton, TentSpinner, TentTextField } from "../../components";
import { AppLayout } from "../../layout";
import Search from "remixicon-react/SearchLineIcon";
import { withTheme } from "@mui/styles";
import styled from "styled-components";
import Pin from "remixicon-react/MapPinLineIcon";
import Home from "remixicon-react/Home2LineIcon";
import Add from "remixicon-react/AddCircleLineIcon";
import { SwiperSlide, Swiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { styled as m } from "@mui/material/styles";
import { CardProps, useAddCardMutation, useGetCardsQuery, useGetTransactionsQuery } from "../../services";
import { useSnackbar } from "notistack";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import creditCardType, {
  getTypeInfo,
  types as CardType,
} from "credit-card-type";
import { PaymentType } from "../../lib";

const SCard = withTheme(styled(Card)`
  border-radius: 9.35294px;
  border: 0.5px solid #cccccc;
  padding: 20px;
  box-shadow: none;
  background-color: ${(props) => props.theme.palette.background.paper};
  background-image: none !important;
  margin-bottom: 5px;
`);

const Item = m(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface PaymentProps {
  title: string;
  location: string;
  amount: string;
  time: string;
  type: "land" | "building";
}


const PaymentCard = (payment: PaymentType) => (
  <SCard>
    <Grid container justifyContent="space-between" alignItems="center">
      <Stack spacing={4} direction="row">
        <IconButton>
          <Home />
        </IconButton>
        <Stack spacing={0}>
          <Typography mb={0} variant="h6">
            {payment.orderId}
          </Typography>
          <Typography variant="caption">{payment.order.estateName}</Typography>
        </Stack>
      </Stack>
      <Stack spacing={0}>
        <Typography mb={0} variant="h6">
          {`NGN ${payment.amount}`}
        </Typography>
        <Typography variant="body2">{payment.paymentDate}</Typography>
      </Stack>
    </Grid>
  </SCard>
);

const payments: Array<PaymentProps> = [
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "building",
  },
  {
    title: "12000sqm",
    location: "sassasa,smsa",
    amount: "23,000,000",
    time: "1:30pm",
    type: "land",
  },
];
const Payments = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addCard, { isLoading, error }] = useAddCardMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [focus, setFocus] = React.useState('')
  const { refetch, data, isLoading: loading, error: cardError } = useGetCardsQuery('', {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })
  const { data: transactionData, isLoading: loadingTrans, error: tracError } = useGetTransactionsQuery({ pageNumber: 1, order: '', sortBy: '' }, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true
  })

  const [formState, setFormState] = React.useState<{ cardHolder: string, cvv: string, cardNumber: string, cardDate: string }>({
    cardHolder: '',
    cardNumber: '',
    cvv: '',
    cardDate: '',
  })

  console.log(data)

  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {

    const split = name.split('.')
    if (split.length > 1) {
      setFormState((prev) => ({
        ...prev, [split[0]]: {
          ...prev[split[0]],
          [split[1]]: value
        }
      }))
    } else {
      console.log(name, value);

      setFormState((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState);

    const cardType = creditCardType(formState.cardNumber.slice(0, 4))[0].niceType
    console.log(cardType);
    if (formRef.current.reportValidity()) {
      const formData: CardProps = {
        cardHolder: formState.cardHolder,
        cardNumber: formState.cardNumber,
        cvv: formState.cvv,
        expiry: {
          month: formState.cardDate.split('/')[0],
          year: formState.cardDate.split('/')[1]
        },
        cardType: cardType
      }

      console.log(formData);

      try {
        const { data } = await addCard(formData).unwrap()
        console.log(data)
          refetch()
        enqueueSnackbar('card added successfully', {
          variant: 'success'
        })
      } catch (err) {
        enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
          variant: 'warning'
        });
      }
    }
  }

  const AddCardModal = (
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
            position: "absolute",
            maxHeight: "calc(100vh - 210px)",
            overflowY: "auto",
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
            title="Add new card"
          />
          <CardContent sx={{ px: { lg: "50px", md: "50px", sm: "30px", xs: "50px 10px" } }}>
            <Cards
              cvc={formState.cvv}
              expiry={formState.cardDate}
              name={formState.cardHolder}
              number={formState.cardNumber}
              focus={focus}
            />
            <form ref={formRef}>
              <Stack spacing={4} mt={6}>
                <TentTextField
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  required
                  name="cardNumber"
                  type="number"
                  placeholder="enter card number"
                  label="Card number"
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                />
                <Stack direction="row" spacing={2}>
                  <Grid item lg={6} sm={6} md={6} xs={6}>
                    <TentTextField
                      onChange={handleChange}
                      onFocus={handleInputFocus}
                      required
                      name="cardDate"
                      type="text"
                      placeholder="name"
                      label="Expiry date"
                      fullWidth

                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} sm={6} md={6} xs={6}>
                    <TentTextField
                      onChange={handleChange}
                      required
                      name="cvv"
                      type="text"
                      placeholder="CVV"
                      label="CVV"
                      fullWidth
                      onFocus={handleInputFocus}

                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                    />
                  </Grid>
                </Stack>
                <TentTextField
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  required
                  name="cardHolder"
                  type="text"
                  placeholder="Enter full name"
                  label="Card holder name"
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                />

              </Stack>
            </form>

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
            }} onClick={handleSubmit} fullWidth variant="contained" color="neutral" endIcon={<ArrowRightButton />}>
              Save & Continue
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px", width: "100%" }}>
        <Stack
          mb={1}
          direction={{ xs: "column", sm: "column", lg: "row", md: "row" }}
          justifyContent="space-between"
        >
          <Typography variant="h5">My Payments</Typography>
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
        <Divider variant="middle" />
        <Box sx={{ height: "100vh", overflow: "scroll" }}>
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 6, sm: 6, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Grid md={5} sm={12} xs={12} lg={5} item>
              <Box pt={3} p={2}>
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography mb={0} variant="body1">
                    My CARDS
                  </Typography>
                  <Button onClick={handleOpen} variant="text" startIcon={<Add />}>
                    Add
                  </Button>
                </Stack>
                <Box sx={{ marginTop: "50px", height: "100px" }}>
                  <Swiper
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    loop={true}
                  >
                    {loading ? <TentSpinner /> : cardError ? <ErrorData /> : data.data.cards.length < 1 ? <EmptyData /> : data.data.cards.map((card) =>
                      <SwiperSlide>
                        <Cards
                          cvc={card.cvv}
                          expiry={`${card.expiry.month}/${card.expiry.year}`}
                          name={card.cardNumber}
                          number={card.cardNumber}
                        />
                      </SwiperSlide>
                    )}

                    {/* <SwiperSlide>
                      <div style={{ width: "100%" }}>
                        <img
                          src="/images/cards/image.png"
                          alt=""
                          width="100%"
                        />
                      </div>
                    </SwiperSlide> */}
                  </Swiper>
                </Box>
              </Box>
            </Grid>
            <Grid md={7} sm={12} xs={12} lg={7} item>
              <Box mt={3} p={2} pt={0}>
                <Typography mb={6} variant="body1">
                  TRANSACTION HISTORY
                </Typography>
                {loadingTrans ? <TentSpinner /> : tracError ? <ErrorData /> : transactionData.data.paymentCount < 1 ? <EmptyData /> : transactionData.data.payments.map((payment) => PaymentCard(payment))}
              </Box>
            </Grid>
          </Stack>
        </Box>

        {/* <Stack
          direction={{sm:"column", md:"row", lg:"column", xs:"column"}}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Grid md={5} sm={12} xs={12} lg={5} item>
            <Box pt={3} p={2}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Typography mb={0} variant="body1">
                  TRANSACTION HISTORY
                </Typography>
                <Button variant="text" startIcon={<Add />}>
                  Add
                </Button>
              </Stack>
              <Box sx={{ marginTop: "50px",height: "100px"}}>
                <Swiper
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  
                >
                  <SwiperSlide>
                    <div style={{ width: "100%" }}>
                      <img
                        src="/images/cards/image (3).png"
                        alt=""
                        width="100%"
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div style={{ width: "100%" }}>
                      <img src="/images/cards/image.png" alt="" width="100%" />
                    </div>
                  </SwiperSlide>
                </Swiper>
              </Box>
            </Box>
          </Grid>
          <Grid  md={7} sm={12} xs={12} lg={7} item>
            <Box mt={3} p={2} pt={0}>
              <Typography mb={6} variant="body1">
                TRANSACTION HISTORY
              </Typography>
              {payments.map((payment) => PaymentCard(payment))}
            </Box>
          </Grid>
        </Stack> */}
      </Box>
      {AddCardModal}
    </AppLayout>
  );
};

export default Payments;
