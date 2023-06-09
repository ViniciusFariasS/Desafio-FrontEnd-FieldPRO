import { useEffect, useState } from "react";
import { getServiceJson } from "../../services/serviceJson.service";
import { HomeContainer } from "./Home.style";
import { GrowthStage } from "../../components/GrowthStage/GrowthStage";
import { IServiceJson } from "./Home.interface";
import { IGrowthStageProps } from "../../components/GrowthStage/GrowthStage.interface";
import { Filter } from "../../components/Filter/Filter";
import { Pagination } from "@mui/material";

const Home = () => {
    const [data, setData] = useState<Array<IServiceJson> | []>([])
    const [chartData, setChartData] = useState<IGrowthStageProps>();

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [filter, setFilter] = useState<boolean>(false);
    const [error, setError] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItens, setTotalItens] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        getServiceJson
            .then(res => {
                setData(res.data);
            });
    }, []);

    useEffect(() => {
        const degreeDays = data.map((item) => item.degree_days);
        const precipitaion = data.map((item) => item.precipitation);
        const ndvi = data.map((item) => item.ndvi);
        let time = data.map((item) => (new Date(item.time * 1000)).toLocaleDateString())

        if (startDate && endDate) {
            time = filterDatesByRange(data.map((item) => (new Date(item.time * 1000)).toLocaleDateString()), startDate, endDate);
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setTotalItens(time.length);

        const newData: IGrowthStageProps = {
            labels: time.slice(startIndex, endIndex),
            data: [
                {
                    label: "NDVI",
                    data: ndvi.slice(startIndex, endIndex)
                },
                {
                    label: "Degree days",
                    data: degreeDays.slice(startIndex, endIndex)
                },
                {
                    label: "Precipitation",
                    data: precipitaion.slice(startIndex, endIndex)
                },
            ]
        }
        setChartData(newData);

    }, [data, filter, currentPage]);

    function filterDatesByRange(dates: string[], startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return dates.filter((date) => {
            const parts = date.split('/');
            const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);

            const currentDate = new Date(formattedDate);

            return currentDate >= start && currentDate <= end;
        });
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        e.preventDefault();
        if (start > end) {
            setError('A Data inicial não pode ser maior que a Data final!');
            return;
        }
        else {
            setError('');
            setFilter(!filter);
        }
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <HomeContainer>
            <div className="home__filter">
                <Filter error={error} handleFilterSubmit={handleSubmit}>
                    <div className="filter__input">
                        <label htmlFor="start-date">Data Inicial:</label>
                        <input
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="filter__input">
                        <label htmlFor="end-date">Data Final:</label>
                        <input
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </Filter>
            </div>
            <div className="home__content">
                <h1 className="home__content--title">Estágio de Crescimento</h1>
                <GrowthStage data={chartData?.data} labels={chartData?.labels} />
                <div className="home__content--pagination">
                    <Pagination
                        count={Math.ceil(totalItens / itemsPerPage)}
                        page={currentPage}
                        onChange={(e, page: number) => setCurrentPage(page)} />
                </div>
            </div>
        </HomeContainer>
    )
}

export {
    Home
}