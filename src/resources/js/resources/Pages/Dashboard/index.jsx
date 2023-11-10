import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { BlankPage } from "../../components";
import { PageUtils } from "./PageUtils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => getRandomArbitrary(0, 1000)),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => getRandomArbitrary(0, 1000)),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

const Dashboard = () => {
    const pageUtils = new PageUtils();

    return (
        <BlankPage pageUtils={pageUtils}>
            <div className="section d-flex-wrap fix-mr15">
                <Bar options={options} data={data} />
            </div>
        </BlankPage>
    );
};

export default Dashboard;
