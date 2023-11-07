import { validation as strings } from "../../../constants/strings/fa";
import utils from "../../../utils/Utils";

const fileValidator = (
  schema,
  field,
  max = null,
  extensions = null,
  required = true
) => {
  schema = schema
    .test(
      "required",
      strings.requiredMessage.replace(":field", field),
      (file) => {
        if (!file || file.size === 0) {
          if (!required) {
            return true;
          }
          return false;
        }
        return true;
      }
    )
    .test(
      "fileSize",
      strings.fileMaxSizeMessage.replace(":field", field),
      (file) => {
        if (file?.size < max) {
          return true;
        }
        return false;
      }
    )
    .test("fileType", strings.fileTypeMessage, (file) => {
      if (!extensions || extensions?.length === 0) {
        return true;
      }
      try {
        if (extensions.includes(utils.getExtension(file?.name)[0])) {
          return true;
        }
        return false;
      } catch {}
      return false;
    });
  return schema;
};

export default fileValidator;
