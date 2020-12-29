<template>
    <div id="component_container">
        <Dropdown class="filter_dropdown" style="margin-right: 4%;" label="My Projects" height="40px" linkHeight="40px" openOn="click">
            <button>My Projects</button>
            <button>Purchases</button>
            <button>Downloaded</button>
        </Dropdown>
        <Dropdown class="filter_dropdown" label="Newest" height="40px" linkHeight="40px" openOn="click">
            <button>Newest</button>
            <button>Most Popular</button>
            <button>Alphabetical</button>
        </Dropdown>

        <MobileProjectCard v-for="project in projects" :key="project.name" :projectData="project" width="100%" />
    </div>
</template>

<script>
import MobileProjectCard from '@/components/MobileProjectCard.vue';
import Dropdown from "@/components/global/Dropdown.vue";

export default {
    data() {
        return {
            projects: this.$parent.userProjects
        }
    },
    created() {
        console.log(this.$parent.userProjects);
    },
    components: {
        MobileProjectCard,
        Dropdown
    }
}
</script>

<style scoped>
    #component_container {
        width: 100%;
    }
    .filter_dropdown {
        background-color: var(--secondary-color); 
        width: 48%;
        margin: 0px auto 40px auto;
        display: inline-block;
    }
</style>