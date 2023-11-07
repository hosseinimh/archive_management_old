import React from "react";

import { BlankPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const EditSettings = () => {
    const pageUtils = new PageUtils();

    return <BlankPage pageUtils={pageUtils}></BlankPage>;
};

export default EditSettings;
