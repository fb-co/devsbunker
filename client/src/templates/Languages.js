const Languages = {
    searchByPartial: function(partial) {
        let matches = [];

        this.list.forEach(lang => {
            if (lang.name.toLocaleLowerCase().includes(partial.toLowerCase())) {
                matches.push(lang);
            }
        });

        return matches;
    },
    // returns boolean on whether 'tag' is contained in the list
    check: function(tag) {
        let all_tags = this.getList(true);

        return all_tags.includes(tag);
    },  
    getList: function(justNames) {
        if (justNames) {
            let lang_list = [];

            this.list.forEach(lang => {
                lang_list.push(lang.name);
            })

            return lang_list;
        } else {
            return this.list;
        }
    },
    getColor: function(language) {        
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].name.toLowerCase() == language.toLowerCase()) {
                return this.list[i].color;
            }   
        }
    },
    list: [
        {
            name: "Python",
            color: "#218a3d"
        },
        {
            name: "Javascript",
            color: "#b32020"
        },
        {
            name: "C++",
            color: "#2d3291"
        },
        {
            name: "C",
            color: "#627cf0"
        },
        {
            name: "C#",
            color: "#62bef0"
        },
        {
            name: "Kotlin",
            color: "#f7f05e"
        },
        {
            name: "Java",
            color: "#e36720"
        },
        {
            name: "HTML",
            color: "#42ad62"
        },
        {
            name: "CSS",
            color: "#9d42ad"
        },
        {
            name: "SQL",
            color: "#e6be49"
        },
        {
            name: "PHP",
            color: "#e5eb42" 
        },
        {
            name: "Swift",
            color: "#5ae0e0"
        },
        {
            name: "Objective C",
            color: "#734dd1"
        },
        {
            name: "Julia",
            color: "#fc88b9"
        },
        {
            name: "Rust",
            color: "#d98d45"
        },
        {
            name: "Bash",
            color: "#e00404"
        },
        {
            name: "Haskell",
            color: "#a7eb42"
        },
        {
            name: "Unity",
            color: "#039dfc"
        }, 
        {
            name: "3D Modeling",
            color: "#f59342"
        }, 
        {
            name: "Art",
            color: "#f51414"
        }, 
        {
            name: "Unreal",
            color: "#5014f5"
        },
        {
            name: "Matlab",
            color: "#bababa"
        },
        {
            name: "Go",
            color: "#038c1c"
        }
    ]
};

export default Languages;
