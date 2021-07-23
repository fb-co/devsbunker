import LanguagesList from "../languages/LanguagesData.json";

const Languages = {
    list: LanguageData,
    isValid: function(tag) {
        this.list.forEach(tag => {
            if (tag.name === tag) {
                return true;
            }
        });
        return false;
    }
};

export default Languages;
