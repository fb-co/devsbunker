<template>
    <div id="navbar">
        <div class="icon-array">
            <div class="icon" @click="setActive('Home')" :class="{ active: isActive('Home') }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-home"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#000000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
            </div>

            <div class="icon" @click="setActive('Discover')" :class="{ active: isActive('Discover') }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-brand-safari"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#000000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
            </div>

            <div class="main-icon" @click="setActive('Add')" :class="{ active: isActive('Add') }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-circle-plus"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#27A7FF"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
            </div>

            <div class="icon" @click="setActive('Search')" :class="{ active: isActive('Search') }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-search"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#000000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </div>

            <div class="icon" @click="setActive('Profile')" :class="{ active: isActive('Profile') }">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#000000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: "Home",
        };
    },

    methods: {
        setActive(iconName) {
            this.active = iconName;
        },
        isActive(iconName) {
            return this.active === iconName;
        },
    },
};
</script>

<style scoped>
#navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;

    background: var(--main-color);
    border-radius: 15px;

    /* filter: drop-shadow(0px -1px 40px rgba(0, 0, 0, 0.1)); */
}

.icon-array {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    width: 90%;
    margin: 0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.icon svg {
    stroke: var(--main-font-color);
    opacity: 0.6;
    cursor: pointer;
}

.active svg {
    opacity: 1;
}
</style>
