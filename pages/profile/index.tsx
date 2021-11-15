import {
  Avatar,
  Button,
  Stack,
  Typography,
  Grid,
  MenuItem,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TentTextField } from "../../components";
import { useAuth } from "../../hooks";
import { AppLayout } from "../../layout";
import { UserDataType } from "../../lib";

const Profile = () => {
 const {user} = useAuth()

 const handleChange = ({
  target: { name, value },
}: React.ChangeEvent<HTMLInputElement>) =>
  setFormState((prev) => ({ ...prev, [name]: value }))

  const [formState, setFormState] = React.useState<UserDataType>(user)

  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px" }}>
          <Stack mb={1} direction="row" justifyContent="space-between">
          <Typography variant="h5">My Profile</Typography>
          <Button variant="outlined" color="primary">Save and Continue</Button>
          </Stack>
          <Divider variant="middle" />
        <Stack
          alignItems={{ lg: "center", xs: "left", md: "center", sm: "center" }}
          direction={{ lg: "row", xs: "column", md: "row", sm: "row" }}
          justifyContent="space-between"
          mt={3}
        >
          <Stack alignItems="center" direction="row" spacing={3}>
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: "#F3B100",
                color: "#FFE3AD",
              }}
            />
            <Stack>
              <Typography variant="h4">{user.fullName}</Typography>
              <Typography variant="body1">{user.tentUserId}</Typography>
            </Stack>
          </Stack>
          <Button
            sx={{
              width: "102.97px",
              boxShadow: "none",
              borderRadius: "6px",
              fontSize: "13px",
              padding: "5px 10px",
              backgroundColor: "#EACA1F",
            }}
            variant="contained"
            size="small"
          >
           {user.accountVerified ? "VERIFIED" : "UNVERIFIED"}
          </Button>
        </Stack>
        <Box sx={{ height:{lg: "calc(100vh - 400px)", xs: "calc(100vh - 300px)", md:"calc(100vh - 400px)", sm:"calc(100vh - 300px)"}, overflow: "scroll" }}>
          <Stack mt="42px">
          <Grid container spacing={3}>
            <Grid lg={4} md={12} sm={12} xs={12} item>
              <Stack spacing={2}>
                <TentTextField
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  value={formState.fullName}
                  name="fullName"
                  type="text"
                  placeholder="name"
                  label="Your Name"
                />
                <TentTextField
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  value={formState.email}
                  name="email"
                  type="email"
                  placeholder="email"
                  label="Email"
                />
                <TentTextField
                  onChange={handleChange}
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  value={formState.phoneNumber}
                  name="phoneNumber"
                  type="text"
                  placeholder="phone"
                  label="Phone"
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Grid item lg={6} sm={6} md={6} xs={6}>
                    <TentTextField
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="dateOfBirth"
                      value={formState.dateOfBirth}
                      type="date"
                      placeholder="name"
                      label="Date of Birth"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6} sm={6} md={6} xs={6}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      select
                      value={formState.gender}
                      name="gender"
                      type="select"
                      placeholder="Select gender"
                      label="Gender"
                      fullWidth
                    >
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="male">Male</MenuItem>
                    </TentTextField>{" "}
                  </Grid>
                </Stack>
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="password"
                  type="password"
                  placeholder="password"
                  label="Password"
                  fullWidth
                />
              </Stack>
            </Grid>
            <Grid lg={4} md={12} sm={12} xs={12} item>
              <Stack spacing={2}>
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="address"
                  type="text"
                  placeholder="Insert Address"
                  label="Residential Address"
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Grid item lg={7} sm={7} md={7} xs={7}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="city"
                      type="text"
                      placeholder="Select City"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={5} sm={5} md={5} xs={5}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="zip"
                      type="text"
                      placeholder="Zip code"
                      fullWidth
                    />
                  </Grid>
                </Stack>
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  select
                  name="state"
                  type="select"
                  placeholder="Select state"
                  label="State of Origin"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Select state</em>
                  </MenuItem>
                  <MenuItem>Abuja</MenuItem>
                  <MenuItem>Lagos</MenuItem>
                </TentTextField>{" "}
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  select
                  name="marritalStatus"
                  type="select"
                  label="Marital Status"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Select status</em>
                  </MenuItem>
                  <MenuItem>Married</MenuItem>
                  <MenuItem>Single</MenuItem>
                </TentTextField>{" "}
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  select
                  name="occupation"
                  type="select"
                  label="Occupation"
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Select Occupation</em>
                  </MenuItem>
                  <MenuItem>Occupation One</MenuItem>
                  <MenuItem>Occupation Two</MenuItem>
                </TentTextField>{" "}
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="officeAddress"
                  type="text"
                  placeholder="Insert Address"
                  label="Office Address"
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Grid item lg={7} sm={7} md={7} xs={7}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="city"
                      type="text"
                      placeholder="Select City"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={5} sm={5} md={5} xs={5}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="zip"
                      type="text"
                      placeholder="Zip code"
                      fullWidth
                    />
                  </Grid>
                </Stack>
              </Stack>
            </Grid>
            <Grid lg={4} md={12} sm={12} xs={12} item>
              <Stack spacing={2}>
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="NOKName"
                  type="text"
                  placeholder="Next of Kin"
                  label="Name of Next of Kin"
                />
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="NOKAddress"
                  type="text"
                  placeholder="Insert Address"
                  label="Next of Kin Address"
                  fullWidth
                />
                <Stack direction="row" spacing={2}>
                  <Grid item lg={7} sm={7} md={7} xs={7}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="city"
                      type="text"
                      placeholder="Select City"
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={5} sm={5} md={5} xs={5}>
                    <TentTextField
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="zip"
                      type="text"
                      placeholder="Zip code"
                      fullWidth
                    />
                  </Grid>
                </Stack>
                <TentTextField
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  name="NOKPhone"
                  type="text"
                  placeholder="Phone"
                  label="Next of Kin Phone"
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        </Box>
        
      </Box>
    </AppLayout>
  );
};

export default Profile;
