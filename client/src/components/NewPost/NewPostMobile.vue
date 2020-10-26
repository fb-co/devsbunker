<template>
    <div class="new_post_container">
        <div class="header">
            <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <p>New Post</p>
        </div>
        <GeneralInput class="field" label="Post Title" />

        <GeneralInput class="field" label="Post Description" :isTextArea="true" />

        <div class="tag_container">
            <p>Add Collaborators</p>
            <div class="add_tags">
                <div class="tag">

                </div>   
                <div class="tag">

                </div> 
                <div class="tag">

                </div> 
                <div class="tag">

                </div>  
                <div class="tag">

                </div> 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_tag_symbol" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>

        <div class="tag_container">
            <p>Add Tags</p>
            <div class="add_tags">
                <div class="tag">

                </div>   
                <div class="tag">

                </div> 
                <div class="tag">

                </div> 
                <div class="tag">

                </div>  
                <div class="tag">

                </div> 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-plus add_tag_symbol" width="70" height="70" viewBox="0 0 24 24" stroke-width="0.4" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>
        </div>

        <div class="tag_container">
            <p style="margin-bottom: 25px;">Add Links</p>
            <div class="link">
                <p>github.com/bruh</p>
            </div>
        </div>

        <button class="create_post_button">Post</button>
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
        max-width: 450px;
        border-radius: 25px;
        margin: 0px auto 20px auto;
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
        margin: 0px auto 50px auto;
        max-width: 400px;
    }

    .tag_container {
        width: 90%;
        max-width: 400px;
        margin: 0px auto 50px auto;
        padding: 5px;
    }
    .tag_container > p {
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        color: var(--main-font-color);
    }
    .add_tags {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    .add_tag_symbol {
        margin: 5px;
    }
    .tag {
        margin: 5px;
        width: 75px;
        height: 75px;
        background-color: blue;
    }
    .link {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .link > p {
        text-align: left;
        font-size: 15px;
        font-weight: bold;
        color: var(--main-font-color);
    }

    .create_post_button {
        background-color: var(--main-btn-color);
        border: none;
        outline: none;
        border-radius: 5px;
        width: 125px;
        height: 40px;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        margin: 0px auto 40px auto;
        cursor: pointer;
    }

</style>