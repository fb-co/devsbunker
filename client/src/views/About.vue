<template>
    <div class="pageContainer">
        
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
};
</script>

<style scoped>
</style>