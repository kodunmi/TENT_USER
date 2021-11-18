import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../layout'
import Link from 'next/link'
// import ReactPinField from "react-pin-field"
import styled from 'styled-components'
import { useResendVerificationMailMutation, useVerifyMailMutation } from '../services'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { LoadingButton } from '@mui/lab'
import { setCredentials } from '../redux'
import { AuthUserDataType } from '../lib'
import { useAppDispatch } from '../hooks'
import PinInput from 'react-pin-input';

// const ReactPinField = React.lazy(() => import("react-pin-field"));


const Input = styled(PinInput)`
    border: 1px solid rgb(204, 204, 204);
    background: #FAFAFA;
  border-radius: 0.3rem;
  font-size: 2rem;
  margin: 0.25rem;
  height: 3rem;
  outline: none;
  text-align: center;
  transition-duration: 250ms;
  transition-property: background, color, border, box-shadow, transform;
  width: 16.666666%;

  .pincode-input-text:focus {
  border-color:  #EACA1F;
  outline: none;
  transform: scale(1.05);

  .pincode-input-text:invalid {
  animation: shake 3 linear 75ms;
  border-color: rgb(220, 53, 69);
  box-shadow: 0 0 0.25rem rgba(220, 53, 69, 0.5);

  @keyframes shake {
  from {
    transform: scale(1.05) translateY(-5%);
  }
  to {
    transform: scale(1.05) translateY(5%);
  }
}
}
}
`

const VerifyEmail = () => {

    const [pinComplete, setPinComplete] = useState(false)
    const [pin, setPin] = useState('')
    const [verify, { isLoading }] = useVerifyMailMutation()
    const [resendMail, { isLoading: sendinMail }] = useResendVerificationMailMutation()
    const router = useRouter()
    const { email } = router.query
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch()
    const { push } = router
    useEffect(() => {
        if (pin.length < 6) {
            setPinComplete(val => false)
        }

        console.log(pin,email);

    }, [pin])

    const verifyEmail = async () => {

        try {
            const res = await verify({ email, otp: pin }).unwrap()
            console.log(res);

            dispatch(setCredentials(res.data as AuthUserDataType))
            enqueueSnackbar(res.message ? res.message : "We could not process your request", {
                variant: 'success'
            });
            push('/profile')

        } catch (err) {
            console.log(err);
            enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
                variant: 'warning'
            });
        }
    }

    const resendMailFunc = async () => {
        try {
            const res = await resendMail({ email: email }).unwrap()
            console.log(res)
            enqueueSnackbar(res.data ? res.data : "We could not process your request", {
                variant: 'success'
            });

        } catch (err) {
            console.log(err);
            enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
                variant: 'warning'
            });
        }
    }
    return (
        <AuthLayout>
            <Box style={{ position: "relative" }}>
                <img src="/images/shapes/Ellipse 2 (2).png" height="200px" width="100%" alt="" />
                <img style={{ position: "absolute", zIndex: 2, right: "10%", top: "5%" }} src="/images/logo.png" height="20%" alt="" />
                <Box px={3} pb={2}>
                    <Typography variant="h5">
                        <b>Verification</b>
                    </Typography>
                    <Typography component="div" mb={6} variant="caption">
                        Please enter the verification code we sent to your email: tactical@tentgroup.com
                    </Typography>

                    {/* <Input
                        type="password"
                        length={6}
                        validate={/^[0-9]$/}
                        onComplete={() => setPinComplete(true)}
                        onChange={(e) => setPin(e)}
                    /> */}

                    <PinInput
                        length={6}
                        initialValue=""
                        type="numeric"
                        inputMode="number"
                        style={{ padding: '10px' }}
                        inputStyle={{ borderColor: '#EACA1F' }}
                        inputFocusStyle={{ borderColor: 'blue' }}
                        onComplete={() => setPinComplete(true)}
                        onChange={(e) => setPin(e)}
                        autoSelect={true}
                       
                    />


                    <LoadingButton loading={isLoading} onClick={verifyEmail} sx={{ mt: "100px" }} disabled={!pinComplete} fullWidth size="large" color="neutral" variant="contained">
                        Verify
                    </LoadingButton>
                    <Typography align="center" component="div" mt={3} variant="caption">
                        I didn’t receive code, <Button variant="text" onClick={resendMailFunc}>Resend</Button>
                    </Typography>
                </Box>
            </Box>
        </AuthLayout>
    )
}

export default VerifyEmail
