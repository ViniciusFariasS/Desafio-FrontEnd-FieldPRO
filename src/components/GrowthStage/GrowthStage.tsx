import React, { useEffect, useState } from 'react';
import { Chart, registerables, ChartOptions, ChartData, Plugin } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EColors, EColorsTransparecy, IGrowthStageProps } from './GrowthStage.interface';
import { CircularProgress } from "@mui/material";
import { GrowthStageContainer } from './GrowthStage.styles';


const GrowthStage = ({ data, labels, title }: IGrowthStageProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [htmlLegendPlugin, setHtmlLegendPlugin] = useState<Plugin<"line">>();
    const [titlePlugin, setTitlePlugin] = useState<Plugin<"line">>();
    Chart.register(...registerables);

    useEffect(() => {
        if (data.length) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 500);

            setTitlePlugin({
                id: 'htmlTitle',
                beforeUpdate() {
                    if (!document.getElementById('title-id')) {
                        const titleContainer = document.getElementById("title-container");
                        const titleValue = document.createElement('h1');
                        titleValue.id = "title-id";
                        titleValue.textContent = title ? title : "";
                        titleContainer?.appendChild(titleValue);
                    }
                }
            })

            setHtmlLegendPlugin({
                id: 'htmlLegend',
                beforeUpdate(chart: Chart<"line">) {
                    if (!document.getElementById('legend-id')) {
                        const legendContainer = document.getElementById("legend-container");
                        const ul = document.createElement('ul');
                        chart.data.datasets.map((item, index) => {
                            const li = document.createElement('li');
                            li.id = "legend-id";
                            let totalValuePerLegend: number = 0;
                            for (let index = 0; index < item.data?.length; index++) {
                                totalValuePerLegend = totalValuePerLegend + (item.data[index] as number);
                            }
                            const averageValuePerLegend = Number(data[index]?.decimal ? Math.floor((totalValuePerLegend / item.data?.length) * 10) / 10 : (totalValuePerLegend / item.data?.length).toFixed(0));

                            const textValue = document.createElement('p');
                            textValue.className = "growthStage__legend--value";
                            textValue.style.borderBottom = `solid 4px ${item.borderColor}`;
                            textValue.textContent = (`${averageValuePerLegend.toString()} ${data ? (data[index]?.type ? data[index]?.type : "") : ""}`);

                            const textContainer = document.createElement('p');
                            textContainer.className = "growthStage__legend--text";
                            textContainer.textContent = item?.label as string;

                            li.appendChild(textValue);
                            li.appendChild(textContainer);
                            ul.appendChild(li);
                        })
                        legendContainer?.appendChild(ul);
                    }
                }
            })
        }

    }, [data])

    const chartData: ChartData<"line"> = {
        labels: labels,
        datasets: data ?
            data.map((item, indexof) => {
                return {
                    label: item?.label,
                    data: item?.data,
                    borderWidth: 3,
                    fill: '2',
                    pointBorderWidth: 0,
                    borderColor: EColors[indexof],
                    backgroundColor: EColorsTransparecy[indexof],
                };
            }) : [],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 10,
                    callback: (value, index, values) => {
                        if (index === values.length - 1) {
                            return "°C";
                        }
                        return value;
                    }
                }
            }
        },
        elements: {
            line: {
                cubicInterpolationMode: 'monotone',
            }
        },
    }

    if (!htmlLegendPlugin || !titlePlugin)
        return <CircularProgress color='inherit' />
    return (
        <GrowthStageContainer>
            <div className={'growthStage__title'} id={'title-container'}></div>
            <div className="growthStage__legend">
                {
                    loading ?
                        <CircularProgress color='inherit' />
                        : <div className={'growthStage__legend--container'} id={'legend-container'}></div>
                }
            </div>
            <Line options={options} data={chartData} plugins={[htmlLegendPlugin, titlePlugin]} />
        </GrowthStageContainer>
    )
};


export { GrowthStage };