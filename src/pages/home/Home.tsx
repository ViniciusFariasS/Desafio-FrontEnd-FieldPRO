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

    //Filter
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [filter, setFilter] = useState<boolean>(false);
    const [error, setError] = useState('');

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItens, setTotalItens] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const paginationOptions: Array<number> = [10, 25, 50, 100, 150, 200];

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
        let time: Array<Date> = filterDatesByRange(data.map((item) => (new Date(item.time * 1000))), startDate, endDate);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setTotalItens(time.length);

        const newChartData: IGrowthStageProps = {
            title: "Growth Stage",
            labels: time.slice(startIndex, endIndex).map((item) => {
                return item.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
            }),
            data: [
                {
                    label: "Ndvi",
                    data: ndvi.slice(startIndex, endIndex),
                    decimal: true
                },
                {
                    label: "Degree days",
                    data: degreeDays.slice(startIndex, endIndex),
                    decimal: false,
                    type: "C"
                },
                {
                    label: "Precipitation",
                    data: precipitaion.slice(startIndex, endIndex),
                    decimal: false,
                    type: "mm"
                },
            ]
        }
        setChartData(newChartData);

    }, [data, filter, currentPage, itemsPerPage]);

    function filterDatesByRange(dates: Date[], startDate: string, endDate: string) {
        const start = new Date(startDate);
        start.setDate(start.getDate() + 1);
        const end = new Date(endDate);
        end.setDate(end.getDate() + 1);

        if (startDate && endDate) {
            return dates.filter((date) => {
                return date >= start && date <= end;
            });
        } else {
            return dates;
        }
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
                <GrowthStage data={chartData?.data} labels={chartData?.labels} title="Growth Stage" />
            </div>
            <div className="home__pagination">
                <select onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}>
                    {paginationOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
                <Pagination
                    shape="rounded"
                    count={Math.ceil(totalItens / itemsPerPage)}
                    page={currentPage}
                    size="small"
                    onChange={(e, page: number) => setCurrentPage(page)} />
            </div>
        </HomeContainer>
    )
}

export {
    Home
}