const UnderLineTitle = ({title}:{title:string}) => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-primary font-bold text-4xl">{title}</h2>
      <div className="h-1 w-full border-b-2 border-primary"></div>
    </div>
  )
}

export default UnderLineTitle
