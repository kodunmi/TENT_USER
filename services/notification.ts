import { NotificationType } from '../pages/notifications';
import { NotificationEvents } from './../lib/constants';
import { BaseResponse, CardType } from './../lib/type';
import { emptySplitApi } from './base';
import { io } from 'socket.io-client';

// const token = (getState() as RootState).auth.token

const extendedApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationType[], {page: number}>({
            queryFn: ({page}) => ({ data: [] }),
            async onCacheEntryAdded(
              {page},
              { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
              try {
                await cacheDataLoaded;
           
                const socket = io('https://tent-group-server.herokuapp.com', {
                    query: {
                        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA2NTYzZmE2NDMyNTAwMTYzMzRkZDQiLCJpYXQiOjE2NDQ4MTg0ODJ9.tZ0Zg73r51BQ18LoaW8xIPv0bJ7QQ9X0LqEEXyJDRQo`
                    }
                });


                const pagination = {
                    pageNumber: page
                }
           
                socket.on('connect', () => {
                  socket.emit(NotificationEvents.GetAllNotifications, pagination, (nots:any) =>{
                      console.log(nots);
                      
                    updateCachedData((draft) => {
                        draft.push(...nots);
                      });
                  });
                });
           
                socket.on(NotificationEvents.NewNotification, (not: any) => {
                    console.log(not);
                    
                  updateCachedData((draft) => {
                    draft.push(not);
                  });
                });
           
                await cacheEntryRemoved;
                socket.off(NotificationEvents.GetAllNotifications);
                socket.off(NotificationEvents.NewNotification);
                socket.off(NotificationEvents.ReadNotification);

              } catch {
                // if cacheEntryRemoved resolved before cacheDataLoaded,
                // cacheDataLoaded throws
              }
            },
          }),
    })
})

export const {useGetNotificationsQuery} = extendedApi