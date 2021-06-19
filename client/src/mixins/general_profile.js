/*
    This mixin is for the login on the two profile pages general tab

    This mixin REQUIRES the parent component to have a prop called userObject, which is the object containing at least the following information:
     - desscription
     - email

*/

import GraphQLService from "@/services/graphql.service";

const GeneralProfile = {
    data() {
        return {
            editing: false,
            invalidEmail: false,
        }
    },
    methods: {
        editFields() {
            this.editing = true;
        },
        cancelFieldsEdit() {
            this.editing = false;
        },
        cancelFields() {
            this.emailInInput = this.userObject.email;
            this.invalidEmail = false;
            this.cancelFieldsEdit();
        },
        saveFields() {
            const newDesc = this.$refs.edit_desc.value;
            const newEmail = this.$refs.edit_email.value;
            let fields = [];

            if (newDesc != this.userObject.desc) {
                fields.push({
                    field: "desc",
                    newValue: newDesc
                });
            }
            if (newEmail != this.userObject.email) {
                fields.push({
                    field: "email",
                    newValue: newEmail
                });
            } else {
                this.emailInInput = newEmail; // override vue's value binding
                this.invalidEmail = false;
            }

            if (fields.length > 0) {
                GraphQLService.updateUserDetails(this.$store.getters.accessToken, fields).then((res) => {
                    if (!res.errors) {
                        const data = res.data.updateUserDetails.changedData;
                        
                        // hot reload the new data
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].field === "email") {
                                this.userObject.email = data[i].newValue;
                            } else if (data[i].field === "desc") {
                                this.userObject.desc = data[i].newValue;
                            }
                        }

                        // add success feedback here
                        this.$store.dispatch("alertUser", { msg: "Updated Details", type: "success", title: "Success" });

                        this.invalidEmail = false;
                        this.emailInInput = newEmail; // override vue's value binding

                        this.cancelFieldsEdit();
                    } else {
                        const editedValue = newEmail;

                        // todo: make better invalid field or error handling
                        for (let i = 0; i < res.errors.length; i++) {
                            if (res.errors[i].message === "Invalid email") {
                                this.invalidEmail = true;
                            }
                        }

                        this.emailInInput = editedValue; // override vue's value binding

                        // add success feedback here
                        if (this.invalidEmail) {
                            this.$store.dispatch("alertUser", { msg: "Invalid email", type: "error", title: "Error" });
                        } else {
                            this.$store.dispatch("alertUser", { msg: "Something went wrong updating details.", type: "error", title: "Error" });
                        }
                    }
                });
            } else {
                this.cancelFieldsEdit();
            }
        }
    },
};

export default GeneralProfile;