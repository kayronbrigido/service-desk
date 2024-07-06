import { Link, LinkList } from '..';
import { MainTheme } from '@src/config/theme';
import { Routes } from '@src/utils/navigation';
import { useTranslations } from 'next-intl';



const SidebarMenu = () => {

  const translate = useTranslations('COMPONENTS.SIDEBAR_MENU');

  const ticketsRoutes = [
    {path: Routes.TicketsOpen, name: translate('ROUTES.OPEN_TICKET')},
    {path: Routes.TicketsInProgress, name: translate('ROUTES.IN_PROGRESS_TICKET')},
    {path: Routes.TicketsCompleted, name: translate('ROUTES.COMPLETED_TICKET')},    
  ];

  
  const usersRoutes = [
    {path: Routes.CreateUser, name: translate('ROUTES.CREATE_USER')},
  ]
  
  return(
    <div className='flex flex-col w-52 h-screen mr-16 px-3' style={{
      backgroundColor: MainTheme.sidebarMenuColorBackground,
      borderRightWidth: 1,
      borderRightColor: MainTheme.borderPrimaryColorBorder
    }}>
      <LinkList title={translate('TITLE.TICKETS')} routes={ticketsRoutes} />
      <LinkList title={translate('TITLE.USERS')} routes={usersRoutes} />
    </div>
  )
}

export default SidebarMenu;