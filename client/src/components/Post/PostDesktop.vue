<template>
    <div>
        <NavBar />
        <div class="main_container" v-if="projectData">
            <LeftContent />
            <div class="center_content">
                <div class="author_info_card" v-if="authorData">
                    <ProfilePicture :username="projectData.author" wrapperSize="200px" />
                    <div class="author_info_text">
                        <h2 id="author">
                            {{ projectData.author }}
                            <span>{{ projectData.createdAt }}</span>
                        </h2>
                        <p class="author_followerAmt">{{ authorData.followerAmt + (authorData.followerAmt == 1 ? " follower" : " follwers")}}</p>
                        <div style="flex-grow: 1;"></div> <!-- Placeholder -->
                        <div class="follow_btn_container">
                            <FollowButton :initialState="authorData.isFollowing" :username="projectData.author" />
                        </div>
                    </div>
                </div>
                <div class="tags_container">
                    <CreateTag v-for="tag in projectData.tags" :key="tag" :label="tag" tagType="lang" />
                </div>
                
                <!--<h3 id="tags">{{ projectData.tags }}</h3>-->
                <h1 id="title">{{ projectData.title }}</h1>

                <p id="description">
                    {{ projectData.description }} <br />
                    Et sed maxime maiores harum nulla et voluptatem expedita.
                    Laboriosam quia provident corporis cum doloremque esse non.
                    Facilis nisi omnis id voluptates natus. Eum distinctio
                    molestias sed aspernatur aut. Ea blanditiis ab aut quia hi
                </p>

                <div id="thumbnail">
                    here we should implement an image viewer like twitter: small
                    preview and if you click it expands full resolution --

                    I was actully thinking something more like a carousel, what do you think?
                    <img :src="thumbnail" alt="No Image" />
                </div>
            </div>

            <!-- at the moment im passing an empty array, we should avoid re-fetching the notification object tho (maybe we can put it in the store) -->
            <RightContent :notifications="notifications" />
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import ProfilePicture from "@/components/ProfilePicture.vue";
import CreateTag from "@/components/NewPost/CreateTag.vue";
import FollowButton from "@/components/FollowButton.vue";

import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

export default {
    props: {
        projectData: Object,
        authorData: Object,
        notifications: Array,
    },
    components: {
        RightContent,
        LeftContent,
        NavBar,
        ProfilePicture,
        CreateTag,
        FollowButton
    },
    data() {
        return {
            thumbnail: undefined,
        };
    },
    created() {
        this.thumbnail = `${process.env.VUE_APP_IMG_STATIC_ASSETS}/${this.projectData.images[0].dbname}`;
    },
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.center_content {
    width: 55%;
    margin: auto;
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/

    display: flex;
    flex-direction: column;
    flex-grow: 1;

    text-align: left;
    margin-top: 42px;
}

#title {
    font-size: 45px;
    font-weight: 700;
}

#author span {
    font-weight: 100;
    color: var(--soft-text);
    font-size: 20px;
}

#author {
    font-weight: 400;
    font-size: 25px;

    margin-bottom: 10px;
}

.tags_container {
    display: flex;
    margin-bottom: 20px;
}

#description {
    color: var(--soft-text);
    margin-top: 30px;
}

.author_info_card {
    max-width: 700px;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}
.author_info_text {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 25px;
    flex-grow: 1;
}
.author_followerAmt {
    color: var(--soft-text);
}
.follow_btn_container {
    text-align: right;
    width: 100%;
}
#thumbnail {
    width: 100%;
    height: 200px;

    margin-top: 70px;
}

#thumbnail img {
    width: 100%;
    height: 100%;
}
</style>
