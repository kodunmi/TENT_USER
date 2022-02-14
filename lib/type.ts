import { RemixiconReactIconComponentType } from "remixicon-react";

export interface MenuItemType {
    route: string,
    icon: RemixiconReactIconComponentType,
    display: string,
    countable?: boolean
}

export interface DrawerProps {
    openDrawer: boolean,
    handleOpenDrawer: any,
    handleCloseDrawer: any
}

export interface OrderProps {
    title: string,
    location: string,
    status: "PROCESSING" | "SUCCESSFUL" | "FAILED",
    type: "land" | "building",
}

export interface AuthUserDataType {
    token: string
    user: UserDataType
}

export interface UserDataType {
    ipAddress?: string
    accountVerified?: boolean
    profileVerified?: boolean
    emailVerified?: boolean
    verifyPhoneNumberOtp?: string | null
    verifyPhoneNumberOtpExpires?: string | null
    phoneNumberVerified?: boolean
    _id?: string
    fullName?: string
    email?: string
    phoneNumber?: string
    tentUserId?: string
    verifyEmailOtp?: string | null
    verifyEmailOtpExpires?: string | null
    creator?: "user" | "admin",
    createdAt?: string
    updatedAt?: string
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

export interface CardType {
    _id: string
    cardHolder: string
    cardNumber: number
    expiry: {
        month: number
        year: number
    },
    cvv: number
    cardType: string
}

export interface BuildingType {
    _id: string
    buildingType: string
    numberOfRoom: number
}

export interface FacilityType {
    _id: string
    estateName: string
    estateLocation: {
        address: string
        city: string
        state: string
        zipCode: number
    },
    buildings: Array<BuildingType>
}

export interface OrderType {
    addedBuilding?: boolean
    discount?: number
    status: "processing"|"completed"|"terminate"
    paymentCompleted?: boolean
    instalmentPaymentStarted?: boolean
    _id: string
    estateId: {
        estateLocation: {
            address: string
            city: string
            state: string
            zipCode: number
        },
        _id: string
        estateName: string
    },
    landSize: number
    paymentMethod: "instalmentPayment" | 'fullPayment',
    user: string
    estateName: string
    landEstimatedPrice: number
    building?: {
        buildingType: string
        numberOfRoom: number
        buildingEstimatedPrice: number
    },
    orderId: string
    createdAt: string
    updatedAt: string
    infrastructureFee?: number
    legalFee?: number
    surveyFee?: number
    engineeringSupervisionFee?: number
    totalEstimatedPrice: number
    nextPaymentDaysLeft?: number
    instalmentPayment?: {
        totalPaid: number
        numOfPaymentMade: number,
        nextPaymentDueDate: string
        firstPayment: {
            amount: number
            paid: boolean
            datePaid: null | string
            invoiceRef: number
        },
        secondPayment: {
            amount: string
            paid: boolean
            datePaid: null | string
            invoiceRef: null | number
        },
        thirdPayment: {
            amount: number
            paid: boolean
            datePaid: null | string,
            invoiceRef: null | number
        }
    },
}

export interface InstallmentOrderType {
    paymentPlan:{
        firstPayment:string
        secondPayment:string
        thirdPayment:string
    }
    order: OrderType
}

export interface PaymentType {
    paymentCompleted: boolean
    _id: string
    user: {
      _id: string
      fullName: string
      email: string
      phoneNumber: string
      tentUserId: string
      profileImage: string
    },
    order: {
      _id: string
      estateId: string
      estateName: string
      orderId: string
    },
    payerName?: string
    payerEmail?: string
    payerPhoneNumber?: string
    amount: number
    currency: string
    invoiceRef: string
    paymentMethod: 'instalmentPayment' | 'fullPayment'
    payment_options: string
    flw_ref: string
    flutterId: number,
    orderId: string
    paymentDate: string
    createdAt: string
    updatedAt: string
  }


export interface BaseResponse<T> {
    data: T
    status: "success" | "error"
    message?: string
}

export enum orderStatusEnums {
    processing,
    complete,
    terminate
}

export enum paymentMethodEnums {
    instalmentPayment,
    fullPayment
}