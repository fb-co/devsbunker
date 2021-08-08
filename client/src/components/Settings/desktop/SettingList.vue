<template>
    <div>
        <!-- Account -->
        <SettingListItem label="Account" :isActive="active.account">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-lock"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
            </svg>
        </SettingListItem>

        <!-- Appearance -->
        <SettingListItem label="Appearance" :isActive="active.appearance">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-photo"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="15" y1="8" x2="15.01" y2="8" />
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M4 15l4 -4a3 5 0 0 1 3 0l 5 5" />
                <path d="M14 14l1 -1a3 5 0 0 1 3 0l 2 2" />
            </svg>
        </SettingListItem>

        <!-- Privacy -->
        <SettingListItem label="Privacy" :isActive="active.privacy">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-lock"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="var(--main-font-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" />
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
            </svg>
        </SettingListItem>
    </div>
</template>

<script>
import SettingListItem from "./SettingListItem";

export default {
    data() {
        return {
            active: {
                account: false,
                appearance: false,
                privacy: false,
            },
        };
    },
    components: {
        SettingListItem,
    },

    created() {
        const items = Object.keys(this.active);

        items.forEach((item) => {
            if (item === this.$route.params.section) {
                this.active[item] = true;
            }
        });
    },

    watch: {
        $route() {
            for (const item of Object.keys(this.active)) {
                if (this.$route.params.section === item) {
                    this.clearActive();
                    this.active[item] = true;
                }
            }
        },
    },

    methods: {
        clearActive() {
            for (const item in this.active) {
                this.active[item] = false;
            }
        },
    },
};
</script>

<style scoped></style>
