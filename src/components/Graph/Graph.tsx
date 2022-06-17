import React from "react";
import { Bar } from "react-chartjs-2";
import { covidData } from "../../api";
import styles from "./Graph.module.css";

interface Props {
  data: covidData | undefined;
}

const Graph = ({ data }: Props) => {
  if (!data) {
    return <div>Loading, please wait...</div>;
  }
  const { name, active, cured, deaths } = data;
  const total = active+cured+deaths;
  const barChart =
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths", "Active"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(242, 234, 0, 0.5)",
            ],
            hoverBackgroundColor: [
              "rgba(0, 77, 153)",
              "rgba(30, 102, 49)",
              "rgba(255, 51, 51)",
              "rgba(204, 153, 0)",
            ],
            data: [
              total,
              cured,
              deaths,
              active
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current Covid Cases in ${name}` },
      }}
    />

  return (
    <div className={styles.container}>{ barChart }</div>
  );
};

export default Graph;
