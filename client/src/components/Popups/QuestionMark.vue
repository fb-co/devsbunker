<template>
    <div class="more_information_container" @click="$emit('open')">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
            <line x1="12" y1="19" x2="12" y2="19.01" />
        </svg>
    </div>
</template>

<style scoped>
.more_information_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: var(--main-accent);
}
.more_information_container:hover {
    box-shadow: 0px 0px 15px var(--main-accent);
}

.more_information_container svg {
    margin: 0 auto;
}
</style>