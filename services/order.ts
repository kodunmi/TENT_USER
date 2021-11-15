import { BaseResponse, paymentMethodEnums, OrderType, orderStatusEnums } from './../lib/type';
import { emptySplitApi } from './base';

interface getMyOrdersResponse {
    page: number
    pages: number
    myOrderCount: number
    myOrders: Array<OrderType>
}

export interface getEstimateProps { estateId: string, landSize: number, paymentMethod: string, buildingTypeId?: string}

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getEstimate: builder.mutation<BaseResponse<OrderType>, getEstimateProps>({
            query: (body) => ({
                url: "order/estimate",
                method: "POST",
                body: body
            })
        }),

        getMyOrders: builder.query<BaseResponse<getMyOrdersResponse>, { filterByStatus?: orderStatusEnums, pageNumber?: number, sortBy?: string, order?: string }>({
            query: (body) => ({
                url: `/order/my-orders?filterByStatus=${body.filterByStatus}&pageNumber=${body.pageNumber}&sortBy=${body.sortBy}&order=${body.order}`,
                method: "GET",
            })
        }),

        getMyOrderById: builder.query<BaseResponse<OrderType>,string>({
            query: (orderId) => ({
                url: `order/my-order/${orderId}`,
                method: "GET",
            })

        })
    })
})

export const {useGetEstimateMutation,useGetMyOrdersQuery,useGetMyOrderByIdQuery } = extendedApi