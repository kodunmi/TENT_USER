import { BaseResponse, InstallmentOrderType, OrderType, orderStatusEnums } from './../lib/type';
import { emptySplitApi } from './base';

interface getMyOrdersResponse {
    page: number
    pages: number
    myOrderCount: number
    myOrders: Array<OrderType>
}

export interface getEstimateProps { estateId: string, landSize: number, paymentMethod: 'fullPayment' | 'instalmentPayment', buildingTypeId?: string}

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getEstimate: builder.mutation<BaseResponse<OrderType | InstallmentOrderType>, getEstimateProps>({
            query: (body) => ({
                url: "order/estimate",
                method: "POST",
                body: body
            })
        }),

        getMyOrders: builder.query<BaseResponse<getMyOrdersResponse>, { filterByStatus?: orderStatusEnums, pageNumber?: number, sortBy?: string, order?: string }>({
            query: (body) =>  `/order/my-orders`
        }),

        getMyOrderById: builder.query<BaseResponse<OrderType>,string>({
            query: (orderId) => ({
                url: `order/my-order/${orderId}`,
                method: "GET",
            })

        })
    })
})

export const {useGetEstimateMutation,useGetMyOrdersQuery,useGetMyOrderByIdQuery, useLazyGetMyOrderByIdQuery } = extendedApi