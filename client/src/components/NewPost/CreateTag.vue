<template>
    <div class="vertical_flex_center create_tag_container" :style="cssProps">
        <div v-if="tagType == 'user'" class="tag_person" style="padding: 5px;">
            <div class="vertical_flex_center" style="height:100%;">
                <ProfilePicture :username="label" wrapperSize="50px" />
            </div>
            <p class="pfp_label">{{ label }}</p>
        </div>
        <div v-else-if="tagType == 'lang'" class="tag_lang">
            <p class="general_label">{{ label }}</p>
        </div>
    </div>
</template>

<script>
import Languages from "@/templates/Languages.js";
import ProfilePicture from "@/components/User/ProfilePicture.vue";

export default {
    props: {
        tagType: {
            type: String,
            default: "user",
        },
        label: {
            type: String,
            default: "Label",
        },
    },
    components: {
        ProfilePicture,
    },
    computed: {
        cssProps() {
            return {
                "--card-color": Languages.getColor(this.label) || "var(--main-font-color)",
            };
        },
    },
};
</script>

<style scoped>
.create_tag_container {
    margin: 5px;
    cursor: pointer;
    max-width: 100%;
}
.pfp_label {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
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
    border: 2px solid var(--card-color);
    color: var(--card-color);
    padding: 5px 10px 5px 10px;
    border-radius: 30px;
}
</style>
