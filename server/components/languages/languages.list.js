import { createRequire } from "module";
const require = createRequire(import.meta.url);
const LanguageData = require("../languages/LanguagesData.json");

const Languages = {
    list: LanguageData,
    isValid: function(tag) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name === tag) {
                return true;
            }
        }
    }
};

export default Languages;
