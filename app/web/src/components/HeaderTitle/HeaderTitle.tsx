
interface IHeaderTitle {
  title: string,
  description?: string
}

const HeaderTitle = ({ title, description }: IHeaderTitle) => {
  return (<div className="flex-start w-11/12 mb-6">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>)
}

export default HeaderTitle;