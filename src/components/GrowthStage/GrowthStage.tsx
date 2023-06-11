import React, { useEffect, useState } from 'react';
import { Chart, registerables, ChartOptions, ChartData, Plugin } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EColors, EColorsGradient, IGrowthStageProps } from './GrowthStage.interface';
import { CircularProgress } from "@mui/material";
import { GrowthStageContainer } from './GrowthStage.styles';


const GrowthStage: React.FC<IGrowthStageProps> = ({ data, labels }) => {
    const [loading, setLoading] = useState<boolean>(false);
    Chart.register(...registerables);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [data])

    const chartData: ChartData<"line"> = {
        labels: labels,
        datasets: data ?
            data.map((item, indexof) => {
                return {
                    label: item?.label,
                    data: item?.data,
                    borderWidth: 3,
                    fill: '0',
                    pointBorderWidth: 0,
                    borderColor: EColors[indexof],
                    backgroundColor: EColorsGradient[indexof],
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

    const htmlLegendPlugin: Plugin<"line"> = {
        id: 'htmlLegend',
        beforeUpdate(chart: Chart<"line">) {
            if (chart.data.datasets[0]?.data.length > 0 && !document.getElementById('legend-id')) {
                const legendContainer = document.getElementById("legend-container");
                const ul = document.createElement('ul');
                chart.data.datasets.map((item) => {
                    const li = document.createElement('li');
                    li.id = "legend-id";
                    let averageValue: number = 0;
                    item?.data?.forEach((item: any, i) => {
                        averageValue = averageValue + (item as number);
                    })
                    averageValue = Number((averageValue / item.data.length).toFixed(0));

                    const textValue = document.createElement('p');
                    textValue.className = "growthStage__legend--value"
                    textValue.style.borderBottom = `solid 4px ${item.borderColor}`
                    textValue.textContent = averageValue.toString();

                    const textContainer = document.createElement('p');
                    textContainer.className = "growthStage__legend--text"
                    textContainer.textContent = item?.label as string

                    li.appendChild(textValue);
                    li.appendChild(textContainer);
                    ul.appendChild(li);
                })
                legendContainer?.appendChild(ul);
            }
        }
    };

    return (
        <GrowthStageContainer>
            <div className="growthStage__legend">
                {
                    loading ?
                        <CircularProgress color='inherit' />
                        : <div className={'growthStage__legend--container'} id={'legend-container'}></div>
                }
            </div>
            <Line options={options} data={chartData} plugins={[htmlLegendPlugin]} />
        </GrowthStageContainer>
    )
};


export { GrowthStage };