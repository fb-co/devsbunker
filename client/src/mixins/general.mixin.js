/* General Properties that are shared between components.
   In this case the darkTheme property, useful for example
   to change pictures and logos based on the theme. 
*/
const GeneralProperties = {
    data() {
        return {
            darkTheme: localStorage.getItem("theme") === "dark-theme" ? true : false,
        };
    },
};

export default GeneralProperties;