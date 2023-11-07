import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputTextAreaColumn,
    InputRow,
    InputDatePickerColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";

const EditDocument = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputRow>
                <InputTextColumn
                    field="documentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                    prefix={`${
                        pageUtils?.pageState?.props?.year
                            ? pageUtils.pageState.props.year
                            : ""
                    }/`}
                />
                <InputTextColumn
                    field="paymentNo"
                    inputStyle={{ textAlign: "left", direction: "ltr" }}
                    fullRow={false}
                    showLabel
                />
                <InputDatePickerColumn
                    field="paymentDate"
                    showLabel
                    fullRow={false}
                />
                <InputTextColumn field="owner" showLabel fullRow={false} />
            </InputRow>
            <InputTextAreaColumn field="description" showLabel />
        </FormPage>
    );
};

export default EditDocument;
