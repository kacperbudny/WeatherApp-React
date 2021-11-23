import {
  CategoryScale,
  Chart,
  ChartOptions,
  ChartTypeRegistry,
  TooltipItem,
} from "chart.js";
import { Context } from "chartjs-plugin-datalabels";
import React from "react";
import { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import HourlyWeather from "../../utils/models/hourlyWeather";
import ChartDataLabels from "chartjs-plugin-datalabels";

interface Props {
  dataArray?: HourlyWeather[];
}

const Graph: React.FC<Props> = ({ dataArray }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [temperature, setTemperature] = useState<number[]>([]);
  const [minY, setMinY] = useState<number>();
  const [maxY, setMaxY] = useState<number>();

  useLayoutEffect(() => {
    setLabels(getNext24HoursLabels());

    Chart.register(ChartDataLabels);
    Chart.defaults.font.size = 14;
    Chart.defaults.font.family = `"Ubuntu", sans-serif`;
  }, []);

  useEffect(() => {
    if (dataArray) {
      const newTemperature = dataArray.map(
        (weatherData) => weatherData.temperature
      );
      setTemperature(newTemperature);
      setMaxY(Math.max.apply(null, newTemperature) + 2);
      setMinY(Math.min.apply(null, newTemperature) - 2);
    }
  }, [dataArray]);

  const getNext24HoursLabels = (): string[] => {
    const array = [];

    const now = new Date();
    let hours = now.getHours();

    for (let i = 0; i < 24; i++) {
      array.push(hours + ":00");
      hours++;
      if (hours >= 24) {
        hours = 0;
      }
    }

    return array;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temperature,
        fill: {
          target: "origin",
          above: "rgba(255,170,99,0.5)",
          below: "rgba(255,170,99,0.5)",
        },
        borderColor: "rgba(255,170,99,1)",

        tension: 0.2,
      },
    ],
  };

  const options: ChartOptions = {
    font: {
      size: 14,
      family: `"Ubuntu", sans-serif`,
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        displayColors: false,
        footerFont: {
          size: 14,
        },
        callbacks: {
          title: function (
            tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]
          ) {
            const date = new Date(
              dataArray![tooltipItems[0].parsed.x].date * 1000
            );

            return `${date.getDate()}.${
              date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1
            }.${date.getFullYear()} ${
              date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
            }:${
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes()
            }`;
          },
          label: function (tooltipItem: TooltipItem<keyof ChartTypeRegistry>) {
            return `Temperature: ${tooltipItem.parsed.y.toFixed(
              1
            )} ${String.fromCharCode(176)}C`;
          },
          afterLabel: function (
            tooltipItem: TooltipItem<keyof ChartTypeRegistry>
          ) {
            return `Humidity: ${dataArray![tooltipItem.parsed.x].humidity}%`;
          },
          afterBody: function (
            tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]
          ) {
            return `Wind: ${dataArray![tooltipItems[0].parsed.x].wind} km/h`;
          },
          footer: function (
            tooltipItems: TooltipItem<keyof ChartTypeRegistry>[]
          ) {
            return `${dataArray![tooltipItems[0].parsed.x].description}`;
          },
        },
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "top",
        clamp: true,
        offset: 0,
        display: function (context: Context) {
          return context.dataIndex % 3 === 1;
        },
        formatter: function (value: number) {
          return Math.round(value);
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderColor: "white",
        },
        ticks: {
          callback: function (val: string | number, index: number): string {
            return index % 3 === 1
              ? (this as CategoryScale).getLabelForValue(+val)
              : "";
          },
          color: "white",
          maxRotation: 0,
          autoSkipPadding: -10,
        },
      },
      y: {
        max: maxY,
        min: minY,
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false,
          borderColor: "white",
        },
        ticks: {
          display: false,
          color: "white",
        },
      },
    },
  };

  return (
    <div aria-hidden="true">
      <h4>Next 24 hours</h4>
      <div className="graph-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
