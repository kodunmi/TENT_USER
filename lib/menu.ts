import UsersIcon from 'remixicon-react/UserLineIcon';
import FacilitiesIcon from 'remixicon-react/Home5LineIcon';
import OrdersIcon from 'remixicon-react/NewspaperLineIcon';
import TransactionsIcon from 'remixicon-react/ExchangeFundsLineIcon';
import MessagesIcon from 'remixicon-react/MailOpenLineIcon';
import NotIcon from 'remixicon-react/QuestionAnswerLineIcon';
import { MenuItemType } from './type';

export const MenuList: Array<MenuItemType> = [
  {
    route: '/',
    icon: FacilitiesIcon,
    display: 'Home',
  },
  {
    route: '/profile',
    icon: UsersIcon,
    display: 'Profile',
  },
  {
    route: '/notifications',
    icon: NotIcon,
    display: 'Notifications',
    countable: true
  },
  {
    route: '/orders',
    icon: OrdersIcon,
    display: 'Orders',
    countable: true
  },
  {
    route: '/payments',
    icon: TransactionsIcon,
    display: 'Payments',
  },
  {
    route: '/support',
    icon: MessagesIcon,
    display: 'Support'
  },
  {
    route: '/login',
    icon: MessagesIcon,
    display: 'Support'
  }
];
