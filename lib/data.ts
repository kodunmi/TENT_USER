import { AuthUserDataType } from ".";
import { UserDataType } from "./type";

export const UserData: AuthUserDataType = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYwYzNjNjFhN2UxZjU3MDg5ZWM0OTgiLCJpYXQiOjE2MzM3MzI2NTZ9.ngKkJDJ4Ke7M0P6WkAlsMQwoW5a5uK3h9C8I06ESR1g",
    user: {
        residentialAddress: {
            address: "Gaduwa Estate",
            city: "Gudu",
            state: "abuja",
            zipCode: 6749003
        },
        businessAddress: {
            address: "Malad Plaza",
            city: "Wuse II",
            state: "abuja",
            zipCode: 6749007
        },
        nextOfKin: {
            name: "Praise Amadi",
            relationship: "wife",
            phoneNumber: "+23409088693246",
            address: "Mali Estste",
            state: "Abuja",
            city: "Apo"
        },
        ipAddress: "::1",
        accountVerified: true,
        profileVerified: false,
        emailVerified: true,
        phoneNumberVerified: true,
        _id: "6160c3c61a7e1f57089ec498",
        fullName: "jery emmanuel",
        email: "o.ayomikun83@gmail.com",
        phoneNumber: "+2348188693246",
        tentUserId: "TNTGOA0001",
        verifyEmailOtp: null,
        verifyEmailOtpExpires: null,
        creator: "user",
        createdAt: "2021-10-08T22:18:46.755Z",
        updatedAt: "2021-10-08T23:51:43.032Z",
        verifyPhoneNumberOtp: null,
        verifyPhoneNumberOtpExpires: null,
        dateOfBirth: "Sun Dec 30 2001 01:00:00 GMT+0100 (West Africa Standard Time)",
        gender: "male",
        maritalStatus: "single",
        occupation: "Software Developer",
        profileImage: "https://res.cloudinary.com/ecodeemit/image/upload/v1633731364/image-1_xrtp3x.jpg",
        stateOfOrigin: "ogun"
    }

}

export const statesOfNigeria = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
  ]