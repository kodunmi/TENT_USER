import { BaseResponse, FacilityType } from './../lib/type';
import { emptySplitApi } from './base';

export interface CardFactoryType {
    _id: string
    estateName: string
    estateLocation: {
        address: string
        city: string
        state: string
        zipCode: number
    },
    totalLandSize: number
    landSizeSold: number
    percentageLandSold: number
}

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getFacilities:builder.query<BaseResponse<Array<FacilityType>>, string>({
            query: () => "facility/user/all-select"
            
        }),
        getCardFacilities:builder.query<BaseResponse<Array<CardFactoryType>>, string>({
            query: () => "facility/user/all-cards"
        })
    })
})

export const {useGetCardFacilitiesQuery,useGetFacilitiesQuery} = extendedApi