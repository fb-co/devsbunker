<template>
    <div
        @click="
            $router.push({
                path: `/post/${projectData.id}`,
                query: { projectData: projectData },
            })
        "
        id="card_container"
        class="main_container no_select"
        :style="style"
    >
        <div class="card_text_container">
            <div class="author_container">
                <router-link
                    @click.native.stop=""
                    :to="'user/' + projectData.author"
                    class="author card_text"
                    >{{ projectData.author }}</router-link
                >
            </div>
            <p class="proj_name card_text">{{ projectData.title }}</p>
            <p class="proj_desc card_text">{{ descToShow }}</p>
            <div style="flex-grow: 1"></div>
            <div class="likes_container">
                <!--Not filled icon -->
                <div v-if="hasLikeBtn" @click.stop="likePost(projectData.id)">
                    <div v-if="!projectData.isLiked">
                        <svg
                            @mouseover="likeIsActive = true"
                            v-if="!likeIsActive"
                            width="17"
                            height="17"
                            viewBox="0 0 16 16"
                            class="bi bi-heart"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                            />
                        </svg>

                        <!-- Filled icon -->
                        <svg
                            @mouseleave="likeIsActive = false"
                            v-else
                            width="17"
                            height="17"
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                        </svg>
                    </div>
                    <div v-else>
                        <svg
                            @click.stop="unlikePost(projectData.id)"
                            width="17"
                            height="17"
                            viewBox="0 0 16 16"
                            class="bi bi-heart-fill"
                            fill="#eb4034"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                        </svg>
                    </div>
                </div>
                <svg
                    v-else
                    width="23"
                    height="23"
                    viewBox="0 0 16 16"
                    class="bi bi-heart-fill"
                    fill="#eb4034"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                </svg>

                <div class="vertical_flex_center">
                    <p class="likes card_text">{{ projectData.likeAmt }}</p>
                </div>

                <div class="save_post_container">
                    <svg
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        width="18"
                        height="18"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        />
                    </svg>
                    <svg
                        @click.stop="unsavePost(projectData.id)"
                        v-else
                        width="18"
                        height="18"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark-fill save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z"
                        />
                    </svg>
                </div>

                <div class="vertical_flex_center">
                    <p
                        class="price_text"
                        v-if="
                            projectData.price != 0 && projectData.price != null
                        "
                    >
                        | ${{ projectData.price }}
                    </p>
                </div>
                <div class="vertical_flex_center">
                    <p class="bunker_tag">{{ projectData.bunkerTag }}</p>
                </div>
            </div>
        </div>
        <div class="card_img_container">
            <DynamicPicture :image_link="getThumbnail()" class="card_img" />
        </div>
    </div>
</template>

<script>
import ProjectCardUtils from "@/mixins/project_card.mixin.js";
import DynamicPicture from "@/components/DynamicPicture.vue";

export default {
    props: {
        projectData: Object,
        hasLikeBtn: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String,
            default: "100%",
        },
    },
    methods: {
        getThumbnail() {
            if (this.projectData.images.length > 0) {
                return this.projectData.images[0].dbname;
            }
            return "../../../uploads/profile_pics/profilePlaceholder.png";
        },
    },
    mixins: [ProjectCardUtils],
    data() {
        return {
            likeIsActive: false,
            descToShow:
                this.projectData.description.length > 200
                    ? this.projectData.description
                          .substring(0, 200)
                          .substring(
                              0,
                              this.projectData.description
                                  .substring(0, 200)
                                  .lastIndexOf(" ")
                          ) + " ..."
                    : this.projectData.description,
        };
    },
    computed: {
        style() {
            return "width: " + this.width;
        },
    },
    components: {
        DynamicPicture,
    },
};
</script>

<style scoped>
#card_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    padding: 15px;
    background-color: var(--main-color);
    cursor: pointer;
    border: 2px solid transparent;
}
.main_container:hover {
    border: 2px solid grey !important;
}
.likeAmt {
    margin-left: 10px;
    font-weight: bold;
}
.card_text_container {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    width: 6%;
    flex-grow: 1;
}
.author_container {
    text-align: left;
}
.author {
    color: var(--soft-text);
    text-decoration: none;
}
.author:hover {
    text-decoration: underline;
}
.proj_name {
    font-weight: bold;
    font-size: 18px;
}
.proj_desc {
    margin-bottom: 10px;
    color: var(--soft-text);
    font-size: 11px;
}
.likes_container {
    display: flex;
    flex-direction: row;
    margin-top: 7px;
}
.likes {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 10px;
}
.price_text {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 5px;
}
.bunker_tag {
    color: var(--soft-text);
    font-size: 11px;
    margin-left: 10px;
}
.card_text {
    text-align: left;
}
.card_text_container p:not(:first-child) {
    margin-top: 7px;
}
.card_img_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 35%;
}
.card_img {
    width: 100%;
    border-radius: 5px;
}

.save_post_container {
    padding-left: 10px;
}

@media only screen and (max-width: 300px) {
    .card_text_container {
        width: 100%;
    }
    .card_img_container {
        display: none;
    }
}

@media only screen and (min-width: 1200px) {
    .author {
        font-size: 18px;
    }
    .proj_name {
        font-size: 25px;
    }
    .proj_desc {
        font-size: 16px;
    }

    .likes,
    .price_text,
    .bunker_tag {
        font-size: 15px;
    }
}
</style>