<template>
    <div class="backdrop_container" ref="image_div" />
</template>

<script>
import GraphQLUserService from "@/services/graphql/gql.user.service.js";

export default {
    data() {
        return {
            image_link: undefined,
            default_image: undefined,
            yourPfp: false,
        };
    },
    props: {
        username: String,
    },
    created() {
        this.fetchImageLink();
    },
    mounted() {
        if (!this.default_image) {
            this.$refs.image_div.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) ), url(${this.image_link})`;
        } else {
            this.$refs.image_div.style.backgroundImage = "linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5) )";
            this.$refs.image_div.style.backgroundColor = "var(--accent)";
        }
    },
    computed: {
        yourPfpLink() {
            return this.$store.getters.profile_pic;
        },
    },
    watch: {
        yourPfpLink(newLink) {
            if (this.username == this.$store.getters.username) {
                this.image_link = newLink;

                // default pic could be stored in localstorage
                if (newLink === "profile_pic_placeholder.png") {
                    this.default_image = true;
                } else {
                    this.default_image = false;
                }
            }
        },
    },
    methods: {
        fetchImageLink() {
            const callAPI = () => {
                GraphQLUserService.fetchUserDetails(this.username, ["profile_pic"]).then((obj) => {
                    if (obj.data.user.profile_pic) {
                        if (obj.data.user.profile_pic === "profile_pic_placeholder.png") {
                            this.default_image = true;
                            this.image_link = obj.data.user.profile_pic;
                        } else {
                            this.default_image = false;
                            if (/http/.test(obj.data.user.profile_pic)) {
                                this.image_link = obj.data.user.profile_pic;
                            } else {
                                this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                            }
                        }
                        localStorage.setItem("profile_pic_link", this.image_link);
                        this.$store.dispatch("check_and_cache_pfp"); // cache what is in the localstorage
                    } else {
                        this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong while fetching user details" });
                    }
                });
            };
            if (this.username != this.$store.getters.username) {
                const link = this.$store.getters.getPfpLink(this.username);

                if (link) {
                    if (link === "profile_pic_placeholder.png") {
                        this.default_image = true;
                    } else {
                        this.default_image = false;
                    }
                    this.image_link = link;
                } else {
                    GraphQLUserService.fetchUserDetails(this.username, ["profile_pic"]).then((obj) => {
                        if (obj.data.user.profile_pic) {
                            if (obj.data.user.profile_pic === "profile_pic_placeholder.png") {
                                this.default_image = true;
                                this.image_link = obj.data.user.profile_pic;
                            } else {
                                this.default_image = false;

                                if (/http/.test(obj.data.user.profile_pic)) {
                                    this.image_link = obj.data.user.profile_pic;
                                } else {
                                    this.image_link = `${process.env.VUE_APP_PROFILE_PICTURES}${obj.data.user.profile_pic}`;
                                }
                            }
                            this.$store.commit("cachePfpLink", { username: this.username, link: this.image_link });
                        } else {
                            this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong while fetching user details" });
                        }
                    });
                }
            } else {
                const link = this.$store.getters.profile_pic;

                if (link) {
                    const check = link.split("/");
                    if (check[check.length - 1] != "null") {
                        if (link == "profile_pic_placeholder.png") {
                            this.default_image = true;
                        } else {
                            this.default_image = false;
                        }
                        this.image_link = link;
                    } else {
                        callAPI();
                    }
                } else {
                    // This is a fallback in case for some random reason the pfp wasent placed in the store (if everything goes right, it should never reach this point)
                    callAPI();
                }
            }
        },
    },
};
</script>

<style scoped>
.backdrop_container {
    width: 100vw;
    height: 300px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background-repeat: no-repeat;
}
</style>
