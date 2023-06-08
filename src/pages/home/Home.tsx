import { useEffect } from "react";
import { getServiceJson } from "../../services/serviceJson.service";
import { HomeContainer } from "./Home.style";

const Home = () => {

    useEffect(() => {
        getServiceJson
            .then(res =>
                console.log(res.data))
    }, [])

    return (
        <HomeContainer>
            HOME
        </HomeContainer>
    )
}

export {
    Home
}