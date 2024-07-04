import { Link } from '..';
import { MainTheme } from '@src/config/theme';
import { useTranslations } from 'next-intl';

const SidebarMenu = () => {

  const translate = useTranslations('COMPONENTS.SIDEBAR_MENU');
  return(
    <div className='flex w-52 h-screen mr-16' style={{
      backgroundColor: MainTheme.sidebarMenuColorBackground,
      borderRightWidth: 1,
      borderRightColor: MainTheme.borderPrimaryColorBorder
    }}>
      <h2>{translate('TITLE.TICKETS')}</h2>
      <ul>
        <li><Link path='login'>{translate('ROUTES.OPEN_TICKET')}</Link></li>
        <li><Link path='login'>{translate('ROUTES.IN_PROGRESS_TICKET')}</Link></li>
        <li><Link path='login'>{translate('ROUTES.COMPLETED_TICKET')}</Link></li>
      </ul>
    </div>
  )
}

export default SidebarMenu;