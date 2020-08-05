<template>
    <div class="home">
        <NavBar />

        <div v-on:click="switchTheme()" id="theme-switcher-container">
            <svg v-if="darkTheme" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun theme-switcher-icon" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="12" r="4" />
                <path d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7M17.7 17.7l.7 .7M6.3 17.7l-.7 .7" />
            </svg>
            <svg v-if="!darkTheme" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-moon theme-switcher-icon" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M16.2 4a9.03 9.03 0 1 0 3.9 12a6.5 6.5 0 1 1 -3.9 -12" />
            </svg>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";
import GeneralProperties from '../mixins/general.mixin';

export default {
    created() {
        SharedMethods.loadPage();
    },
    mixins: [GeneralProperties],
    components: {
        NavBar,
    },
    methods: {
        switchTheme() {
            this.darkTheme = !this.darkTheme;
            if (this.darkTheme) {
                SharedMethods.changeTheme("dark-theme");
            } else {
                SharedMethods.changeTheme("light-theme");
            }
        },
    },
};
</script>

<style scoped>
#theme-switcher-container {
    width: 50px;
    margin: 0 auto;
}
.theme-switcher-icon {
    stroke: var(--main-font-color);
    cursor: pointer;
}
</style>
 