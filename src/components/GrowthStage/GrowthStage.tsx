import React from 'react';
import { Chart, registerables, ChartOptions, LegendItem, ChartData, ChartDataset } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IGrowthStageProps } from './GrowthStage.interface';

const GrowthStage: React.FC<IGrowthStageProps> = ({ data, labels }) => {
    Chart.register(...registerables);

    const chartData: ChartData<"line"> = {
        labels: labels?.slice(0, 10),
        datasets: data ?
            data.map((item) => {
                return {
                    label: item?.label,
                    data: item?.data,
                    borderWidth: 3,
                    fill: true,
                    pointBorderWidth: 0,
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                };
            }) : []
    };

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                align: 'start',
                color: '#000000',
                text: 'Estágio de Crescimento',
                font: {
                    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    size: 24,
                    lineHeight: 1
                },
                padding: 20
            },
            legend: {
                labels: {
                    boxHeight: 1,
                }
            }
        },
        animations: {
            tension: {
                easing: 'linear',
                duration: 1000,
                from: 0,
                to: 1,
                loop: false,
            },

        }
    }


    return <Line options={options} data={chartData} />
};

export { GrowthStage };