import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FormEvent, MouseEvent } from 'react'
import { AuthLayout } from '../layout'
import Link from 'next/link'
import { TentTextField } from '../components'
import { useSnackbar } from 'notistack'
import { useRequestPasswordResetMutation } from '../services'
import { useAppDispatch } from '../hooks'
import router from 'next/router'
import { LoadingButton } from '@mui/lab'

const ForgetPassword = () => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const { enqueueSnackbar } = useSnackbar();
    const [formState, setFormState] = React.useState<{email:string}>({
        email: '',  
    })
    const [resetPassword, { isLoading }] = useRequestPasswordResetMutation()
    const dispatch = useAppDispatch()

    const handleRequestPasswordResetEmail = async (e:React.FormEvent) =>{
        e.preventDefault()
        try {
            
                const res = await resetPassword({email: formState.email}).unwrap()

                enqueueSnackbar(res.data, {
                    variant: "success"
                })

                router.push('reset-password?email='+formState.email)
            
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
                        <b>Forget Password</b>
                    </Typography>
                    <Typography component="div" mb={6} variant="caption">
                        Enter email address
                    </Typography>
                    
                      <TentTextField
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormState({email: e.currentTarget.value})}
                        required
                        sx={{
                            border: "none",
                            backgroundColor: "action.hover",
                            borderRadius: "5px",
                            mb: "20px",
                        }}
                        name="email"
                        type="email"
                        placeholder="enter email"
                        label="Email"
                        fullWidth
                    />  
                    
                    
                    <Link href="login">
                    <Typography  align="right" component="div" mb={6} variant="caption">
                        Login
                    </Typography>
                    </Link>
                    
                    <LoadingButton loading={isLoading} type='submit' fullWidth size="large" color="neutral" variant="contained">
                        Forget Password
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
