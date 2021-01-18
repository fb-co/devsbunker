<template>
    <div>
        <NavBar />
        <div class="main_container" v-if="projectData.title">
            <LeftContent />
            <div class="center_content">{{ projectData }}</div>
            <!-- at the moment im passing an empty array, we should avoid re-fetching the notification object tho (maybe we can put it in the store) -->
            <RightContent :notifications="notifications" />
        </div>
        <div v-else>
            <p>stoopid something is fucked up</p>
            <h1>
                kernel panic bru theres not project data help <br />
                ahdsdgv hadfhwsdgfh sdfsad hfasgdhf gashdjfjasv
            </h1>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";

import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

export default {
    props: {
        projectData: Object,
        notifications: Array
    },
    components: {
        RightContent,
        LeftContent,
        NavBar
    },

    created() {
        console.log(">>", this.projectData);
    }
};
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.center_content {
    -ms-overflow-style: none; /* IE and Edge (scrollbar hide)*/
    scrollbar-width: none; /* Firefox (scrollbar hide)*/

    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background-color: red;
}
</style>
