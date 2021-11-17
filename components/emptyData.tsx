import { Typography } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin-top: 10%;
`

export const EmptyData = () => {
    return (
        <Container>
            <img src="/images/undraw_empty_re_opql.svg" alt="" height="50%" width="50%" />
            <Typography mt={8} variant="h4">
                No data found
            </Typography>
        </Container>
    )
}
