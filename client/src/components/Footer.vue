<template>
    <div class="component_container">
        <footer id="main_footer">
            <ul>
                <li>
                    <router-link to="/" class="nav_link">Home</router-link>
                </li>
                <li>
                    <router-link to="/about" class="nav_link">About</router-link>
                </li>
                <li>
                    <router-link to="/about" class="nav_link">Contact Us</router-link>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.component_container {
    background-color: var(--secondary-color);
}
.nav_link {
    color: var(--main-font-color);
}
#main_footer {
    width: 100%;
    height: 100%;
}
#main_footer ul {
    display: flex;
    justify-content: center;
    padding: 20px;
    list-style: none;
}
#main_footer li {
    padding: 0 30px;
    color: var(--main-font-color);
}
</style>