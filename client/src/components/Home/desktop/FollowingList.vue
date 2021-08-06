<template>
    <div class="following_list_container">
        <p class="title">Following</p>

        <div class="following_list">
            <div 
                v-for="(person, index) in following_list" 
                :key="index" 
                @click="$router.push({ path: `/user/${person}` })" 
                class="following_card"
            >
                <ProfilePicture :username="person" wrapperSize="30px" />
                <p>{{ person }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    data() {
        return {
            following_list: this.$store.getters.following_list,
        }
    },
    components: {
        ProfilePicture,
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
</style>