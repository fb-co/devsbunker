<template>
    <div class="profileDesktop">
        <div class='main_container'>
            <div class="row1">
                <div class='profile_pic_container row_item'>
                    <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic" width="100px">
                    <p style="margin-top: 20px;">The_Jack</p>
                </div>
                <div class='main_links_container row_item'>
                    <router-link to='/profile/revenue' class='link_item'>Revenue</router-link>
                    <router-link to='/profile/purchases' class='link_item'>My purchases</router-link>
                    <router-link to='/profile/purchases' class='link_item'>My projects</router-link>
                </div>
                <div class='other_links_container row_item'>
                    <router-link to='/profile/revenue' class='link_item'>Personal Information</router-link>
                    <router-link to='/profile/purchases' class='link_item'>Saved Projects</router-link>
                    <router-link to='/profile/purchases' class='link_item'>Download Data</router-link>
                    <router-link to='/profile/purchases' class='link_item'>Logout</router-link>
                </div>
            </div>
            <div class="content_box">
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .main_container {
        display: flex;
        flex-direction: row;
        width: 90%;
        height: auto;
        margin: 100px auto 0px auto;
    }
    .row1 {
        display: flex;
        flex-direction: column;
        width: 300px;
    }
    .row_item {
        background-color: var(--general-card);
        width: 100%;
        border-radius: 5px;
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    }
    .row_item:first-child {
        margin-bottom: 15px;
    }
    .row_item:last-child {
        margin-top: 15px;
    }
    .main_links_container {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .other_links_container {
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .link_item {
        display: block;
        width: 100%;
        text-decoration: none;
        color: var(--main-font-color);
        padding: 10px 0px 10px 10px;
        font-size: 15px;
        text-align: left;
        border-left: 3px solid transparent;
    }
    .link_item:hover {
        border-left: 3px solid var(--main-btn-color);
        font-weight: bold;
        background: linear-gradient(90deg, rgba(255,255,255,1) 3%, rgba(1,135,175,0) 100%);
    }
    .profile_pic_container {
        padding: 40px;
    }
    .profile_pic {
        width: 50px;
    }
    .content_box {
        border-radius: 5px;
        flex-grow: 1;
        background-color: var(--main-color);
        margin: 0px 15px 0px 15px;
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    }
</style>