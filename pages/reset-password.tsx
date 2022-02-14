import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FormEvent, MouseEvent } from 'react'
import { AuthLayout } from '../layout'
import Link from 'next/link'
import { TentTextField } from '../components'
import { useSnackbar } from 'notistack'
import { useResetPasswordMutation } from '../services'
import { useAppDispatch } from '../hooks'
import PinInput from 'react-pin-input'
import router from 'next/router'
import { LoadingButton } from '@mui/lab'

const ForgetPassword = () => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const email = router.query.email
    const { enqueueSnackbar } = useSnackbar();
    const [formState, setFormState] = React.useState<{email: string, otp: number | undefined, newPassword:string, repeatPassword:string}>({
        email: email as string ? email as string : '',  
        otp: undefined ,
        newPassword: '',
        repeatPassword: '',
    })
    const [resetPassword, { isLoading }] = useResetPasswordMutation()
    

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))


    const handleRequestPasswordResetEmail = async (e:React.FormEvent) =>{
        e.preventDefault()
        try {
            
                if(formState.newPassword !== formState.repeatPassword){
                    enqueueSnackbar("password must match", {
                        variant: 'warning'
                    });

                    return
                }
                const res = await resetPassword(formState).unwrap()


                router.push('login')

                enqueueSnackbar(res.data, {
                    variant: "success"
                })
            
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
                <form onSubmit={handleRequestPasswordResetEmail}>
                <Box px={3} pb={2}>
                    <Typography variant="h5">
                        <b>Reset your password</b>
                    </Typography>
                    
                      <TentTextField
                        onChange={handleChange}
                        required
                        sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                            mb: "20px",
                        }}
                        name="newPassword"
                        type="text"
                        placeholder="enter new password"
                        label="Enter new password"
                        fullWidth
                    />         
                      <TentTextField
                        onChange={handleChange}
                        required
                        sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                            mb: "20px",
                        }}
                        name="repeatPassword"
                        type="text"
                        placeholder="repeat password"
                        label="Repeat password"
                        fullWidth
                    />              
                      {/* <TentTextField
                        onChange={handleChange}
                        required
                        sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                            mb: "20px",
                        }}
                        name="repeatPassword"
                        type="email"
                        placeholder="Enter OTP sent to your mail or phone number"
                        label="Enter OTP sent to your mail or phone number"
                        fullWidth
                    />   */}

                    <Typography color="text.secondary"  align="left" component="div" mb={1} variant="body2">
                        Enter OTO sent to your email or phone
                    </Typography>

                    <PinInput
                        length={6}
                        initialValue=""
                        type="numeric"
                        inputMode="number"
                        inputStyle={{ borderColor: '#EACA1F', width: '15%', borderRadius: '5px', fontSize: '30px' }}
                        inputFocusStyle={{ borderColor: 'blue' }}
                        onChange={(e) => setFormState({ ...formState, otp: Number(e) })}
                        autoSelect={true}   
                    />
                    
                    
                    <Link href="login">
                    <Typography  align="right" component="div" mt={2} mb={6} variant="caption">
                        Login
                    </Typography>
                    </Link>
                    
                    <LoadingButton loading={isLoading} type='submit' fullWidth size="large" color="neutral" variant="contained">
                        Reset Password
                    </LoadingButton>
                    <Typography align="center" component="div" mt={3} variant="caption">
                        I don’t have account, <Link href="/register">Register</Link>
                    </Typography>
                    
                </Box>
                </form>
            </Box>
        </AuthLayout>
    )
}

export default ForgetPassword
