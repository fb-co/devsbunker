<template>
    <div id="component_container" v-if="projectsToRender.posts.length>0">
        <MobileProjectCard v-for="project in projects" :key="project.id" :projectData="project" width="100%" />
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";

export default {
    data() {
        return {
            projects: this.projectsToRender.posts,
        };
    },
    created() {
        console.log(this.projectsToRender);
    },
    props: {
        projectsToRender: Object
    },
    components: {
        MobileProjectCard,
    },
};
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