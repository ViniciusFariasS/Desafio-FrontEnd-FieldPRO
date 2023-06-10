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
            //Método para adicionar o título com a linha abaixo (pensar em maneiras melhores de fazer)
            // subtitle: {
            //     display: true,
            //     text: "______________________________________________________________________________________________________________________________________________________________",            
            // },
            // title: {
            //     display: true,
            //     text: 'Estágio de Crescimento',
            //     align: 'start',
            //     color: "#00000",
            //     font: {
            //         family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            //         size: 32,
            //         lineHeight: 1
            //     },
            // },
            legend: {
                labels: {
                    boxHeight: 1,
                }
            },
        },
        scales: {
            y: {
                type: "linear",
                title: {
                    display: true,
                    text: '°C',
                    align: 'end'
                },
            }
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