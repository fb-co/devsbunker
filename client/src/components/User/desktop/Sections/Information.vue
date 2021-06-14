<template>
    <div class="general_container" v-if="userObject">
        <p class="label">General</p>

        <ProfilePicture
            v-if="userObject"
            :username="userObject.username"
            :darkenOnHover="true"
            :forUpload="userObject.username === this.$store.getters.username"
            wrapperSize="300px"
            class="profile_pic"
        />

        <div class="desc_container" v-if="userObject.username === this.$store.getters.username">
            <p @click="editDesc()" ref="static_desc" class="desc">
                {{ userObject.desc }}
            </p>
            <!-- Conditionally render it or else you get errors in console as it tries to return the value before the promise is resolved (it will work fine tho) -->

            <!-- Its important that the SVG goes before the textarea -->
            <svg
                v-if="!isEditingDesc"
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-edit desc_edit_icon"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                stroke-width="0.7"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
            </svg>

            <textarea @blur="closeDescEditing()" maxlength="400" class="edit_desc" ref="edit_desc" />
        </div>

        <div style="flex-grow: 1;">
            <p v-if="userObject.username !== this.$store.getters.username" style="color: var(--main-font-color)">{{ userObject.desc }}</p>
        </div>
        <!--Placeholder-->

        <div v-if="userObject.username === this.$store.getters.username">
            <div class="input_container">
                <!--
                <div class="input_section">
                    <p class="input_label">Name</p>
                    <input ref="username_field" class="info_input" placeholder="" :value="$store.getters.username" />
                </div>
                -->
                <div class="input_section">
                    <p class="input_label">Email</p>
                    <input ref="email_field" class="info_input" placeholder="Email..." @input="editEmail()" />
                </div>
            </div>
            <button v-if="editsMade" @click="saveDetails()" class="save_button">Save</button>
            <div v-else style="height: 80px;" />
        </div>
    </div>
</template>

<script>
import GraphQLService from "@/services/graphql.service";
import ProfilePicture from "@/components/ProfilePicture.vue";
//import FileUploadService from "@/services/fileUpload.service.js";

export default {
    data() {
        return {
            userObject: this.userData,
            isExternal: false,
            isEditingDesc: false,
            editsMade: false,
        };
    },
    props: {
        userData: Object,
    },
    mounted() {
        this.isExternal = (this.userObject.username || "") != this.$store.getters.username;

        // populate the email field (dont use the :value binding!)
        this.$refs.email_field.value = this.userObject.email;
    },
    components: {
        ProfilePicture,
    },
    beforeRouteLeave(to, from, next) {
        this.closeDescEditing(); // in case they leave the page while they are editing the desc

        if (this.editsMade) {
            const answer = window.confirm("You have unsaved changes, are you sure you want to leave this page?");

            if (answer) {
                next();
            } else {
                next(false);
            }
        }
    },
    methods: {
        editDesc() {
            this.$refs.edit_desc.style.display = "flex";
            this.$refs.edit_desc.value = this.$refs.static_desc.innerText;
            this.$refs.edit_desc.focus();
            this.isEditingDesc = true;

            // hide the p tag
            const staticArea = this.$refs.static_desc;
            staticArea.style.display = "none";
        },
        editEmail() {
            if (this.$refs.email_field.value != this.userObject.email) {
                this.editsMade = true;
                this.editedEmail = true;
            }
        },
        closeDescEditing() {
            const textArea = this.$refs.edit_desc;
            const staticArea = this.$refs.static_desc;
            textArea.style.display = "none";
            staticArea.style.display = "flex";
            this.isEditingDesc = false;

            if (this.userObject.desc != textArea.value) {
                this.editsMade = true;
                this.editedDesc = true;
                this.$refs.static_desc.innerText = textArea.value; // set the static value to whatever changes were made
            }
        },
        async saveDesc() {
            const textArea = this.$refs.edit_desc;

            // prevent user queries if the description did not change
            if (this.userObject.desc != textArea.value) {
                // make sure its not empty
                if (textArea.value === null || textArea.value === "") {
                    textArea.value = "No Description";
                }

                this.userObject.desc = textArea.value;

                // limit the length
                if (this.userObject.desc.length > 400) {
                    this.userObject = this.userObject.substring(0, 397) + "...";
                }

                const response = await GraphQLService.updateUserDetails(this.$store.getters.accessToken, [{ field: "desc", newValue: textArea.value }]);

                if (response.data.updateUserDetails.message) {
                    const changedValue = response.data.updateUserDetails.changedData[0]; // this refrences zero because the updateUserDetails mutation has the possibility of returning more than one change
                    this.$refs.static_desc.innerText = changedValue.newValue;
                }
            }
        },
        async saveDetails() {
            let fields = [];

            if (this.$refs.email_field.value != this.userObject.email) {
                if (!/\S+@\S+\.\S+/.test(this.$refs.email_field.value)) {
                    alert("Please enter a valid email");
                    return;
                }

                fields.push({
                    field: "email",
                    newValue: this.$refs.email_field.value,
                });
            }

            if (this.$refs.static_desc.innerText != this.userObject.desc) {
                const descArea = this.$refs.static_desc;

                if (this.userObject.desc != descArea.innerText) {
                    this.userObject.desc = descArea.innerText;

                    // limit the length
                    if (this.userObject.desc.length > 400) {
                        this.userObject = this.userObject.substring(0, 397) + "...";
                    }

                    fields.push({
                        field: "desc",
                        newValue: this.userObject.desc,
                    });
                }
            }
            if (fields.length > 0) {
                GraphQLService.updateUserDetails(this.$store.getters.accessToken, fields).then((res) => {
                    console.log(res);
                    if (res.errors) {
                        alert(res.errors[0].message);
                    }
                });
            }
        },
    },
};
</script>

<style scoped>
.general_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.label {
    font-size: 25px;
    font-weight: bold;
    margin: 20px auto 20px auto;
}
.desc_edit_icon {
    display: none;
    position: absolute;
    right: -25px;
    bottom: -15px;
}
.desc_container {
    position: relative;
    cursor: text;
    width: 450px;
    margin: 40px auto 0px auto;
}
.profile_pic_container {
    position: relative;
}
.profile_pic {
    cursor: pointer;
    margin: 35px auto 10px auto;
}
.edit_desc {
    display: none;
    resize: none;
    border: 1px solid var(--soft-text);
    border-radius: 4px;
    width: 100%;
    height: 150px;
    padding: 7px;
    font-size: 15px;
    font-family: rubik;
}
.edit_desc:focus {
    outline: none;
    border: 2px solid var(--main-accent);
}
.desc {
    height: 100%;
    display: block;
    color: var(--soft-text);
}

.desc_container:hover > .desc_edit_icon {
    display: inline-block;
}
.input_container {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
}
.input_section {
    margin: 40px auto 40px auto;
}
.info_input {
    border: 1px solid var(--soft-text);
    padding: 5px 5px 5px 10px;
    border-radius: 3px;
}
.info_input:focus {
    outline: none;
    border: 1px solid var(--main-accent);
    box-shadow: 0px 4px 5px var(--main-accent);
}
.input_label {
    font-weight: bold;
    text-align: left;
    margin-bottom: 15px;
}
.save_button {
    background-color: var(--main-accent);
    border: none;
    outline: none;
    border-radius: 5px;
    width: 125px;
    height: 40px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    margin: 0px auto 40px auto;
    cursor: pointer;
}
.save_button:hover {
    box-shadow: 0px 4px 20px var(--main-accent);
}
</style>
