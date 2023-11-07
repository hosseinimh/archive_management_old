import * as yup from "yup";

import { nameValidator, stringValidator } from "../CommonValidators";
import { editSettingsPage as strings } from "../../../constants/strings/fa";

const editSettingsSchema = yup.object().shape({
    companyName: nameValidator(yup.string(), strings.companyName, 2, 50),
    serialNo: stringValidator(yup.string(), strings.serialNo, 1, 50),
    registryBookNo: stringValidator(
        yup.string(),
        strings.registryBookNo,
        1,
        50
    ),
    registerNo: stringValidator(yup.string(), strings.registerNo, 1, 50),
});

export default editSettingsSchema;
