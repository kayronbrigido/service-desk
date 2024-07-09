import { Link } from "..";

interface ILinkListProps {
  title?: string,
  routes: ILinkItem[]
}

interface ILinkItem {
  path: string,
  name: string
}

const LinkList = ({
  title,
  routes
}: ILinkListProps) => {
  return (
    <div>
      <p className="my-1">{title}</p>
      <ul className="mx-5">
        {routes.map((route) =>
          <li key={route.path}><Link path={route.path}>{route.name}</Link></li>
        )}
      </ul>
    </div>)
}

export default LinkList;