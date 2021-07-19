import { matchSorter } from 'match-sorter';
import LanguagesJSON from './LanguagesData.json';

const Languages = {
    list: LanguagesJSON,
    searchByPartial: function(partial) {
        let matches = matchSorter(this.list, partial, { keys: ['name'.toLowerCase(), 'aliases.*'.toLowerCase()] });
    
        if (matches.length > 5) {
            matches.splice(5);
        }

        return matches;
    },
    getColor: function(language) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name.toLowerCase() === language.toLowerCase()) {
                return this.list[i].color;
            }
        } 
        return null;
    },
};

export default Languages;
