import React from "react";

import { BlankPage } from "../../components";
import { PageUtils } from "./PageUtils";

const Dashboard = () => {
    const pageUtils = new PageUtils();

    return (
        <BlankPage pageUtils={pageUtils}>
            <div className="section d-flex-wrap fix-mr15"></div>
        </BlankPage>
    );
};

export default Dashboard;
