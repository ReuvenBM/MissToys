import { useNavigate , NavLink  } from 'react-router-dom'



export function AppHeader() {
  const navigate = useNavigate()
  return (
    <header>
      <section className="main-header">
        <h1>Toy App</h1>
        <NavLink to="/" className="Toys-link">Toys</NavLink>
        <button className='btn' onClick={() => navigate(-1)}>Back</button>
      </section>
    </header>
  )
}
