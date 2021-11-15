import { UserDataType } from './../lib/type';
import { AuthUserDataType } from './../lib';
import { BaseResponse } from '../lib/type';
import { emptySplitApi } from './base';


export interface LoginRequest {
  email: string
  password: string
}

export interface VerifyRequest {
  email: string | string[];
  otp: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}


interface BuildProjectRequest {
  gender?: "male" | "female"
  dateOfBirth?: string
  profileImage?: string
  stateOfOrigin?: string
  maritalStatus?: "single" | "married"
  occupation?: string
  nextOfKin?: {
    name: string
    relationship: string
    phoneNumber: string
    address: string
    state: string
    city: string
  },
  residentialAddress?: {
    address: string
    city: string
    state: string
    zipCode: number
  },
  businessAddress?: {
    address: string
    city: string
    state: string
    zipCode: number
  }
}






const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<BaseResponse<AuthUserDataType>, LoginRequest>({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<BaseResponse<RegisterRequest>, RegisterRequest>({
      query: (body) => ({
        url: 'user/signup',
        method: 'POST',
        body: body,
      })
    }),
    resendVerificationMail: builder.mutation<BaseResponse<string>, {email: string | string[]}>({
      query: (body) => ({
        url: 'user/resend-otp',
        method: 'POST',
        body: body,
      })
    }),
    verifyMail: builder.mutation<BaseResponse<AuthUserDataType | string>, VerifyRequest>({
      query: (body) => ({
        url: 'user/verify-email',
        method: 'POST',
        body: body,
      })
    }),
    verifyPhone: builder.mutation<BaseResponse<string>, { phone: string, otp: string }>({
      query: (body) => ({
        url: 'user/verify-phone',
        method: 'POST',
        body: body,
      })
    }),
    buildProfile: builder.mutation<BaseResponse<string>, BuildProjectRequest>({
      query: (body) => ({
        url: 'user/build-profile',
        method: 'POST',
        body: body,
      })
    }),
    requestPhoneVerification: builder.mutation<BaseResponse<string>, string>({
      query: () => ({
        url: 'user/request-phone-verification',
        method: 'POST',
      })
    }),
    getMyProfile: builder.query<BaseResponse<UserDataType>,string>({
      query: () => ({
        url: 'user/my-profile',
        method: 'GET'
      })
    }),

    editProfile: builder.mutation<BaseResponse<UserDataType>,UserDataType>({
      query: () =>({
        url: 'user/update-my-profile',
        method: 'PATCH'
      })
    }),
    logoutCurrent: builder.mutation<BaseResponse<string>,string>({ 
      query: () => ({
        url: 'user/logout',
        method: 'POST'
      })
    }),
    logoutAll: builder.mutation<BaseResponse<string>,string>({ 
      query: () => ({
        url: 'user/logout-all',
        method: 'POST'
      })
    }),
    changePasswordDashboard: builder.mutation<BaseResponse<string>,{oldPassword:string,newPassword:string}>({ 
      query: (body) => ({
        url: 'user/update-password',
        method: 'PATCH',
        body
      })
    }),
    requestPasswordReset: builder.mutation<BaseResponse<string>, {email: string}>({
      query: (body) => ({
        url: 'user/request-password-reset',
        method: 'POST',
        body: body,
      })
    }),

    resetPassword: builder.mutation<BaseResponse<string>, {email: string, otp: string, oldPassword:string, repeatPassword:string}>({
      query: (body) => ({
        url: 'user/reset-password',
        method: 'POST',
        body: body,
      })
    }),
    
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { 
  useLoginMutation, 
  useProtectedMutation, 
  useRegisterMutation, 
  useBuildProfileMutation,
  useChangePasswordDashboardMutation,
  useEditProfileMutation,
  useGetMyProfileQuery,
  useLogoutAllMutation,
  useLogoutCurrentMutation,
  useRequestPasswordResetMutation,
  useRequestPhoneVerificationMutation,
  useResendVerificationMailMutation,
  useResetPasswordMutation,
  useVerifyMailMutation,
  useVerifyPhoneMutation } = extendedApi