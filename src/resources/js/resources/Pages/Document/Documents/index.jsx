import React from "react";
import { useSelector } from "react-redux";

import {
    DocumentFilesModal,
    ListPage,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import {
    documentsPage as strings,
    general,
} from "../../../../constants/strings/fa";
import { USER_ROLES } from "../../../../constants";

const Documents = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount =
        userState?.user?.role === USER_ROLES.ADMINISTRATOR ? 6 : 5;
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th style={{ width: "100px" }}>{strings.documentNo}</th>
            <th style={{ width: "100px" }}>{strings.paymentNo}</th>
            <th style={{ width: "100px" }}>{strings.paymentDate}</th>
            <th>{strings.owner}</th>
            <th style={{ width: "100px" }}>{strings.createdAt}</th>
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <th style={{ width: "100px" }}>{general.actions}</th>
            )}
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td>{item.documentNo}</td>
                    <td>{item.paymentNo ?? "-"}</td>
                    <td>{item.paymentDate ?? "-"}</td>
                    <td>{item.owner}</td>
                    <td>{item.createdAtFa}</td>
                    <td>
                        {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                            <button
                                type="button"
                                className="btn btn-primary mx-5"
                                onClick={() => pageUtils.onEdit(item)}
                                title={general.edit}
                                disabled={layoutState?.loading}
                            >
                                {general.edit}
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary mx-5"
                            onClick={(e) =>
                                pageUtils.showDocumentFilesModal(e, item)
                            }
                            title={general.edit}
                            disabled={layoutState?.loading}
                        >
                            {general.edit}
                        </button>
                    </td>
                </tr>
            </React.Fragment>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={userState?.user?.role === USER_ROLES.ADMINISTRATOR}
        >
            <DocumentFilesModal />
        </ListPage>
    );
};

export default Documents;
