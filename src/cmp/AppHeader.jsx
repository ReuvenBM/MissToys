import { useNavigate, NavLink } from "react-router-dom"

export function AppHeader() {
  const navigate = useNavigate()
  return (
    <header>
      <section className="main-header">
        <h1>Toy App</h1>
        <button className="btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <nav>
          <NavLink to="/" className="Toys-link">Home</NavLink>
          <NavLink to="/toy" className="Toys-link">Toys</NavLink>
        </nav>
      </section>
    </header>
  )
}
