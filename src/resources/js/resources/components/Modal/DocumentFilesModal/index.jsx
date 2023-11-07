import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { documentFilesModal as strings } from "../../../../constants/strings/fa";
import {
    Modal,
    Table,
    TableItems,
    CustomLink,
    InputTextColumn,
    InputFileColumn,
} from "../..";
import {
    addDocumentFileSchema,
    editDocumentFileSchema,
} from "../../../validations";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { DocumentFile as Entity } from "../../../../http/entities";
import { MODAL_RESULT } from "../../../../constants";

function DocumentFilesModal() {
    const layoutState = useSelector((state) => state.layoutReducer);
    const dispatch = useDispatch();
    const [modalResult, setModalResult] = useState(undefined);
    const [message, setMessage] = useState(null);
    const [items, setItems] = useState(null);
    const [isAdd, setIsAdd] = useState(true);
    const [form, setForm] = useState(null);
    const addForm = useForm({
        resolver: yupResolver(addDocumentFileSchema),
    });
    const editForm = useForm({
        resolver: yupResolver(editDocumentFileSchema),
    });
    const entity = new Entity();
    const columnsCount = 3;

    useEffect(() => {
        if (isAdd) {
            setForm(addForm);
        } else {
            setForm(editForm);
        }
    }, [isAdd]);

    useEffect(() => {
        if (
            typeof form?.formState?.errors === "object" &&
            form?.formState?.errors
        ) {
            const hasKeys = !!Object.keys(form?.formState?.errors).length;
            if (hasKeys) {
                setMessage(
                    form?.formState?.errors[
                        Object.keys(form?.formState?.errors)[0]
                    ].message
                );
                document
                    .querySelector("#documentFilesModal")
                    .querySelector(".modal-main")
                    .firstChild.scrollTo(0, 0);
            }
        }
    }, [form?.formState?.errors]);

    useEffect(() => {
        if (modalResult === MODAL_RESULT.OK) {
            if (
                typeof layoutState?.shownModal?.props?.onSubmit === "function"
            ) {
                layoutState?.shownModal?.props?.onSubmit(true);
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
        fillForm();
    }, []);

    const onClose = () => {
        document
            .querySelector("#documentFilesModal")
            .querySelector(".modal-main")
            .firstChild.scrollTo(0, 0);
    };

    const fillForm = async () => {
        dispatch(setLoadingAction(true));
        dispatch(clearMessageAction());
        const result = await entity.getAll(
            layoutState?.shownModal?.props?.document?.id
        );
        dispatch(setLoadingAction(false));
        if (result === null) {
            setItems(null);
        } else {
            setItems(result.items);
        }
    };

    const onSelect = async () => {};

    const renderHeader = () => (
        <tr>
            <th>{strings.nameDocumentFilesModal}</th>
            <th style={{ maxWidth: "100px" }}>
                {strings.descriptionDocumentFilesModal}
            </th>
            <th style={{ maxWidth: "100px" }}></th>
        </tr>
    );

    const renderItems = () => {
        const children = items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td>
                        <CustomLink onClick={() => onSelect(item)}>
                            {item.name}
                        </CustomLink>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    return (
        <Modal
            id="documentFilesModal"
            title={`${strings._title} - [ ${layoutState?.shownModal?.props?.document?.documentNo} - ${layoutState?.shownModal?.props?.document?.owner} ]`}
            onClose={onClose}
            modalResult={modalResult}
            fullWidth={true}
        >
            <h4 className="text">{strings._subTitle}</h4>
            <div className="block">
                <Table renderHeader={renderHeader} renderItems={renderItems} />
            </div>
            <div className="block-border"></div>
            {isAdd && (
                <div className="mt-30">
                    <h4 className="text">{strings.addDocumentFile}</h4>
                    <InputFileColumn
                        field="fileDocumentFilesModal"
                        strings={strings}
                        accept=".jpg, .jpeg, .png, .tiff, .pdf, .doc, .docx"
                        containerStyle={{
                            maxWidth: "inherit",
                            marginBottom: "0",
                        }}
                    />
                    <InputTextColumn
                        field="descriptionDocumentFilesModal"
                        strings={strings}
                    />
                    <div className="btns d-flex mt-10">
                        <button
                            className="btn btn-success mx-rdir-10"
                            type="button"
                            disabled={layoutState?.loading}
                            title={strings.addDocumentFile}
                        >
                            {strings.addDocumentFile}
                        </button>
                    </div>
                </div>
            )}
            {!isAdd && (
                <div className="mt-30">
                    <h4 className="text">{strings.editDocumentFile}</h4>
                    <InputTextColumn
                        field="descriptionDocumentFilesModal"
                        strings={strings}
                    />
                    <div className="btns d-flex mt-10">
                        <button
                            className="btn btn-primary mx-rdir-10"
                            type="button"
                            disabled={layoutState?.loading}
                            title={strings.editDocumentFile}
                        >
                            {strings.editDocumentFile}
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default DocumentFilesModal;
