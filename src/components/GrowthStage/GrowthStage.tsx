import React from 'react';
import { Chart, registerables, ChartOptions, LegendItem, ChartData, ChartDataset } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { EColors, EColorsGradient, IGrowthStageProps } from './GrowthStage.interface';

const GrowthStage: React.FC<IGrowthStageProps> = ({ data, labels }) => {
    Chart.register(...registerables);
    Chart.defaults.elements.line.borderColor = "#F2f"
    Chart.defaults.elements.line.borderWidth = 2

    const chartData: ChartData<"line"> = {
        labels: labels?.slice(0, 10),
        datasets: data ?
            data.map((item, indexof) => {
                return {
                    label: item?.label,
                    data: item?.data,
                    borderWidth: 3,
                    fill: true,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    borderColor: EColors[indexof],
                    backgroundColor: EColorsGradient[indexof]
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
        animations: {
            tension: {
                duration: 1000,
                from: 0,
                to: 1,
                loop: false,
            },
        },

    }


    return <Line options={options} data={chartData} />
};

export { GrowthStage };