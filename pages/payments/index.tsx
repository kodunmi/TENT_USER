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
} from "@mui/material";
import { Box, display } from "@mui/system";
import React from "react";
import { ArrowRightButton, IconButton, TentTextField } from "../../components";
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

const PaymentCard = (payment: PaymentProps) => (
  <SCard>
    <Grid container justifyContent="space-between" alignItems="center">
      <Stack spacing={4} direction="row">
        <IconButton>
          {payment.type === "land" && <Pin />}
          {payment.type === "building" && <Home />}
        </IconButton>
        <Stack spacing={0}>
          <Typography mb={0} variant="h6">
            {payment.title}
          </Typography>
          <Typography variant="caption">{payment.location}</Typography>
        </Stack>
      </Stack>
      <Stack spacing={0}>
        <Typography mb={0} variant="h6">
          {`NGN ${payment.amount}`}
        </Typography>
        <Typography variant="body2">{payment.time}</Typography>
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width:{lg:"500px",xs:"90%",sm:"70%",md:"500px"} ,
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
          <CardContent sx={{ px:{lg:"50px", md:"50px",sm:"30px",xs:"50px 10px"}  }}>
            <Stack spacing={4}>
              <TentTextField
                name="card"
                type="text"
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
                    name="date"
                    type="date"
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
                    name="date"
                    type="password"
                    placeholder="CVV"
                    label="CVV"
                    fullWidth
                    sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                  />
                </Grid>
              </Stack>
              <TentTextField
                name="card"
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
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 50px",
            }}
          >
            <Button  sx={{
              padding:"15px 30px"
            }} fullWidth variant="contained" color="neutral" endIcon={<ArrowRightButton />}>
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
                        <img
                          src="/images/cards/image.png"
                          alt=""
                          width="100%"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </Box>
              </Box>
            </Grid>
            <Grid md={7} sm={12} xs={12} lg={7} item>
              <Box mt={3} p={2} pt={0}>
                <Typography mb={6} variant="body1">
                  TRANSACTION HISTORY
                </Typography>
                {payments.map((payment) => PaymentCard(payment))}
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
