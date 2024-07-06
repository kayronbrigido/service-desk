import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

interface IProps {
  path: string, children?: React.ReactNode
}

const LinkComponent = ({path, children}: IProps) => {
  const locale = useLocale();
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/${locale}/${path}`)
  }
  return (
    <button onClick={handleNavigation}>{children}</button>
  )
}

export default LinkComponent;