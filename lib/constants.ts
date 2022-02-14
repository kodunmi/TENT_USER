import process from "process";

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default function isDev(): boolean
{
    return development;
}

export const BaseUrl = isDev ? "https://tent-group-server.herokuapp.com/api/v1/" : "https://tent-group-server.herokuapp.com/api/v1"

export const FrontendUrl = isDev ? "https://tent-user.herokuapp.com/" : "https://tent-user.herokuapp.com/"

export enum NotificationEvents {
    GetAllNotifications = 'my-notifications',
    ReadNotification = 'read-notification',
    NewNotification = 'new-notification',
}