<template>
    <div>
        <p class="banner">Coming Soon!</p>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    }
}
</script>

<style scoped>
    .banner {
        margin-top: 100px;
        font-size: 25px;
        font-weight: bold;
        color: var(--main-font-color);
    }
</style>