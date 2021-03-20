<template>
    <div v-if="projectsToRender" id="component_container">
        <MobileProjectCard v-for="project in projectsToRender.posts" :key="project.id" :projectData="project" width="100%" />
        <p v-if="!projectsToRender.fetchedAll" @click="loadNew()" class="load_more_btn">Load More</p>
    </div>
</template>

<script>
import MobileProjectCard from "@/components/MobileProjectCard.vue";

export default {
    props: {
        projectsToRender: Object
    },
    methods: {
        loadNew() {
            this.$parent.loadNewPersonalPosts();
        }
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

.load_more_btn {
    margin: 20px auto 40px auto;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    width: 200px;
}
</style>