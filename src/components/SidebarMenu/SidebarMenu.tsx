import { Link, LinkList } from '..';
import { MainTheme } from '@src/config/theme';
import { Routes } from '@src/utils/navigation';
import { useTranslations } from 'next-intl';



const SidebarMenu = () => {

  const translate = useTranslations('COMPONENTS.SIDEBAR_MENU');

  const ticketsRoutes = [
    {path: Routes.TICKETS_OPEN, name: translate('ROUTES.OPEN_TICKET')},
    {path: Routes.TICKETS_IN_PROGRESS, name: translate('ROUTES.IN_PROGRESS_TICKET')},
    {path: Routes.TICKETS_COMPLETED, name: translate('ROUTES.COMPLETED_TICKET')},    
  ];

  
  const usersRoutes = [
    {path: Routes.CREATE_USER, name: translate('ROUTES.CREATE_USER')},
  ]

  const companyRoutes = [
    {path: Routes.CREATE_COMPANY, name: translate('ROUTES.CREATE_COMPANY')},
  ]
  
  return(
    <div className='flex flex-col w-60 h-screen mr-16 px-3 min-w-52' style={{
      backgroundColor: MainTheme.sidebarMenuColorBackground,
      borderRightWidth: 1,
      borderRightColor: MainTheme.borderPrimaryColorBorder
    }}>
      <LinkList title={translate('TITLE.TICKETS')} routes={ticketsRoutes} />
      <LinkList title={translate('TITLE.USERS')} routes={usersRoutes} />
      <LinkList title={translate('TITLE.COMPANY')} routes={companyRoutes} />
    </div>
  )
}

export default SidebarMenu;