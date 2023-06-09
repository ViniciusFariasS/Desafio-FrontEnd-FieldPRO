import React from 'react';
import { Chart, registerables, ChartOptions, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EColors, EColorsGradient, IGrowthStageProps } from './GrowthStage.interface';


const GrowthStage: React.FC<IGrowthStageProps> = ({ data, labels }) => {
    Chart.register(...registerables);

    const chartData: ChartData<"line"> = {
        labels: labels,
        datasets: data ?
            data.map((item, indexof) => {
                return {
                    label: item?.label,
                    data: item?.data,
                    borderWidth: 3,
                    fill: 'stack',
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    borderColor: EColors[indexof],
                    backgroundColor: EColorsGradient[indexof],
                    redraw: true,
                };
            }) : [],
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    boxHeight: 1,
                }
            },
        },
        elements: {
            line: {
                tension: 1,
                borderCapStyle: 'square',
                cubicInterpolationMode: 'monotone',
            }
        },
    }

    return <Line options={options} data={chartData} />
};


export { GrowthStage };