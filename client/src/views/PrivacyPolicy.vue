<template>
    <div class="policy_container">
        <div class="intro">
            <h1>Privacy Policy</h1>
            <p>Add an introduction here</p>
        </div>

        <h2>What and how we collect data</h2>
        <p>
            The only information we collect about our users is the email address, used to deliberately signup to create an account. Otherwise we don't collect
            any kind of personal data. To create an account users must enter a username, which may be unrelated to personal information.

            <br />
            We support GitHub signups but we still handle and store <span>only</span> the email address, the provided username and the provided profile picture.
            You can also upload a profile picture using a non-GithHub account.
        </p>

        <h2>What we do with the collected data</h2>
        <p>
            We store the previously stated data in our database to handle user accounts. Emails will be eventually used for account verification. We
            <span>do not</span> share it with third-parties.
        </p>

        <h2>What cookies are in use</h2>
        <p>The only cookie in use is the refresh token, used for authentication purposes (specifically used to issue access tokens to authenticated users).</p>

        <h2>How users can opt-in opt-out from data collection</h2>
        <p>
            Users <span>can not</span> opt-out of our data collection system if they whish to create an account. By visiting our website, users
            <span>must agree</span> to this privacy policy even though they don't plan on creating an account.
        </p>

        <h2>How users can request data deletion/download</h2>
        <p>
            Users can request a data download by visiting their profile page. They will get a JSON file in return containing <span>everything</span> we store
            about them in our database. Users can also <span>completely</span> delete their data by again visiting their profile page.
        </p>

        <h2>How to contact us</h2>
        <p>Users can directly contact the developers and mainteiners of the project at <a href="mailto:folgoni.co@gmail.com">folgoni.co@gmail.com</a></p>
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
    margin-top: 20px;
    font-weight: 300;
    line-height: 32px;
}

.policy_container span {
    font-weight: bold;
}

@media only screen and (max-width: 950px) {
    .policy_container {
        width: 95%;
    }
}
</style>
