import GraphQLService from "@/services/graphql.service";

const LogoutFunction = {
    methods: {
        async logout() {
            GraphQLService.logoutUser().then((response) => {
                if (response.errors) {
                    alert("Unable to logout");
                    console.error(response.errors);
                } else {
                    // Flush local logged in user data
                    this.$store.commit("refreshAccessToken", null);
                    this.$store.commit("changeLoggedInState", false);
                    this.$store.commit("changeUsername", null);

                    // get rid of any localstorage cache
                    localStorage.removeItem("profile_pic_link");

                    // get rid of any user specific data in the store
                    this.$store.dispatch("flush_user_data");
                    this.$store.dispatch("flushPostCache");

                    this.$store.dispatch("alertUser", { title: "Success", type: "success", msg: "Successfully logged out" });

                    if (this.$route.path != "/") {
                        this.$router.push("/");
                    }
                }
            });
        },
    }
};

export default LogoutFunction;


/*  OLD LOGOUT FUNCTION

async logout() {
    const res = await GraphQLService.logoutUser();

    if (res.errors) {
        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Unable to logout" });
        console.error(res.errors);
    } else {
        if (this.$route.path != "/") {
            this.$router.push("/");
        }
    }
},
*/