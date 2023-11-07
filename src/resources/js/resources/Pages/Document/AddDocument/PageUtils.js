import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Document as Entity, Settings } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addDocumentSchema as schema } from "../../../validations";
import { addDocumentPage as strings } from "../../../../constants/strings/fa";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../../state/page/pageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Documents", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/documents`;
        this.initialPageProps = {
            year: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.getAddProps();
    }

    async getAddProps() {
        try {
            this.dispatch(setLoadingAction(true));
            const settings = new Settings();
            const result = await settings.getCurrentYear();
            if (result) {
                this.dispatch(setPagePropsAction({ year: result.year }));
            }
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async onSubmit(data) {
        const promise = this.entity.store(
            `${this.pageState.props.year}/${data.documentNo}`,
            data.paymentNo,
            data.paymentDate?.replaceAll("/", ""),
            data.owner,
            data.description
        );
        super.onModifySubmit(promise);
    }
}
