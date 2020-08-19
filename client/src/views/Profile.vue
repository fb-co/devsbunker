<template>
    <div class="profile">
        <NavBar />
        <h1>Profile</h1>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SharedMethods from '../utils/shared';

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        NavBar
    }
};
</script>

<style scoped>
.btn {
    width: 150px;
    margin-top: 10px;
    font-size: 1.3rem;
    text-align: center;
    background-color: var(--main-color);
    border: 1px solid var(--error-red);
    border-radius: 6px;
    color: var(--error-red);
    padding: 0px 0px;
    cursor: pointer;
    transition: 0.6s;
    height: 40px;
}

.btn:hover {
    color: var(--main-font-color);
    border-color: var(--main-font-color);
}
</style>