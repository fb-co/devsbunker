<template>
    <div @click="$router.push('/user/' + username)" class="second_auth_container">
        <ProfilePicture :username="username" wrapperSize="60px" />
        <div class="text_container vertical_flex_center">
            <p>{{ username }}</p>
        </div>
    </div>
</template>

<script>
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    components: {
        ProfilePicture
    },
    props: {
        username: String
    }
}
</script>

<style scoped>
    .second_auth_container {
        padding: 10px 20px 10px 20px;
        width: 400px;
        display: flex;
        cursor: pointer;
        border-radius: 10px;
        background-color: var(--secondary-color);
        border: 1px solid transparent;
        box-shadow: 0px 0px 5px var(--drop-shadow);
    }
    .second_auth_container:hover {
        background-color: var(--secondary-color);
        border: 1px solid var(--accent);
    }
    .text_container {
        padding-left: 20px;
        flex-grow: 1;
        overflow: hidden;
    }
    .text_container p {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>