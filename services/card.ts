import { BaseResponse, CardType } from './../lib/type';
import { emptySplitApi } from './base';

interface CardProps{
    cardHolder: string
    cardNumber: number
    expiry: {
        month: number
        year: number
    },
    cvv: number
    cardType: string
}



const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        addCard: builder.mutation<BaseResponse<Array<CardType>>, CardProps>({
            query: (card) => ({
                url: "add-card",
                method: "POST",
                body: card,
            })
        }),

        getCards: builder.query<BaseResponse<Array<CardType>>, string>({
            query: () => ({
                url: "my-cards",
                method: "GET",
            })
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