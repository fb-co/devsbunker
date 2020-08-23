<template>
    <div class='profileMobile'>
        <div class="profile_banner"></div>
        <div class="profile_card">
            <div class='card_container'>
                <p class='card_name'>The_Jack</p>
                <p class='card_desc'>Founder of devsBunker® and co-founder of Folgoni Borsa Company .inc</p>
                <form>
                    <!-- Not sure if this is nessacary, but I assume you need a form to get data to the server -->
                    <input type="submit" value="Follow">
                </form>
                <div class='follower_container'>
                    <div class="follow_count">
                        <p class="follow_label">Followers</p>
                        <p class="follow_amt" id="followerAmt">8723</p>
                    </div>
                    <div class="follow_count">
                        <p class="follow_label">Following</p>
                        <p class="follow_amt" id="followingAmt">8723</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="projects_tab">
            <div class="projects_tab_item">
                <p id="projects_title">PROJECTS</p>
            </div>
            <div class="projects_tab_item" style="text-align: right;">
                <router-link to='/' id="view_all_link">VIEW ALL</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.profile_banner {
    position: relative;
    width: 100%;
    height: 300px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: red;
    z-index: 1;
}
.profile_card {
    position: relative;
    top: -100px;
    width: 90%;
    max-width: 500px;
    min-width: 250px;
    height: auto;
    background-color: var(--main-color);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    border-radius: 20px;
    z-index: 2;
}
.card_container {
    padding-bottom: 30px;
}
.card_name {
    padding-top: 40px;
    font-size: 25px;
    font-weight: bold;
}
.card_desc {
    margin-top: 20px;
    padding: 20px;
    color: var(--soft-text);
}
.follower_container {
    display: flex;
    flex-direction: row;
    width: 90%;
    padding: 10px;
    margin: 0 auto;
}
.follow_count {
    display: flex;
    flex-direction: column;
    width: 50%;
}
.follow_label {
    color: var(--soft-text);
    margin-bottom: 7px;
}
.follow_amt {
    font-weight: bold;
}
.projects_tab {
    width: 80%;
    display: flex;
    flex-direction: row;
    margin-top: -60px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
}
.projects_tab_item {
    width: 50%;
}
#projects_title {
    margin-top: 5px;
    font-weight: bold;
    font-size: 20px;
}
#view_all_link {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    background-color: var(--main-btn-color);
    color: #fff;
    border-radius: 30px;
    width: 70px;
    padding: 10px;
    font-size: 11px;
}

input[type="submit"] {
    width: 200px;
    font-size: 1rem;
    font-weight: 900;
    text-align: center;
    color: #fff;
    background-color: var(--main-btn-color);
    border-radius: 16px;
    padding: 0px 0px;
    cursor: pointer;
    height: 45px;
    border: none;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>