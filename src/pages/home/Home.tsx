import { useEffect, useState } from "react";
import { getServiceJson } from "../../services/serviceJson.service";
import { HomeContainer } from "./Home.style";
import { GrowthStage } from "../../components/GrowthStage/GrowthStage";
import { IServiceJson } from "./Home.interface";
import { IGrowthStageProps } from "../../components/GrowthStage/GrowthStage.interface";

const Home = () => {
    const [data, setData] = useState<IGrowthStageProps>();

    useEffect(() => {
        getServiceJson
            .then(res => {
                const degreeDays = res.data.map((item) => item.degree_days);
                const precipitaion = res.data.map((item) => item.precipitation);
                const ndvi = res.data.map((item) => item.ndvi);
                const time = res.data.map((item) => (new Date(item.time * 1000)).toLocaleDateString());

                const newData: IGrowthStageProps = {
                    labels: time,
                    data: [
                        {
                            label: "Degree days",
                            data: degreeDays
                        },
                        {
                            label: "Precipitation",
                            data: precipitaion
                        },
                        {
                            label: "NDVI",
                            data: ndvi
                        }
                    ]
                }

                setData(newData);
            }
            );
    }, []);

    useEffect(() => {

    }, [data])

    return (
        <HomeContainer>
            <GrowthStage data={data?.data} labels={data?.labels} />
        </HomeContainer>
    )
}

export {
    Home
}