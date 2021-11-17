import { BaseResponse, CardType } from './../lib/type';
import { emptySplitApi } from './base';

export interface CardProps{
    cardHolder: string
    cardNumber: string
    expiry: {
        month: string
        year: string
    },
    cvv: string
    cardType: string
}



const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        addCard: builder.mutation<BaseResponse<Array<CardType>>, CardProps>({
            query: (card) => ({
                url: "user/add-card",
                method: "POST",
                body: card,
            })
        }),

        getCards: builder.query<BaseResponse<{cards:Array<CardType>,totalSpent:number}>, string>({
            query: () => "user/my-cards"
        }),

        removeCard: builder.mutation<BaseResponse<Array<CardType>>, string>({
            query: (cradId) => ({
                url: `remove-card?cradId=${cradId}`,
                method: "PATCH",
            })
        }),

    })
})

export const {useAddCardMutation,useGetCardsQuery,useRemoveCardMutation} = extendedApi