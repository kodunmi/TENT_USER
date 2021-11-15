import {
  Avatar,
  Button,
  Stack,
  Typography,
  Grid,
  MenuItem,
  Divider,
  Backdrop,
  Modal,
  Fade,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { TentTextField, uploadFile } from "../../components";
import { useAppDispatch, useAuth } from "../../hooks";
import { AppLayout } from "../../layout";
import { BaseResponse, statesOfNigeria, UserDataType } from "../../lib";
import { BuildProjectRequest, useBuildProfileMutation, useEditProfileMutation, useRequestPhoneVerificationMutation } from '../../services'
import { styled } from '@mui/material/styles';
import { setCredentials, setProfile, setProfilePicture } from "../../redux";
import { LoadingButton } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactPhoneInput from 'react-phone-input-mui';

const Profile = () => {
  const { user } = useAuth()
  const handleOpen = () => setOpen(true);
  const [phone, setPhone] = useState(user.phoneNumber)
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [buildProfile, { isLoading }] = useBuildProfileMutation()
  const [editProfile, { isLoading: isEditing }] = useEditProfileMutation()
  const [sendVerifyPhoneMailMutation, { isLoading: sendingMail }] = useRequestPhoneVerificationMutation()
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState<string | undefined>()
  const { enqueueSnackbar } = useSnackbar();
  const [uploadingImage, setUploadingImage] = useState(false)
  const dispatch = useAppDispatch()
  const handleChange2 = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }))

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
      setFormState((prev) => ({ ...prev, [name]: value }))
    }
  }



  const [formState, setFormState] = React.useState<UserDataType>(user)


  const Input = styled('input')({
    display: 'none',
  });

  // useEffect(() => {
  //   setPreview(user.profileImage)
  // }, [user.profileImage])


  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])


  const onSelectFile = e => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
    setUploadingImage(true)

    uploadFile([{
      file: e.target.files[0],
      name: "mmcsmsfs"
    }]).then((data: BaseResponse<Array<{ fileSize: number, mimeType: string, name: string, fileFormat: string, publicId: string, url: string }>>) => {


      dispatch(setProfilePicture({ url: data.data[0].url }))

      enqueueSnackbar("image upload completed", {
        variant: 'success'
      });



      return data.data[0].url

    }).then((data: string) => {

      editProfile({ profileImage: data }).unwrap()

      enqueueSnackbar("profile updated successfully", {
        variant: 'success'
      });

    }).catch(err => enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
      variant: 'warning'
    })).finally(() => {
      setUploadingImage(false)
    })

  }

  const updatePhoneAndSendMessage = async () => {
    try {
      const res = await editProfile({ phoneNumber: phone }).unwrap()
      dispatch(setProfile(res.data))

      sendVerifyPhoneMail()

    } catch (err) {
      enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
        variant: 'warning'
      });
    }
  }

  const sendVerifyPhoneMail = async () => {
    try {
      console.log(phone);
      const response = await sendVerifyPhoneMailMutation(phone).unwrap()


    } catch (err) {
      enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
        variant: 'warning'
      });
    }
  }


  const openVerifyPhoneMailModal = () => {
    if (user.phoneNumber !== phone) {
      // alert("Are you sure you want to change")
      setOpen(false)
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to change',
        buttons: [
          {
            label: 'Yes',
            onClick: () => updatePhoneAndSendMessage()
          },
          {
            label: 'No',
            onClick: () => sendVerifyPhoneMail()
          }
        ]
      });

      return
    }

    sendVerifyPhoneMail()
  }

  const handleProfileUpdate = async (e) => {

    let res: BaseResponse<UserDataType>


    e.preventDefault()
    if (formRef.current.reportValidity()) {

      const buildProfileData = {
        gender: formState.gender,
        dateOfBirth: formState.dateOfBirth,
        profileImage: formState.profileImage,
        stateOfOrigin: formState.stateOfOrigin,
        maritalStatus: formState.maritalStatus,
        occupation: formState.occupation,
        nextOfKin: {
          name: formState.nextOfKin.name,
          relationship: formState.nextOfKin.relationship,
          phoneNumber: formState.nextOfKin.address,
          address: formState.nextOfKin.address,
          state: formState.nextOfKin.state,
          city: formState.nextOfKin.city,
        },
        residentialAddress: {
          address: formState.residentialAddress.address,
          city: formState.residentialAddress.city,
          state: formState.residentialAddress.state,
          zipCode: formState.residentialAddress.zipCode,
        },
        businessAddress: {
          address: formState.businessAddress.address,
          city: formState.businessAddress.city,
          state: formState.businessAddress.state,
          zipCode: formState.businessAddress.zipCode,
        }
      }

      const editProfileData: BuildProjectRequest = {

        gender: formState.gender,
        dateOfBirth: formState.dateOfBirth,
        profileImage: formState.profileImage,
        stateOfOrigin: formState.stateOfOrigin,
        maritalStatus: formState.maritalStatus,
        occupation: formState.occupation,
        fullName: formState.fullName,
        // email: formState.email,
        // phoneNumber: formState.phoneNumber,
        nextOfKin: {
          name: formState.nextOfKin.name,
          relationship: formState.nextOfKin.relationship,
          phoneNumber: formState.nextOfKin.address,
          address: formState.nextOfKin.address,
          state: formState.nextOfKin.state,
          city: formState.nextOfKin.city,
        },
        residentialAddress: {
          address: formState.residentialAddress.address,
          city: formState.residentialAddress.city,
          state: formState.residentialAddress.state,
          zipCode: formState.residentialAddress.zipCode,
        },
        businessAddress: {
          address: formState.businessAddress.address,
          city: formState.businessAddress.city,
          state: formState.businessAddress.state,
          zipCode: formState.businessAddress.zipCode,
        }
      }

      try {

        if (!user.profileVerified) {
          res = await buildProfile(buildProfileData).unwrap()
        } else {
          res = await editProfile(editProfileData).unwrap()
        }

        dispatch(setProfile(res.data))


      } catch (err) {
        enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
          variant: 'warning'
        });
      }
    }


    console.log(formState)
  }

  const PhoneVerificationModal = (
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
              padding: "20px 0px 20px 20px",
              textAlign: "center",
            }}
            title="Verify phone number"
          />
          {
            <form>
              <CardContent sx={{ px: { lg: "50px", md: "50px", sm: "30px", xs: "50px 10px" } }}>
                <p>Confirm your phone number</p>
                <TentTextField
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  sx={{
                    border: "none",
                    backgroundColor: "action.hover",
                    borderRadius: "5px",
                  }}
                  value={phone}
                  name="fullName"
                  type="text"
                  placeholder="name"

                />
                {/* <ReactPhoneInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} // passed function receives the phone value
                  component={TentTextField}
                /> */}
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
                  // loading={gettingEstimate}
                  sx={{
                    padding: "15px 30px"
                  }} fullWidth variant="contained" color="neutral" onClick={() => openVerifyPhoneMailModal()}>
                  Send Otp
                </LoadingButton>
              </CardActions>
            </form>
          }

        </Card>
      </Fade>
    </Modal>
  )


  return (
    <AppLayout>
      <Box sx={{ padding: "10px 15px 50px 15px" }}>
        <Stack mb={1} direction="row" justifyContent="space-between">
          <Typography variant="h5">My Profile</Typography>
          <LoadingButton loading={isLoading || isEditing} onClick={(e) => handleProfileUpdate(e)} variant="outlined" color="primary">Save and Continue</LoadingButton>
        </Stack>
        <Divider variant="middle" />
        <Stack
          alignItems={{ lg: "center", xs: "left", md: "center", sm: "center" }}
          direction={{ lg: "row", xs: "column", md: "row", sm: "row" }}
          justifyContent="space-between"
          mt={3}
        >
          <Stack alignItems="center" direction="row" spacing={3}>
            <Stack spacing={2}>
              {/* <Avatar
              sx={{
                width: "100px",
                height: "100px",
                backgroundColor: "#F3B100",
                color: "#FFE3AD",
              }}
            /> */}
              <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onSelectFile} />
                <Box sx={{ m: 1, position: 'relative' }}>
                  {uploadingImage && (
                    <Box
                      sx={{

                        position: 'absolute',
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                        zIndex: 1,
                      }}
                    >
                      <CircularProgress
                        size={110}
                        sx={{
                          color: "#EACA1F",

                        }}
                      />
                    </Box>
                  )}


                  <Avatar
                    src={preview ? preview : user.profileImage}
                    sx={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#F3B100",
                      color: "#FFE3AD",
                    }}
                  />
                </Box>


              </label>
            </Stack>

            <Stack>
              <Typography variant="h4">{user.fullName}</Typography>
              <Typography variant="body1">{user.tentUserId}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2}>
            <LoadingButton
              loading={sendingMail}
              disabled={user.phoneNumberVerified}
              onClick={() => setOpen(true)}
              sx={{

                boxShadow: "none",
                borderRadius: "6px",
                fontSize: "13px",
                padding: "5px 10px",
                background: "rgba(226,1,247,0.8449754901960784)",
              }}
              variant="contained"
              size="small"
            >
              {user.phoneNumberVerified ? "VERIFIED" : "VERIFY PHONE"}
            </LoadingButton>
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
              {user.profileVerified ? "VERIFIED" : "UNVERIFIED"}
            </Button>
          </Stack>

        </Stack>
        <Box sx={{ height: { lg: "calc(100vh - 400px)", xs: "calc(100vh - 300px)", md: "calc(100vh - 400px)", sm: "calc(100vh - 300px)" }, overflow: "scroll" }}>
          <Stack mt="42px">
            <form ref={formRef}>
              <Grid container spacing={3}>
                <Grid lg={4} md={12} sm={12} xs={12} item>
                  <Stack spacing={2}>
                    <TentTextField
                      required
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
                      required
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
                      required
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
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          name="dateOfBirth"
                          value={formState.dateOfBirth && moment(formState.dateOfBirth).format('YYYY-MM-DD')}
                          type="date"
                          placeholder="name"
                          label="Date of Birth"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} sm={6} md={6} xs={6}>
                        <TentTextField
                          required
                          onChange={handleChange}
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
                          <MenuItem >Select gender</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                        </TentTextField>{" "}
                      </Grid>
                    </Stack>
                    <TentTextField
                      required
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
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.residentialAddress && formState.residentialAddress.address}
                      name="residentialAddress.address"
                      type="text"
                      placeholder="Insert Address"
                      label="Residential Address"
                      fullWidth
                    />
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      select
                      value={formState.residentialAddress && formState.residentialAddress.state}
                      name="residentialAddress.state"
                      type="select"
                      placeholder="Select state"
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Select state</em>
                      </MenuItem>
                      {
                        statesOfNigeria.map(state => <MenuItem value={state}>{state}</MenuItem>)
                      }

                    </TentTextField>{" "}
                    <Stack direction="row" spacing={2}>
                      <Grid item lg={7} sm={7} md={7} xs={7}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          value={formState.residentialAddress && formState.residentialAddress.city}
                          name="residentialAddress.city"
                          type="text"
                          placeholder="Select City"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={5} sm={5} md={5} xs={5}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          value={formState.residentialAddress && formState.residentialAddress.zipCode}
                          name="residentialAddress.zipCode"
                          type="text"
                          placeholder="Zip code"
                          fullWidth
                        />
                      </Grid>
                    </Stack>
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      select
                      value={formState.stateOfOrigin}
                      name="stateOfOrigin"
                      type="select"
                      placeholder="Select state"
                      label="State of Origin"
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Select state</em>
                      </MenuItem>
                      {
                        statesOfNigeria.map(state => <MenuItem value={state}>{state}</MenuItem>)
                      }

                    </TentTextField>{" "}
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.maritalStatus}
                      select
                      name="maritalStatus"
                      type="select"
                      label="Marital Status"
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Select status</em>
                      </MenuItem>
                      <MenuItem value="married">Married</MenuItem>
                      <MenuItem value="single" >Single</MenuItem>
                    </TentTextField>{" "}
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.occupation}
                      name="occupation"
                      type="text"
                      label="Occupation"
                      fullWidth
                    />
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.businessAddress && formState.businessAddress.address}
                      name="businessAddress.address"
                      type="text"
                      placeholder="Insert Address"
                      label="Office Address"
                      fullWidth
                    />
                    <Stack direction="row" spacing={2}>
                      <Grid item lg={7} sm={7} md={7} xs={7}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          value={formState.businessAddress && formState.businessAddress.city}
                          name="businessAddress.city"
                          type="text"
                          placeholder="Select City"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={5} sm={5} md={5} xs={5}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          value={formState.businessAddress && formState.businessAddress.zipCode}
                          name="businessAddress.zipCode"
                          type="text"
                          placeholder="Zip code"
                          fullWidth
                        />
                      </Grid>

                    </Stack>
                    <Stack>
                      <TentTextField
                        required
                        onChange={handleChange}
                        sx={{
                          border: "none",
                          backgroundColor: "action.hover",
                          borderRadius: "5px",
                        }}
                        select
                        value={formState.businessAddress && formState.businessAddress.state}
                        name="businessAddress.state"
                        type="select"
                        placeholder="Select state"
                        fullWidth
                      >
                        <MenuItem value={undefined}>
                          <em>Select state</em>
                        </MenuItem>
                        {
                          statesOfNigeria.map(state => <MenuItem value={state}>{state}</MenuItem>)
                        }

                      </TentTextField>{" "}
                    </Stack>
                  </Stack>
                </Grid>
                <Grid lg={4} md={12} sm={12} xs={12} item>
                  <Stack spacing={2}>
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.nextOfKin && formState.nextOfKin.name}
                      name="nextOfKin.name"
                      type="text"
                      placeholder="Next of Kin"
                      label="Name of Next of Kin"
                    />
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      value={formState.nextOfKin && formState.nextOfKin.address}
                      name="nextOfKin.address"
                      type="text"
                      placeholder="Insert Address"
                      label="Next of Kin Address"
                      fullWidth
                    />
                    <Stack direction="row" spacing={2}>
                      <Grid item lg={7} sm={7} md={7} xs={7}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          value={formState.nextOfKin && formState.nextOfKin.city}
                          name="nextOfKin.city"
                          type="text"
                          placeholder="Select City"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={5} sm={5} md={5} xs={5}>
                        <TentTextField
                          required
                          onChange={handleChange}
                          sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                          }}
                          select
                          value={formState.nextOfKin && formState.nextOfKin.state}
                          name="nextOfKin.state"
                          type="select"
                          placeholder="Select state"
                          fullWidth
                        >
                          <MenuItem value={undefined}>
                            <em>Select state</em>
                          </MenuItem>
                          {
                            statesOfNigeria.map(state => <MenuItem value={state}>{state}</MenuItem>)
                          }

                        </TentTextField>{" "}
                      </Grid>
                    </Stack>
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="nextOfKin.phoneNumber"
                      value={formState.nextOfKin && formState.nextOfKin.phoneNumber}
                      type="text"
                      placeholder="Phone"
                      label="Next of Kin Phone"
                    />
                    <TentTextField
                      required
                      onChange={handleChange}
                      sx={{
                        border: "none",
                        backgroundColor: "action.hover",
                        borderRadius: "5px",
                      }}
                      name="nextOfKin.relationship"
                      value={formState.nextOfKin && formState.nextOfKin.relationship}
                      type="text"
                      placeholder="Relationship"
                      label="What's your relationship"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </form>

          </Stack>
        </Box>
      </Box>
      {PhoneVerificationModal}
    </AppLayout>
  );
};

export default Profile;
