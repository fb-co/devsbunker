<template>
    <div>
        <LeftContent />
        <!-- at the moment im passing an empty object, we should avoid re-fetching the notification object tho (maybe we can put it in the store) -->
        <RightContent :notifications="[]" />
    </div>
</template>

<script>
import LeftContent from "@/components/Home/desktop/LeftContent.vue";
import RightContent from "@/components/Home/desktop/RightContent.vue";

export default {
    props: {
        projectData: Object,
        notifications: Array,
    },
    components: {
        RightContent,
        LeftContent,
    },
};
</script>

<style scoped></style>
