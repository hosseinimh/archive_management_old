import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { InputRow, InputSelectColumn, Modal } from "../..";
import { MODAL_RESULT } from "../../../../constants";
import { selectYearModal as strings } from "../../../../constants/strings/fa";
import { years } from "../../../../constants/lists";

function SelectYearModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const [modalResult, setModalResult] = useState(undefined);
    const form = useForm();

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true, {
                    year: form.getValues("selectSelectYearModal"),
                });
            }
        } else if (modalResult === MODAL_RESULT.CANCEL) {
            if (
                typeof layoutState?.shownModal?.props?.onCancel === "function"
            ) {
                layoutState?.shownModal?.props?.onCancel();
            }
        }
        setModalResult(undefined);
    }, [modalResult]);

    useEffect(() => {
        if (layoutState?.shownModal?.modal === "selectYearModal") {
            form.setValue("selectSelectYearModal", years[0].value);
        }
    }, [layoutState?.shownModal]);

    const renderFooter = () => {
        return (
            <div className="btns d-flex mtd-10">
                <button
                    className="btn btn-success"
                    type="button"
                    title={`${layoutState?.shownModal?.props?.submitTitle}`}
                    onClick={() => setModalResult(MODAL_RESULT.OK)}
                >
                    {layoutState?.shownModal?.props?.submitTitle}
                </button>
                <button
                    className="btn btn-border"
                    type="button"
                    title={`${layoutState?.shownModal?.props?.cancelTitle}`}
                    onClick={() => setModalResult(MODAL_RESULT.CANCEL)}
                >
                    {layoutState?.shownModal?.props?.cancelTitle}
                </button>
            </div>
        );
    };

    return (
        <Modal
            id="selectYearModal"
            title={strings.selectYearModalTitle}
            modalResult={modalResult}
            footer={renderFooter()}
        >
            <InputRow>
                <InputSelectColumn
                    field="selectSelectYearModal"
                    showLabel
                    useForm={form}
                    strings={strings}
                    items={years}
                    fullRow={false}
                />
                <div className="d-flex d-flex-column xs-grow-1">
                    <div className="input-text input-bg mb-0"></div>
                </div>
                <div className="d-flex d-flex-column xs-grow-1">
                    <div className="input-text input-bg mb-0"></div>
                </div>
            </InputRow>
        </Modal>
    );
}

export default SelectYearModal;
