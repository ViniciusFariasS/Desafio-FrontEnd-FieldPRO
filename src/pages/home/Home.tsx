import { useEffect, useState } from "react";
import { getGrowthStage } from "../../services/serviceJson.service";
import { HomeContainer } from "./Home.style";
import { GrowthStage } from "../../components/GrowthStage/GrowthStage";
import { IGrowthStage } from "./Home.interface";
import { IGrowthStageProps } from "../../components/GrowthStage/GrowthStage.interface";
import { Filter } from "../../components/Filter/Filter";
import { Pagination } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

const Home = () => {
    const [data, setData] = useState<Array<IGrowthStage> | []>([])
    const [filteredData, setFilteredData] = useState<Array<IGrowthStage> | []>([])
    const [chartData, setChartData] = useState<IGrowthStageProps>();

    //Filter
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [error, setError] = useState('');

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItens, setTotalItens] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const paginationOptions: Array<number> = [10, 25, 50, 100, 150, 200];

    useEffect(() => {
        getGrowthStage
            .then(res => {
                setData(res.data);
            });
    }, []);

    useEffect(() => {
        if (data.length) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            const degreeDaysArr = filteredData.length ? filteredData.map((item) => item.degree_days) : data.map((item) => item.degree_days).slice(startIndex, endIndex);
            const precipitaionArr = filteredData.length ? filteredData.map((item) => item.precipitation) : data.map((item) => item.precipitation).slice(startIndex, endIndex);
            const ndviArr = filteredData.length ? filteredData.map((item) => item.ndvi) : data.map((item) => item.ndvi).slice(startIndex, endIndex);
            const timeArr = filteredData.length ? filteredData.map((item) => new Date(item.time * 1000)) : data.map((item) => new Date(item.time * 1000));

            const newChartData: IGrowthStageProps = {
                labels: timeArr.slice(startIndex, endIndex).map((item) => {
                    return item.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
                }),
                data: [
                    {
                        label: "Ndvi",
                        data: ndviArr,
                        decimal: true
                    },
                    {
                        label: "Degree days",
                        data: degreeDaysArr,
                        decimal: false,
                        type: "C"
                    },
                    {
                        label: "Precipitation",
                        data: precipitaionArr,
                        decimal: false,
                        type: "mm"
                    },
                ]
            }
            setTotalItens(timeArr.length);
            setChartData(newChartData);
        }
    }, [data, filteredData, currentPage, itemsPerPage]);

    function filterChartData() {
        setCurrentPage(1);
        const start = ((new Date(startDate).getTime() + 10800000));
        const end = ((new Date(endDate).getTime() + 97199000));

        const newFilteredData = data.filter((item) => (item.time * 1000) >= start && (item.time * 1000) <= end)
        setFilteredData(newFilteredData);
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
            filterChartData();
            setError("");
        }
    }

    const cleanFilter = () => {
        setStartDate("");
        setEndDate("");
        setFilteredData([]);
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
                    <div className="filter__button">
                        <button className="filter__button--filter" type="submit"><FilterAltIcon /></button>
                        <button className="filter__button--clean" type={"button"} onClick={cleanFilter}><AutoDeleteIcon /></button>
                    </div>
                </Filter>

            </div>
            <div className="home__content">
                <GrowthStage data={chartData?.data || []} labels={chartData?.labels || []} title="Growth Stage" />
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