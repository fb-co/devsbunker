<template>
    <div class="home">
        <NavBar />
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from "../utils/shared";
import GeneralProperties from "../mixins/general.mixin";

export default {
    async created() {
        SharedMethods.loadPage();
    },
    mixins: [GeneralProperties],
    components: {
        NavBar,
    },
};
</script>
 