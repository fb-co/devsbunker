/*
    This is the template for the settings tree. 
    If we plan on adding things dynamically in this template then
    we might use a Graph. If not then a simple Hash Table (object)
    does the job.

    Every option is represented as a node with an array of
    subnodes (sub options).
*/
const Settings = {
    'Appearance': ['Theme'],
    'Account': ['Activity', 'Switch to premium account'],
    'Privacy': ['Show followers'],
    'About': ['Version'],
}