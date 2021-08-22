import { useEffect } from "react"
import './fourofourpage.css'

const FourOFourPage = () => {

    useEffect(() => {
        document.getElementById("secondNavBarGroups").setAttribute("class", "passive")
        document.getElementById("secondNavBarEvents").setAttribute("class", "passive")
    })
     return (
         <p className="fourofour-text">
            My name is Daniel Pence <br />
            github.com/penced0513<br />
            More Coming Soon<br />
            <br />
            <br />
            <br />
            ...yes this is also a 404 page
         </p>

    )
}

export default FourOFourPage
