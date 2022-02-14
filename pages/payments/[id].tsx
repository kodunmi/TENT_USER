import {
    Button, Card, CardContent, CardHeader, Grid, IconButton, Typography, CircularProgressProps,
    CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect } from 'react'
import styled from "styled-components";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { useGetMyOrderByIdQuery, useLazyGetMyOrderByIdQuery, useLazyGetTransactionByIdQuery, useVerifyTransactionQuery } from '../../services';
import router from 'next/router';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { WithAuth } from '../../HOC';
import { ParsedUrlQuery } from 'querystring';

const BorderText = styled.div`
  border-left: 2px solid ${(props) => props.color};
  font-size: 12px;
  padding-left: 5px;
`;

const InstallmentPaymentCard = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 20px 40px;
  border-radius: 9.35294px;
  border: 0.5px solid #cccccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  &:not(:last-child){
    margin-right: 10px;
  }
`

const SinglePage = ({params}:{params: ParsedUrlQuery}) => {


    const [trigger, result, lastPromiseInfo] = useLazyGetMyOrderByIdQuery({
        refetchOnReconnect: true,
        pollingInterval: 5
    })

    const [getTran, transaction] = useLazyGetTransactionByIdQuery({
        refetchOnReconnect: true,
        pollingInterval: 5
    })

    

   useEffect(() => {
        trigger(params.id as string)
   }, [params, trigger])
   
   useEffect(() => {
        if(result.data){
            console.log(result.data);
            
           getTran(params.transactionId as string)
        }
    }, [result,params])


    useEffect(() => {
        if(transaction.data){
           console.log(transaction.data)
           
        }
    }, [transaction])
    
            
    

    function CircularProgressWithLabel(
        props: CircularProgressProps & { value: number },
    ) {

        const percentage = (props.value / 30) * 100;


        return (
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={100} value={percentage} variant="determinate" />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h6"
                        component="div"
                        color="text.secondary"
                    >{`${props.value} Days`}</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Card
            sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                bgcolor: "background.shadow",
                boxShadow: 24,
                borderRadius: "0px",
                height: "100%",
                overflowY: "scroll",
            }}
        >
            {
                result.isError ? <p>error</p> : result.isLoading ? (
                    <div>Loading</div>
                ) : result.data ? (
                    // <div>{result.data.data._id}</div>
                        <CardContent sx={{ px: "20px", textAlign: 'center', overflowY: 'auto' }}>
                        <Typography variant="h6">On going installments</Typography>
                        <Typography variant="caption">
                            Here is the list of your ongoing installments
                        </Typography>

                        <Box>
                            <Typography mb={5} mt={5} variant="h4">
                                Next payment due day
                            </Typography>
                            <Typography variant="h6">
                                {
                                    result.data.data.instalmentPayment.nextPaymentDueDate ? moment(result.data.data.instalmentPayment.nextPaymentDueDate).format("DD/MM/YYYY") : "You can proceed to the next payment"
                                }
                            </Typography>
                        </Box>
                        <div style={{ display: "flex", marginTop: "50px", flexWrap: 'wrap', justifyContent: 'center' }}>
                            <div style={{ marginRight: "50px" }}>
                                <BorderText color="green">
                                    Total Estimated Price
                                </BorderText>
                                <Typography variant="h3" color="#535353">
                                    {`${Math.round(result.data.data.totalEstimatedPrice)}`}
                                </Typography>
                            </div>
                            <div>
                                <BorderText color="red">
                                    Total Paid Amount
                                </BorderText>
                                <Typography variant="h3" color="#535353">
                                    {transaction.data ? `${Math.round(transaction.data.data.amount)}` : "0"}
                                </Typography>
                            </div>
                        </div>
                        <Grid container mt={6} spacing={3} >
                            <Grid alignSelf='stretch' item lg={4} md={4} sm={6} xs={12}>
                                <InstallmentPaymentCard>
                                    <div>
                                        <Typography variant="h1">
                                            1
                                        </Typography>
                                        <Typography>
                                            First Installment
                                        </Typography>
                                        {
                                            result.data.data.instalmentPayment.numOfPaymentMade === 0 ? (
                                                <Button fullWidth sx={{ borderRadius: '20px', marginTop: '20px' }} color="neutral" variant="contained">
                                                    Pay Now
                                                </Button>
                                            ) : result.data.data.instalmentPayment.firstPayment.paid === true ? (


                                                <Box>
                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {`NGN ${result.data.data.instalmentPayment.firstPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {moment(result.data.data.instalmentPayment.firstPayment.datePaid).format('Do MMM YYYY')}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Date paid
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container justifyContent='space-between'>
                                                        <Grid mt={3} item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                {result.data.data.instalmentPayment.firstPayment.invoiceRef}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                            ) : (

                                                <Box>

                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {` ${result.data.data.instalmentPayment.firstPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {result.data.data.nextPaymentDaysLeft}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Days left
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid mt={3} container justifyContent='space-between'>
                                                        <Grid  item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                None for now
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>


                                                </Box>
                                            )
                                        }
                                    </div>
                                </InstallmentPaymentCard>
                            </Grid>
                            <Grid alignSelf='stretch' item lg={4} md={4} sm={6} xs={12}>
                                <InstallmentPaymentCard>
                                    <div>
                                        <Typography variant="h1">
                                            2
                                        </Typography>
                                        <Typography>
                                            Second Installment
                                        </Typography>
                                        {
                                            result.data.data.instalmentPayment.numOfPaymentMade === 1 ? (
                                                <Button fullWidth sx={{ borderRadius: '20px', marginTop: '20px' }} color="neutral" variant="contained">
                                                    Pay Now
                                                </Button>
                                            ) : result.data.data.instalmentPayment.secondPayment.paid === true ? (


                                                <Box>
                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {`${result.data.data.instalmentPayment.secondPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {moment(result.data.data.instalmentPayment.secondPayment.datePaid).format('Do MMM YYYY')}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Date paid
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid mt={3} container justifyContent='space-between'>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                {result.data.data.instalmentPayment.secondPayment.invoiceRef}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                            ) : (

                                                <Box>

                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {`${result.data.data.instalmentPayment.secondPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {result.data.data.nextPaymentDaysLeft}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Days left
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid mt={3} container justifyContent='space-between'>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                None for now
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>


                                                </Box>
                                            )
                                        }
                                    </div>
                                </InstallmentPaymentCard>
                            </Grid>
                            <Grid alignSelf='stretch' item lg={4} md={4} sm={12} xs={12}>
                                <InstallmentPaymentCard>
                                    <div>
                                        <Typography variant="h1">
                                            3
                                        </Typography>
                                        <Typography>
                                            Third Installment
                                        </Typography>
                                        {
                                            result.data.data.instalmentPayment.numOfPaymentMade === 3 ? (
                                                <Button fullWidth sx={{ borderRadius: '20px', marginTop: '20px' }} color="neutral" variant="contained">
                                                    Pay Now
                                                </Button>
                                            ) : result.data.data.instalmentPayment.thirdPayment.paid === true ? (


                                                <Box>
                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {`${result.data.data.instalmentPayment.thirdPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {moment(result.data.data.instalmentPayment.thirdPayment.datePaid).format('Do MMM YYYY')}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Date paid
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid mt={3} container justifyContent='space-between'>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                {result.data.data.instalmentPayment.thirdPayment.invoiceRef}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                            ) : (

                                                <Box>

                                                    <Grid mt={4} container justifyContent='space-between'>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {`${result.data.data.instalmentPayment.thirdPayment.amount}`}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                amount
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>

                                                            <Typography variant="h5">
                                                                {result.data.data.nextPaymentDaysLeft}
                                                            </Typography>
                                                            <Typography color='gray' variant="caption">
                                                                Days left
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container justifyContent='space-between'>
                                                        <Grid mt={3} item>
                                                            <Typography variant="body1">
                                                                Ref No:
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Typography variant="body1">
                                                                None for now
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>


                                                </Box>
                                            )
                                        }
                                    </div>
                                </InstallmentPaymentCard>
                            </Grid>
                           

                        </Grid>
                    </CardContent>
                ) : <p>No data</p>
            }


        </Card>
    )
}

export default WithAuth(SinglePage)

export const getServerSideProps = (context:GetServerSidePropsContext) => {
    return {
      props: {params: context.query}
    };
  }