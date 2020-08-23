<template>
    <div class="profile">
        <NavBar />
        <div class="profile_banner"></div>
        <div class="profile_card">
            <div class='card_name_container'>
                <p class='card_name'>The_Jack</p>
                <p class='card_desc'>Founder of devsBunker®  and co-founder of Folgoni Borsa Company .inc</p>
                <button>Follow</button>
            </div>
        </div> 
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from '../utils/shared';

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar
    }
};
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
    top: -75px;
    width: 80%;
    max-width: 500px;
    min-width: 250px;
    height: auto;
    background-color: var(--main-color);
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    border-radius: 20px;
    z-index: 2;
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
.profile {
    position: static;
}
</style>
