<template>
    <div class="main_container">
        <div class="top_container">
            <div class="icons_container">
                <div class="icon_box" style="margin-bottom: 10px;">
                    <svg width="33" height="33" viewBox="0 0 16 16" class="bi bi-heart" fill="#eb4034" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                        />
                    </svg>
                </div>
                <div class="icon_box">
                    <svg
                        @click.stop="savePost(projectData.id)"
                        v-if="!projectData.isSaved"
                        width="25"
                        height="25"
                        stroke-width="0.7"
                        stroke="var(--soft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        />
                    </svg>
                </div>
            </div>
            <div class="main_text_container">
                <p class="title">{{ projectData.title }}</p>
                <p class="description">{{ projectData.description }}</p>
                <DynamicPicture class="thumbnail" :image_link="projectData.thumbnail" />
            </div>
        </div>
        <div class="seperator_line" />
        <div class="bottom_container">
            <ProfilePicture :username="projectData.author" wrapperSize="30px" class="author_pfp" />
            <p class="by">by:</p>
            <p class="author">{{ projectData.author }}</p>
        </div>
    </div>
</template>

<script>
import DynamicPicture from "@/components/DynamicPicture.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    props: {
        projectData: Object,
    },
    components: {
        DynamicPicture,
        ProfilePicture,
    },
};
</script>

<style scoped>
.main_container {
    padding-top: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 20px;
    width: 510px;
    min-height: 520px;

    /* version 1 */
    background-color: #202020;
    border: 1px solid #343536;

    /* version 2 */
    /* background-color: var(--secondary-color); */
}

.main_container:hover {
    border: 1px solid #545555;
}

.top_container {
    display: flex;
    flex-direction: row;
    padding: 10px;
}
.icons_container {
    width: 50px;
    height: 80px;
    display: flex;
    flex-direction: column;
}
.icon_box {
    width: 100%;
    cursor: pointer;
}
.main_text_container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%; /* Delete this after */
    margin-left: 15px;
}
.title {
    font-weight: 800;
    /* padding: 5px 10px 5px 10px; */

    text-align: left;
    font-size: 32px;

    /* fix me */
    margin-top: -5.5px;
    margin-left: 10px;
}
.description {
    color: var(--soft-text);
    text-align: left;
    padding: 25px 10px 20px 10px;
}
.thumbnail {
    width: 380px;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    margin: 10px;
}
.seperator_line {
    width: 90%;
    height: 2px;
    margin: auto;
    margin-top: 20px;
    background-color: #343536;
}
.bottom_container {
    display: flex;
    flex-direction: row;
    width: 100%;

    margin-top: 10px;
}
.author_pfp {
    margin: 10px 10px 10px 20px;
}
.author {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
}
.by {
    color: var(--soft-text);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 10px;
}
</style>
