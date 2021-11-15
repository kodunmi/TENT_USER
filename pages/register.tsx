import { Button, InputAdornment, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { FormEvent } from 'react'
import { TentTextField } from '../components'
import { AuthLayout } from '../layout'
import User from 'remixicon-react/User2LineIcon'
import { useAppDispatch, useWindowDimensions } from '../hooks'
import Link from 'next/link'
import { RegisterRequest, useRegisterMutation } from '../services'
import { useSnackbar } from 'notistack'


const Register = () => {
    const { windowDimensions: { height, width } } = useWindowDimensions()
    const { enqueueSnackbar } = useSnackbar();
    const [formState, setFormState] = React.useState<RegisterRequest>({
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
    })

    const [repassword, setRepassword] = React.useState("")

    const [register, { isLoading }] = useRegisterMutation()

    const dispatch = useAppDispatch()

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        setFormState((prev) => ({ ...prev, [name]: value }))


    const handleRegister = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(formState.password.length < 6){
            enqueueSnackbar('password must be more than 6', {
                variant: 'warning'
              })

              return
        }

        if (formState.password !== repassword) {
            enqueueSnackbar('password does not match', {
                variant: 'warning'
              })

              return
        }

       

        try {
            const user = await register(formState).unwrap()
            
              console.log(user);
          
          } catch (err) {
           console.log(err);
           enqueueSnackbar(err.data ? err.data.message : "We could not process your request", {
            variant: 'warning'
        });
          }
    }
    return (
        <AuthLayout>
            <Box px={4} pt={12} pb={3}>
                <Typography variant="h5">
                    <b>Register</b>
                </Typography>
                <Typography component="div" mb={7} variant="caption">
                    Create your account
                </Typography>
                <form onSubmit={(e)=>handleRegister(e)}>
                    <Box sx={{ height: {lg:`${height - 575}px`,sm:"100%"}, overflow: "scroll", mb: "10px" }}>
                        <TentTextField
                            onChange={handleChange}
                            required
                            sx={{
                                border: "none",
                                backgroundColor: "action.hover",
                                borderRadius: "5px",
                                mb: "20px",
                            }}
                            name="fullName"
                            type="text"
                            placeholder="enter full name"
                            label="Full Name"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User />
                                    </InputAdornment>
                                ),
                            }}
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
                            name="phoneNumber"
                            type="text"
                            placeholder="enter phone number"
                            label="Phone Number"
                            fullWidth
                            inputProps={{
                                pattern:"[0-9]{11}",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User />
                                    </InputAdornment>
                                ),
                            }}
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
                            name="email"
                            type="email"
                            placeholder="enter email"
                            label="Email"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User />
                                    </InputAdornment>
                                ),
                            }}
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
                            name="password"
                            type="password"
                            placeholder="enter email"
                            label="Password"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TentTextField
                            onChange={(e)=>setRepassword(e.target.value)}
                            required
                            sx={{
                                border: "none",
                                backgroundColor: "action.hover",
                                borderRadius: "5px",
                                mb: "20px",
                            }}
                            name="repassword"
                            type="password"
                            placeholder="Repeat password"
                            label="Confirm password"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <User />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Button type="submit" fullWidth size="large" color="neutral" variant="contained">
                        Register
                    </Button>
                </form>

                <Typography align="center" component="div" mt={3} variant="caption">
                    Already have an account, <Link href="/login">Login</Link>
                </Typography>
            </Box>

        </AuthLayout>
    )
}

export default Register
