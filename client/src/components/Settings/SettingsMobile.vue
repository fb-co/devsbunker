<template>
    <div id="SettingsPage">
        <h1 class="title">Settings</h1>
        <input type="text" name="search" class="search-bar" placeholder="Search a setting...">

        <div class="profile-banner">
            <img src="../../assets/profilePlaceholder.png" alt="profile_pic" class="profile-pic">
            <h2 style="text-align: left">Username</h2>
            <p class="user-mail">user@mail.com</p>
        </div>

        <div class="settings"></div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
    font-weight: bold;
    font-size: 24px;
    color: var(--main-font-color);

    margin-top: 30px;
}

.search-bar {
    width: 80%;
    height: 30px;

    padding: 10px;

    background: var(--secondary-color);
    border: none;
    border-radius: 7px;

    margin-top: 25px;
    margin-bottom: 25px;
}

.search-bar::placeholder {
    color: #bcbcbc;
}

.profile-banner {
    width: 80%;
    height: 55px;
    margin: auto;
    margin-top: 20px;
}

.profile-pic {
    width: 70px;
    float: left;
    margin-right: 20px;
}

.user-mail {
    color: #a7a7a7;
    text-align: left;
    margin-top: 5px;
}

.settings {
    width: 90%;
    height: 80vh;

    margin: auto;
    margin-top: 40px;
    background: var(--settings-mobile-card);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
</style>