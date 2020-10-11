<template>
    <div class="general_container">
        <div class="left_content">
            <div class="profile_img_container">
                <img src="@/assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic" width="100%">
            </div>
        </div>
        <div class="right_content">
            <p class="friends_label">Friends</p>
            <div class="friends_box">
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
                <p>Hello</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.general_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: inherit;
}
.left_content {
    display: flex;
    flex-direction: column;
    width: 40%;
}
.profile_img_container {
    width: 100%;   
    padding: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.right_content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.friends_label {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 22px;
    color: var(--soft-text);
}

.friends_box {
    margin: 20px;
    overflow-y: scroll;
    flex-grow: 1;
    font-size: 17px;
}
.friends_box > p {
    margin-top: 10px;
    margin-bottom: 10px;
}
.friends_box > p:hover {
    color: var(--soft-text);
    cursor: pointer;
}

/* SCROLL BAR */
.friends_box::-webkit-scrollbar {
    width: 4px;
}
.friends_box::-webkit-scrollbar-thumb {
    background: var(--soft-text);
    border-radius: 10px;
}

</style>