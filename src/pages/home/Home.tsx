import { useEffect, useState } from "react";
import { getServiceJson } from "../../services/serviceJson.service";
import { HomeContainer } from "./Home.style";
import { GrowthStage } from "../../components/GrowthStage/GrowthStage";
import { IServiceJson } from "./Home.interface";

const Home = () => {
    const [data, setData] = useState<Array<IServiceJson> | []>([])

    useEffect(() => {
        getServiceJson
            .then(res =>
                setData(res.data)
            );
    }, [])

    return (
        <HomeContainer>
            <GrowthStage data={data} />
        </HomeContainer>
    )
}

export {
    Home
}