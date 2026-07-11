import cppHandler from "./handlers/cpp.handler.js";
import javaHandler from "./handlers/java.handler.js";
import pythonHandler from "./handlers/python.handler.js";

import { SUPPORTED_LANGUAGES } from "./constants.js";

const languageRegistry={
    [SUPPORTED_LANGUAGES.CPP]:cppHandler,
    [SUPPORTED_LANGUAGES.JAVA]:javaHandler,
    [SUPPORTED_LANGUAGES.PYTHON]:pythonHandler,
}
export default languageRegistry;