<template>
    <div id="main_container">
        <p style="margin-top: 20px; font-size: 20px; font-weight: bold;">Coming Soon!</p>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.project_list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
}
.project_list > * {
    margin: 10px;
}
.filter_dropdown_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
}
.filter_dropdown {
    font-size: 12px;
    height: 30px;
    width: 125px;
    margin: 20px auto 20px auto;
    background-color: var(--secondary-color);
    border-radius: 5px;
}
.search_bar{
    width: 225px;
    margin: 0 auto;
}
</style>