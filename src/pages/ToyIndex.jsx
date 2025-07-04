import { loadToys , removeToy } from "../store/toy/toy.action"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { ToyList } from "../cmp/ToyList"




export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)

  useEffect(() => {
    loadToys()
  }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully!')
        } catch (error) {
            showErrorMsg(`Having issues removing toy (${toyId})`)
        }
    }


  return (
    <ToyList toys={toys} onRemoveToy={onRemoveToy} />
  )
}
