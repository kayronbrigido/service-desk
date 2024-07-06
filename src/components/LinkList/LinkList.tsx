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
      <h1 className="my-1">{title}</h1>
      <ul className="mx-5">
        {routes.map((route) =>
          <li><Link path={route.path}>{route.name}</Link></li>
        )}
      </ul>
    </div>)
}

export default LinkList;