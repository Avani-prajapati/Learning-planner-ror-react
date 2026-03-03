
function Card({title}: {title: string}) {
  return (
    <div className="border p-4 m-4">
        <h1>{title}</h1>
        <p>This is a card component</p>
    </div>
  )
}

export default Card