<template>
    <div class="vertical_flex_center create_tag_container">
        <div v-if="tagType=='user'" class="tag_person" style="padding: 5px;">
            <div class="vertical_flex_center" style="height:100%;">
                <img src="@/assets/profilePlaceholder.png" alt="profile_pic" style="height: 70%;">
            </div>
            <p>{{ label }}</p>
        </div>
        <div v-else-if="tagType=='lang'" class="tag_lang">
            <p>{{ label }}</p>
        </div>
    </div>
</template>

<script>
//import Languages from "@/templates/Languages.js";

export default {
    props: {
        tagType: {
            type: String,
            default: 'lang'
        },
        label: {
            type: String,
        }
    }
}
</script>

<style scoped>
    .create_tag_container {
        margin: 5px;
        cursor: pointer;
    }
    .create_tag_container:hover > .tag_person {
        border: 1px solid var(--soft-text);
    }
    .tag_person {
        display: flex;
        flex-direction: row;
        height: 60px; 
        background-color: var(--main-color);
        border-radius: 7px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }
    .tag_person > p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        margin-right: 10px;
    }

    .tag_lang {
        cursor: default;
        border: 2px solid red;
        padding: 5px 10px 5px 10px;
        border-radius: 30px;
    }
</style>