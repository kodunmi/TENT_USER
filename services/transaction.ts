import { BaseResponse, OrderType, PaymentType } from './../lib/type';
import { emptySplitApi } from './base';

interface PaymentResponse{
    status: string
    message: string
    data: {
      link: string
    }
}

interface getMyTransactionsResponse {
    page: number
    pages: number
    paymentCount: number
    payments: Array<PaymentType>
}

interface VerifyTransactionResponse {
    order: OrderType
    payment: PaymentType
}

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        makePayment: builder.mutation<BaseResponse<PaymentResponse>, {orderId:string,redirectLink:string}>({
            query: (body) => ({
                url: "payment/pay",
                method: "POST",
                body: body,
            })
        }),

        verifyTransaction: builder.query<BaseResponse<VerifyTransactionResponse>, number>({
            query: (transactionId) => ({
                url: `payment/verify?transaction_id=${transactionId}`,
                method: "GET",
            })
        }),

        getTransactions: builder.query<BaseResponse<getMyTransactionsResponse>, { pageNumber?: number, sortBy?: string, order?: string }>({
            query: (body) => `payment/my-payments?pageNumber=${body.pageNumber}&order=${body.order}&sortBy=${body.sortBy}`
        }),

        getTransactionById: builder.query<BaseResponse<PaymentType>, string>({
            query: (transactionId) => ({
                url: `payment/${transactionId}`,
                method: "GET",
            })
        })
    })
})

export const {useGetTransactionsQuery,useMakePaymentMutation,useVerifyTransactionQuery, useGetTransactionByIdQuery, useLazyGetTransactionByIdQuery, useLazyVerifyTransactionQuery} = extendedApi