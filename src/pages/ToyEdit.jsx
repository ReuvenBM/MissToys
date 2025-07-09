import { useEffect, useState } from "react"
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { toyService } from "../services/toyService"
import { saveToy } from "../store/toy/toy.action"

export function ToyEdit() {
  const [toy, setToy] = useState(toyService.createToy())

  const navigate = useNavigate()
  const { toyId } = useParams()

  useEffect(() => {
    if (toyId) {
      loadToy()
    }
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (error) {
      console.log("error:", error)
    }
  }
  async function onSubmitToy(ev) {
    ev.preventDefault()
    try {
      await saveToy(toy)
      navigate("/toy")
    } catch (err) {
      console.log("err:", err)
    }
  }

  function handleChange({ target }) {
    let { name: field, value, type } = target
    if (type === "select-multiple") {
      value = Array.from(target.selectedOptions, (opt) => opt.value)
    } else {
      switch (type) {
        case "number":
        case "range":
          value = +value
          break
        case "checkbox":
          value = target.checked
        default:
          break
      }
      setToy((toy) => ({ ...toy, [field]: value }))
    }
  }

  const { name, labels, price } = toy

  return (
    <section className="toy-edit">
      <Link to="/toy">
        <button className="close-btn">X</button>
      </Link>
      <h1>{toyId ? "Edit" : "Add"} Toy</h1>
      <form onSubmit={onSubmitToy}>
        <label>
          Name
          <input onChange={handleChange} type="text" name="name" value={name} />
        </label>
        <select multiple onChange={handleChange} value={labels} name="labels">
          <option value="On Wheels">On Wheels</option>
          <option value="Battery Powered">Battery Powered</option>
          <option value="Doll">Doll</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Baby">Baby</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Box game">Box game</option>
          <option value="Art">Art</option>
        </select>
        <label>
          Price
          <input
            onChange={handleChange}
            type="number"
            name="price"
            value={price}
          />
        </label>
        <section className="btns">
          <button className="btn">Save</button>
        </section>
      </form>
    </section>
  )
}
