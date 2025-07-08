import { useSelector } from "react-redux"

export function ToyFilter (){

    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
   

    return(
        <div>
            <p>Toy Filter</p>
        </div>
    )
}