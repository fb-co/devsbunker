/*
    This is the template for the settings tree. 
    If we plan on adding things dynamically in this template then
    we might use a Graph. If not then a simple Hash Table (object)
    does the job.

    Every option is represented as a node with an array of
    subnodes (sub options).
*/
const Settings = {
    'Account': {
        icon: require('../assets/icons/user.svg'),
        sub_elements: ['Activity', 'Switch to premium account']
    }, 
    'Appearance': {
        icon: require('../assets/icons/appearance.svg'),
        sub_elements: ['Theme']
    },
    'Privacy': {
        icon: require('../assets/icons/lock.svg'),
        sub_elements: ['Show followers'],
    }
}

export default Settings;