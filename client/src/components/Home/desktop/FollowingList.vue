<template>
    <div class="following_list_container">
        <p class="title">Following</p>
        
        <div v-if="following_list.length > 0">
            <div class="following_list">
                <div 
                    v-for="(person, index) in show_list" 
                    :key="index" 
                    @click="$router.push({ path: `/user/${person}` })" 
                    class="following_card"
                >
                    <ProfilePicture :username="person" wrapperSize="30px" />
                    <p>{{ person }}</p>
                </div>
            </div>
            <div v-if="isMore" @click="showMore()" class="show_more">
                <div class="vertical_flex_center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
                <p>Show More</p>
            </div>
            <div v-if="showLess" @click="hideLess()" class="show_more">
                <div class="vertical_flex_center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-up" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="6 15 12 9 18 15" />
                    </svg>
                </div>
                <p>Show Less</p>
            </div>
        </div>
        <p v-else class="no_following">None</p>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    data() {
        return {
            following_list: this.$store.getters.following_list,
            show_list: undefined,
            isMore: true,
            showLess: false,
            initialShowAmt: 15,
        }
    },
    created() {
        this.show_list = this.following_list.slice(0, this.initialShowAmt);
        this.isMore = this.following_list.length > this.initialShowAmt;
    },
    components: {
        ProfilePicture,
    },
    methods: {
        showMore() {
            this.show_list = this.following_list;
            this.isMore = false;
            this.showLess = true;
        },
        hideLess() {
            this.show_list = this.following_list.slice(0, this.initialShowAmt);
            this.isMore = true;
            this.showLess = false;
        }
    }
}
</script>

<style scoped>
.following_list_container {
    width: 100%;
    height: 400px;
}
.title {
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    padding-left: 15%;
    margin-bottom: 20px;
}
.following_card {
    display: flex;
    flex-direction: row;
    padding: 5px 10px 5px 30px;
    cursor: pointer;
}
.following_card:hover {
    background-color: var(--secondary-color);
}
.following_card p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    font-size: 13px;
}
.no_following {
    text-align: left;
    padding-left: 15%;
    color: var(--soft-text);
}
.show_more {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-right: 40px;
    cursor: pointer;
}
.show_more:hover {
    background-color: var(--secondary-color);
}
.show_more p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 15px;
}
</style>