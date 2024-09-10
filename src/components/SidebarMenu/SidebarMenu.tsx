import { useAppSelector } from '@src/hooks/useRedux';
import { LinkList } from '..';
import { MainTheme } from '@src/config/theme';
import AuthService from '@src/services/auth';
import { Routes } from '@src/utils/navigation';
import { useTranslations } from 'next-intl';



const SidebarMenu = () => {

  const translate = useTranslations('COMPONENTS.SIDEBAR_MENU');
  const { loggedUser } = useAppSelector((state) => state.user)

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
    {path: Routes.COMPANY_LIST, name: translate('ROUTES.COMPANY_LIST'), testId: 'routeCompanyList'},
  ]
  
  return(
    <div className='flex flex-col w-60 h-screen mr-16 px-3 min-w-52 fixed' style={{
      backgroundColor: MainTheme.sidebarMenuColorBackground,
      borderRightWidth: 1,
      borderRightColor: MainTheme.borderPrimaryColorBorder
    }}>
      <h1>{loggedUser?.firstName}</h1>
      <LinkList title={translate('TITLE.TICKETS')} routes={ticketsRoutes} className='mb-6'/>
      <LinkList title={translate('TITLE.USERS')} routes={usersRoutes} className='mb-6' />
      <LinkList title={translate('TITLE.COMPANY')} routes={companyRoutes} className='mb-6' />
      <input type='button' onClick={AuthService.signout} value={translate('TITLE.SIGNOUT')} />
    </div>
  )
}

export default SidebarMenu;