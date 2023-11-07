import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Settings as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editSettingsSchema as schema } from "../../../validations";
import { editSettingsPage as strings } from "../../../../constants/strings/fa";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Settings", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/settings/edit`;
    }

    onLoad() {
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    async fillForm() {
        try {
            this.callbackUrl = `${BASE_PATH}`;
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem();
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem() {
        return await this.entity.get();
    }

    handleFetchResult(result) {
        this.useForm.setValue("companyName", result.item.companyName);
        this.useForm.setValue("serialNo", result.item.serialNo);
        this.useForm.setValue("registryBookNo", result.item.registryBookNo);
        this.useForm.setValue("registerNo", result.item.registerNo);
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            data.companyName,
            data.serialNo,
            data.registryBookNo,
            data.registerNo
        );
        super.onSelfSubmit(promise);
    }
}
