import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
  return (
    <article className="toy-preview">
      <Link to={`/toy/${toy.id}`}>
        <img
          src={`https://source.unsplash.com/300x200/?${toy.labels[0]}`}
          alt={toy.name}
        />
        <h2>{toy.name}</h2>
        <h4>Price: ${toy.price}</h4>
        <h4>Labels: {toy.labels.join(', ')}</h4>
        <h4>In stock: {toy.inStock ? 'Yes' : 'No'}</h4>
      </Link>
    </article>
  )
}
