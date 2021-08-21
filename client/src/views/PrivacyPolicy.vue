<template>
    <div class="policy_container">
        <div class="intro">
            <h1>Privacy Policy</h1>
            <p>Add an introduction here</p>
        </div>

        <h2>What and how we collect data</h2>
        <p>Explain here</p>

        <h2>What we do with the collected data</h2>
        <p>Explain here</p>

        <h2>What cookies are in use</h2>
        <p>Explain here</p>

        <h2>How users can opt-in opt-out from data collection</h2>
        <p>Explain here</p>

        <h2>How users can request data deletion/download</h2>
        <p>Explain here</p>

        <h2>How to contact us</h2>
        <p>Explain here</p>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.policy_container {
    width: 80%;
    margin: auto;
    margin-top: 80px;

    text-align: justify;
}

.intro {
    text-align: center;
    margin-bottom: 80px;
}

.intro h1 {
    font-size: 50px;
}

.intro p {
    font-size: 22px;
    color: var(--soft-text);
    margin-top: 50px;
}

.policy_container h2 {
    font-size: 35px;
}

.policy_container p {
    font-size: 20px;
    margin-bottom: 30px;
}

@media only screen and (max-width: 950px) {
    .policy_container {
        width: 95%;
    }
}
</style>
