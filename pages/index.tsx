import { AppLayout } from "../layout";
import styled from "styled-components";
import { ArrowRightButton, IconButton, IPhone, TentCard, TentTextField } from "../components";
import { Backdrop, Button, Card, CardActions, CardContent, CardHeader, Fade, Grid, InputAdornment, MenuItem, Modal, Stack, TextField, Typography } from "@mui/material";
import { withTheme } from "@mui/styles";
import ArrowRight from "remixicon-react/ArrowRightLineIcon";
import HomeIcon from "remixicon-react/Home5LineIcon";
import Pin from "remixicon-react/MapPinLineIcon";
import SizeIcon from "remixicon-react/ShapeLineIcon";
import { Box, Theme } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

const Bg = styled.div`
  width: 100%;
  height: 400px;
  background: url("/images/hero2.png") center center/cover no-repeat;
  @media (max-width: 900px) {
    height: 200px;
  }
`;

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
  } ;
`;

const SSwiperSlide = styled(SwiperSlide)`
  width: 30%;
`;



export default function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            title="Get estimate"
          />
          <CardContent sx={{ px:{lg:"50px", md:"50px",sm:"30px",xs:"50px 10px"}  }}>
            <Stack spacing={4}>
              <TextField
                name="card"
                type="select"
                select
                placeholder="enter card number"
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
                <MenuItem>One</MenuItem>
                      <MenuItem>Two</MenuItem>
              </TextField>
              <Stack direction="row" spacing={2}>
                <Grid item lg={6} sm={6} md={6} xs={6}>
                  <TextField
                    name="date"
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
                            <SizeIcon/>
                          </InputAdornment>
                        ),
                      }}
                  />
                </Grid>
                <Grid item lg={6} sm={6} md={6} xs={6}>
                  <TextField
                    name="date"
                    select
                    placeholder="CVV"
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
                    <MenuItem>One</MenuItem>
                      <MenuItem>Two</MenuItem>
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
            <Button  sx={{
              padding:"15px 30px"
            }} fullWidth variant="contained" color="neutral">
              Submit
            </Button>
          </CardActions>
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
              padding:"15px 30px"
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
                  style={{height:"100%"}}
                  sx={{
                    marginRight: "5px",
                    width: { lg: "400px", md: "200px", sm: "100%" },
                    border: "none",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    height:"100%",
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
              slidesPerView: 3,
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
          <SwiperSlide>
            <div style={{ width: "100%" }}>
              <img src="/images/cards/image (1).png" alt="" width="100%" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ width: "100%" }}>
              <img src="/images/cards/image.png" alt="" width="100%" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ width: "100%" }}>
              <img src="/images/cards/image (1).png" alt="" width="100%" />
            </div>
          </SwiperSlide>
        </Swiper>
      </Box>
      {GetEstimateModal}
    </AppLayout>
  );
}