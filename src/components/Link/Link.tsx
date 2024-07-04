import Link from 'next/link';
import { useLocale } from 'next-intl';

interface IProps {
  path: string, children?: React.ReactNode
}

const LinkComponent = ({path, children}: IProps) => {
  const locale = useLocale();

  return (
    <Link href={`${locale}/${path}`}>{children}</Link>
  )
}

export default LinkComponent;