import React from 'react';
import { Chart, registerables, ChartOptions, LegendItem, ChartData } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { IGrowthStageProps } from './GrowthStage.interface';

const GrowthStage: React.FC<IGrowthStageProps> = ({ data }) => {
    Chart.register(...registerables);

    const chartData: ChartData<"line"> = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 30, 50, 20],
                backgroundColor: 'rgba(94,215,205, 0.1)',
                borderColor: '#5ED7CD',
                borderWidth: 3,

                fill: true,
            },
            {
                label: 'Dataset 2',
                data: [30, 50, 80, 90],
                backgroundColor: 'rgba(246,116,89, 0.1)',
                borderColor: '#F67459',
                borderWidth: 3,
                fill: true,
            },
            {
                label: 'Dataset 3',
                data: [40, 60, 85, 95],
                backgroundColor: 'rgba(58,153,196, 0.1)',
                borderColor: '#3A99C4',
                borderWidth: 3,
                fill: true,
            },
        ],
    };

    const options: ChartOptions = {
        responsive: true,

        plugins: {
            title: {
                display: true,
                text: 'Talhão 1',
            },
            legend: {
                labels: {
                    boxHeight: 1,
                    generateLabels: (chart) => {
                        const legend: Array<LegendItem> = [{
                            text: "teste",

                            strokeStyle: "#F2f"
                        }]

                        return legend;
                    }
                }
            }
        },

    }


    return <Line options={options} data={chartData} />
};

export { GrowthStage };