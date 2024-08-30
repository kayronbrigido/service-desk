import { Link } from "..";

interface ILinkListProps {
  title?: string,
  routes: ILinkItem[],
  className?: string
}

interface ILinkItem {
  path: string,
  name: string,
  testId?: string,
}

const LinkList = ({
  title,
  routes,
  className
}: ILinkListProps) => {
  return (
    <div className={className}>
      <p className="my-1">{title}</p>
      <ul className="mx-5">
        {routes.map((route) =>
          <li key={route.path} test-id={route.testId}><Link path={route.path}>{route.name}</Link></li>
        )}
      </ul>
    </div>)
}

export default LinkList;