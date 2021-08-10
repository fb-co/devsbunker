<template>
    <div class="list_container">
        <div 
            v-for="(user, index) in followingList" 
            :key="index" 
            class="user_card_container"
            @click="$router.push({ path: `/user/${user}` })" 
        >
            <ProfilePicture :username="user" wrapperSize="60px" style="margin: 0 auto;"/>
            <p>{{ user }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    data() {
        return {
            followingList: this.$store.getters.following_list,
        }
    },
    components: {
        ProfilePicture,
    }
}
</script>

<style scoped>
.list_container {
    display: flex;
    flex-direction: row;
    max-width: 95vw;
    margin-left: 5vw;
    overflow-x: auto;
}
.user_card_container {
    display: flex;
    flex-direction: column;
    min-width: 90px;
    max-width: 90px;
    margin-right: 2px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.user_card_container p {
    font-size: 13px;
    color: var(--soft-text);
    margin-top: 10px;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
}

 /* Hide scrollbar for Chrome, Safari and Opera */
.list_container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.list_container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 
</style>
