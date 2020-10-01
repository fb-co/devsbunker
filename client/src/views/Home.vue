<template>
    <div class="home">
        <NavBar />
        <HomeMobile v-if="mobile" />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";
import ScreenType from "../utils/screenType.js";

import HomeMobile from "@/components/Home/HomeMobile.vue";

export default {
    data() {
        return {
            mobile: false,
        }
    },
    async created() {
        SharedMethods.loadPage();

        this.mobile = this.isMobile();

        // we also check when the user resizes the window
        window.addEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    destroyed() {
        window.removeEventListener("resize", () => {
            this.mobile = this.isMobile();
        });
    },
    mixins: [GeneralProperties],
    components: {
        NavBar,
        HomeMobile
    },
    methods: {
        isMobile() {
            return ScreenType.isMobile(950);
        },
    },
};
</script>
