import { HashRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { Home } from "./pages/Home"
import { AppHeader } from "./cmp/AppHeader"
import { ToyIndex } from "./pages/ToyIndex"
import { ToyEdit } from "./pages/ToyEdit"
import { ToyDetails } from "./pages/ToyDetails"
import { toyService } from "./services/toyService"
import { UserMsg } from "./cmp/UserMsg"
import { AppFooter } from "./cmp/AppFooter"

function App() {
  console.log("גרסה חדשה 7");

  return (
    <section className="app">
      <Router>
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/toy" element={<ToyIndex />}>
              <Route path="/toy/edit/:toyId?" element={<ToyEdit />} />
            </Route>
            <Route path="/toy/:toyId" element={<ToyDetails />} />
          </Routes>
        </main>
        <AppFooter />
        <UserMsg />
      </Router>
    </section>
  )
}

export default App
