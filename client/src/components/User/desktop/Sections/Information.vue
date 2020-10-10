<template>
    <div class="general_container">
        <div class="left_content">
            <div class="profile_img_container">
                <img src="@/assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic" width="100%">
            </div>
            
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
    height: 100%;
    background-color: red;
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
.friends_box {
    height: inherit;
    flex-grow: 1;
    overflow-y: scroll;
}

</style>