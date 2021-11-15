import { BaseResponse, FacilityType } from './../lib/type';
import { emptySplitApi } from './base';

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getFacilities:builder.query<BaseResponse<Array<FacilityType>>, string>({
            query: () => ({
                url: "facility/user/all-select",
                method: "GET",
            })
        }),
        getCardFacilities:builder.query<BaseResponse<Array<FacilityType>>, string>({
            query: () => ({
                url: "facility/user/all-cards",
                method: "GET",
            })
        })
    })
})

export const {useGetCardFacilitiesQuery,useGetFacilitiesQuery} = extendedApi