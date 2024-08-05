import { Link, LinkList } from '..';
import { MainTheme } from '@src/config/theme';
import { Routes } from '@src/utils/navigation';
import { useTranslations } from 'next-intl';



const SidebarMenu = () => {

  const translate = useTranslations('COMPONENTS.SIDEBAR_MENU');

  const ticketsRoutes = [
    {path: Routes.TICKETS_OPEN, name: translate('ROUTES.OPEN_TICKET'), testId: 'routeOpenTicket'},
    {path: Routes.TICKETS_IN_PROGRESS, name: translate('ROUTES.IN_PROGRESS_TICKET'), testId: 'routeTicketInProgress'},
    {path: Routes.TICKETS_COMPLETED, name: translate('ROUTES.COMPLETED_TICKET'), testId: 'routeCompletedTicket'},    
  ];

  
  const usersRoutes = [
    {path: Routes.CREATE_USER, name: translate('ROUTES.CREATE_USER'), testId: 'routeCreateUser'},
  ]

  const companyRoutes = [
    {path: Routes.CREATE_COMPANY, name: translate('ROUTES.CREATE_COMPANY'), testId: 'routeCreateCompany'},
  ]
  
  return(
    <div className='flex flex-col w-60 h-screen mr-16 px-3 min-w-52 fixed items-center' style={{
      backgroundColor: MainTheme.sidebarMenuColorBackground,
      borderRightWidth: 1,
      borderRightColor: MainTheme.borderPrimaryColorBorder
    }}>
      <h1>USER NAME</h1>
      <LinkList title={translate('TITLE.TICKETS')} routes={ticketsRoutes} className='mb-6'/>
      <LinkList title={translate('TITLE.USERS')} routes={usersRoutes} className='mb-6' />
      <LinkList title={translate('TITLE.COMPANY')} routes={companyRoutes} className='mb-6' />
    </div>
  )
}

export default SidebarMenu;