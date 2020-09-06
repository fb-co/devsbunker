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

        // DEBUG
        const response = await fetch(
            "http://192.168.1.51:5000/user/refresh_token",
            {
                method: "GET",
                credentials: "include",
            }
        );

        console.log(await response.json());
    },
    mixins: [GeneralProperties],
    components: {
        NavBar,
    },
};
</script>
 