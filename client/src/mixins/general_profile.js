/*
    This mixin is for the login on the two profile pages general tab

    This mixin REQUIRES the parent component to have a prop called userObject, which is the object containing at least the following information:
     - desscription
     - email

*/

import GraphQLUserService from "@/services/graphql/gql.user.service.js";

const GeneralProfile = {
    data() {
        return {
            editing: false,
            savingResults: false,
        };
    },
    methods: {
        editFields() {
            this.editing = true;
        },
        cancelFieldsEdit() {
            this.editing = false;
        },
        cancelFields() {
            this.cancelFieldsEdit();
        },
        saveFields() {
            const newDesc = this.$refs.edit_desc.value;
            let fields = [];

            if (newDesc != this.userObject.desc) {
                fields.push({
                    field: "desc",
                    newValue: newDesc,
                });
            }

            if (fields.length > 0) {
                // set loading flag to true
                this.savingResults = true;

                GraphQLUserService.updateUserDetails(this.$store.getters.accessToken, fields).then((res) => {
                    // set loading flag to false
                    this.savingResults = false;
                    if (!res.errors) {
                        const data = res.data.updateUserDetails.changedData;

                        // hot reload the new data
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].field === "desc") {
                                this.userObject.desc = data[i].newValue;
                            }
                        }

                        // add success feedback here
                        this.$store.dispatch("alertUser", { msg: "Updated Details", type: "success", title: "Success" });

                        this.cancelFieldsEdit();
                    } else {
                        this.$store.dispatch("alertUser", { msg: "Something went wrong", type: "error", title: "Error" });
                    }
                });
            } else {
                this.cancelFieldsEdit();
            }
        },
    },
};

export default GeneralProfile;
