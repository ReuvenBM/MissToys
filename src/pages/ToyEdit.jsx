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
  const labelOptions = [
    "On Wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ]

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
    const { name, value, type, checked } = target

    if (name === "labels") {
      if (type === "checkbox") {
        setToy((prev) => {
          const labels = checked
            ? [...prev.labels, value]
            : prev.labels.filter((l) => l !== value)
          return { ...prev, labels }
        })
        return
      }
    }

    const val =
      type === "number" || type === "range"
        ? +value
        : type === "checkbox"
        ? checked
        : value

    setToy((prev) => ({ ...prev, [name]: val }))
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

        <fieldset>
          <legend>Labels:</legend>
          {labelOptions.map((label) => (
            <label key={label}>
              <input
                type="checkbox"
                name="labels"
                value={label}
                checked={toy.labels.includes(label)}
                onChange={handleChange}
              />
              {label}
            </label>
          ))}
        </fieldset>

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
