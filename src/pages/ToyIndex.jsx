import { loadToys, removeToy } from "../store/toy/toy.action"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { ToyList } from "../cmp/ToyList"
import { ToyFilter } from "../cmp/ToyFilter"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { Link, Outlet } from 'react-router-dom'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  // console.log(toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  useEffect(() => {
    loadToys()
  }, [filterBy])

  async function onRemoveToy(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg("Toy removed successfully!")
    } catch (error) {
      showErrorMsg(`Having issues removing toy (${toyId})`)
    }
  }

  //const { model, minBatteryStatus, type } = filterBy
  //להכניס את מה שאני רוצה לפלטר

  return (
    <section>
      <ToyFilter />
      <Link className="addToy" to='/toy/edit'>Add Toy</Link>
      <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      <Outlet />
    </section>
  )
}
