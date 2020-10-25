<template>
    <div class="new_post_container">
        <div class="header">
            <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <p>New Post</p>
        </div>
        <GeneralInput class="field" label="Post Title" />

        <GeneralInput class="field" label="Post Description" />
    </div>
</template>

<script>
import GeneralInput from "../global/GeneralInput.vue";

export default {
    methods: {
        close() {
            this.$parent.close();
        }
    },
    components: {
        GeneralInput
    }
}
</script>

<style scoped>
    .new_post_container {
        display: flex;
        flex-direction: column;
        width: 95%;
        height: 100vh;
        border-radius: 25px;
        margin: 0 auto;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
        display: flex;
        flex-direction: row;
        padding: 35px;
        margin-bottom: 30px;
    }
    .header > svg:hover {
        stroke-width: 2.5px;
    }
    .header > p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        font-weight: bold;
        color: var(--main-font-color);
        transform: translateX(-14px);
    }
    .field {
        margin-bottom: 50px;
    }
</style>