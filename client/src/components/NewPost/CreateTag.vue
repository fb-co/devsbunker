<template>
    <div class="vertical_flex_center create_tag_container">
        <div class="tag_person" style="padding: 5px;">
            <div class="vertical_flex_center" style="height:100%;">
                <img src="@/assets/profilePlaceholder.png" alt="profile_pic" style="height: 70%;">
            </div>
            <p>{{ label }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
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
</style>