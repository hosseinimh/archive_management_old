import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { dashboardPage as strings } from "../../../constants/strings/fa";
import { YEAR_COLORS } from "../../../constants";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const [color, setColor] = useState(null);
    const [years, setYears] = useState([]);
    const [counts, cetCounts] = useState([]);
    const [data, setData] = useState({});
    const pageUtils = new PageUtils();
    ChartJS.defaults.font.size = 16;
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: { family: "YekanBakh", size: 13 },
                },
            },
            title: {
                display: true,
                text: strings.documents,
                font: { family: "YekanBakh", size: 13 },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        if (context.parsed.y !== null) {
                            return context.parsed.y;
                        }
                        return "";
                    },
                },
            },
        },
    };

    useEffect(() => {
        if (layoutState?.theme?.colors?.text) {
            setColor(layoutState?.theme?.colors?.text);
        }
    }, [layoutState?.theme?.colors?.text]);

    useEffect(() => {
        if (color) {
            ChartJS.defaults.color = color;
        }
    }, [color]);

    useEffect(() => {
        if (pageState?.props?.summary?.length > 0) {
            setYears(pageState.props.summary.map((item) => item.year));
            cetCounts(pageState.props.summary.map((item) => item.count));
        }
    }, [pageState?.props?.summary]);

    useEffect(() => {
        if (years.length > 0 && counts.length > 0) {
            setData({
                labels: years,
                datasets: [
                    {
                        label: strings.year,
                        data: counts,
                        backgroundColor: counts.map(() =>
                            getRandomColor(1398, 1410)
                        ),
                    },
                ],
            });
        }
    }, [years, counts]);

    const getRandomColor = (min, max) => {
        return YEAR_COLORS[
            `YEAR_${Math.floor(Math.random() * (max - min) + min)}`
        ];
    };

    return (
        <BlankPage pageUtils={pageUtils}>
            <div className="section d-flex-wrap fix-mr15">
                {data?.labels && <Bar options={options} data={data} />}
            </div>
        </BlankPage>
    );
};

export default Dashboard;
