<template>
    <div class="nav_container">
        <div id="navbar">
            <div class="icon-array">
                <router-link to="/" class="icon">
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
                </router-link>

                <router-link to="/explore" class="icon">
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
                </router-link>

                <div @click="newPost()" class="icon special-icon" style="cursor: pointer">
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

                <!-- Notifications Button -->
                <router-link to="/notifications" class="icon" style="display: flex; flex-direction: column; justify-content:center;">
                    <NotificationIcon bellColor="var(--soft-text)" />
                </router-link>

                <router-link :to="$store.getters.username ? `/user/${$store.getters.username}` : '/login'" class="icon" :class="{ active_link: $route.path.includes('/user/') }">
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
                </router-link>
            </div>
        </div>
        <div class="nav_placeholder"></div>
    </div>
</template>

<script>
import NotificationIcon from "@/components/Notifications/NotificationIcon.vue";

export default {
    data() {
        return {
            active: "Home",
        };
    },
    components: {
        NotificationIcon,
    },
    methods: {
        newPost() {
            this.$store.commit("createNewPost");
        }
    },
};
</script>

<style scoped>
.router-link-exact-active {
    background-color: var(--secondary-color);
}

.active_link {
    background-color: var(--secondary-color);
}

.nav_placeholder {
    height: 60px;
}

#navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: fixed;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 60px;

    background: var(--main-color);
    border-radius: 15px;

    /* filter: drop-shadow(0px -1px 40px rgba(0, 0, 0, 0.1)); */
}

.icon-array {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 60px;
    width: 20%;
}
.icon > svg {
    width: 25px;
    stroke-width: 1.4px;
}
.icon:hover > svg {
    stroke-width: 2.2px;
}

.icon svg {
    stroke: var(--main-font-color);
    opacity: 0.6;
    cursor: pointer;
}

.special-icon svg {
    stroke: var(--link-color);
}
</style>
