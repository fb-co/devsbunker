<template>
    <div class="pageContainer">
        <div v-if="!$store.getters.mobile">
            <div class="header_container">
                <div class="logo_container">
                    <img src="../assets/LOGO.svg" alt="Logo" />
                    <p>
                        A platform where developers can <br />
                        promote their work for free.
                    </p>

                    <div 
                        v-if="$store.getters.isLoggedIn"
                        @click="$router.push({ path: `/` })" 
                        class="main_btn"
                    >
                        <!-- had to use h3 cuz jac uses Ps everywhere and his css was messing with mine -->
                        <h3>Start</h3>
                    </div>
                    <div
                        v-else
                        @click="$router.push({ path: `/login` })" 
                        class="main_btn"
                    >
                        <!-- had to use h3 cuz jac uses Ps everywhere and his css was messing with mine -->
                        <h3>Start</h3>
                    </div>
                </div>
                <DummyCards class="dummy_cards" :dark="darkTheme" />
            </div>
        </div>
        <div v-else>
            <div class="mobile_header_container">
                <img src="../assets/LOGO.svg" alt="Logo" />
                <p>
                    A platform where developers can <br />
                    promote their work for free.
                </p>
                <div 
                    v-if="$store.getters.isLoggedIn"
                    @click="$router.push({ path: `/` })" 
                    class="main_btn_mobile"
                >
                    <!-- had to use h3 cuz jac uses Ps everywhere and his css was messing with mine -->
                    <h3>Start</h3>
                </div>
                <div
                    v-else
                    @click="$router.push({ path: `/login` })" 
                    class="main_btn_mobile"
                >
                    <!-- had to use h3 cuz jac uses Ps everywhere and his css was messing with mine -->
                    <h3>Start</h3>
                </div>
            </div>
        </div>

        <!-- The text -->
        <div v-if="!$store.getters.mobile" class="text_container">
            <p class="title" style="margin-top: 140px;">About</p>
            <!--             <div class="section_one_cols">
                <p class="col1">
                    Devsbunker is a project meant for developers of any kind to promote and share their work.
                </p>
                <p class="col2">
                    Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                    augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                    pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui
                    rhoncus varius.
                </p>
            </div> -->
            <p class="main_desc">
                Devsbunker is a project meant for developers of any kind <br />
                to promote and share their work.
            </p>

            <div class="fancy_line" />

            <div class="example_section">
                <div class="wrapper">
                    <h1>Promote</h1>
                    <p>
                        Devsbunker provides developers a way to share and advertise their work in a free and easy way.
                        While it is mainly designed for software developers, it's certainly not limited to that.
                        Graphic design, 3D modeling, photo editing, and game development are a few examples of valid contributions. 
                        <br><br>
                        We felt like there was no good place to share your projects whenever you wanted, while making it easy for others
                        to find them. 
                    </p>
                </div>
                <div class="wrapper">
                    <ExampleCard :dark="darkTheme" />
                </div>
            </div>

            <div class="fancy_line" />

            <div class="future">
                <div class="wrapper">
                    <MarketAsset :dark="darkTheme" />
                </div>
                <div class="wrapper">
                    <h1>Coming Soon</h1>
                    <p>
                        We are planning on expanding the platform to include a market section where users will be able to 
                        sell their work in an simple and easy way. Payments will be handled with Stripe, and everything will
                        be done on this site.  
                    </p>
                </div>
            </div>
        </div>
        <div v-else class="mobile_text_container">
            <p class="mobile_title">About</p>
            <p class="main_desc_mobile">
                Devsbunker is a project meant for <br> developers of any kind
                to<br> promote and share their work.
            </p>
            <div class="fancy_line" style="margin-top: 50px; margin-bottom: 50px;" />

            <ExampleCard :dark="darkTheme" style="max-width: 80%; height: auto; margin-bottom: 40px; margin-top: 10px;" />
            <p class="mobile_text_block">
                Devsbunker provides developers a way to share and advertise their work in a free and easy way.
                While it is mainly designed for software developers, it's certainly not limited to that.
                Graphic design, 3D modeling, photo editing, and game development are a few examples of valid contributions. 
                <br><br>
                We felt like there was no good place to share your projects whenever you wanted, while making it easy for others
                to find them. 
            </p>

            <div class="fancy_line" style="margin-top: 50px; margin-bottom: 50px;" />

            <p class="mobile_title">Coming Soon</p>
            <MarketAsset :dark="darkTheme" style="max-width: 90%; height: auto; margin-bottom: 40px; margin-top: 10px;" />
            <p class="mobile_text_block">
                We are planning on expanding the platform to include a market section where users will be able to 
                sell their work in an simple and easy way. Payments will be handled with Stripe, and everything will
                be done on this site.  
            </p>
        </div>

        <div v-if="!$store.getters.mobile" class="footer">
            <div class="footer_section">
                <h3>Created by</h3>
                <p>Jacopo Folgoni Borsa</p>
                <p>Leonardo Folgoni</p>
            </div>
            <div class="footer_section">
                <div class="footer_links">
                    <div>
                        <router-link to="/">Home</router-link>
                    </div>
                    <div>
                        <router-link to="/market">Market</router-link>
                    </div>
                    <div>
                        <router-link to="/policy">Privacy Policy</router-link>
                    </div>
                </div>
            </div>
            <div class="footer_section">
                <h3>Contact us:</h3>
                <a href="mailto:folgoni.co@gmail.com">folgoni.co@gmail.com</a>
            </div>
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import DummyCards from "../assets/dummy_cards/DummyCardsWrapper.vue";
import ExampleCard from "../assets/dummy_cards/ExampleCardWrapper.vue";
import MarketAsset from "../assets/dummy_cards/MarketAsset.vue";
import GeneralProperties from "@/mixins/general.mixin";

export default {
    created() {
        SharedMethods.loadPage();
        document.body.style.overflowX = "hidden";
    },
    destroyed() {
        document.body.style.overflowX = "auto";
    },
    components: {
        DummyCards,
        ExampleCard,
        MarketAsset,
    },
    mixins: [GeneralProperties],
};
</script>

<style scoped>
.pageContainer {
    width: 100%;
    height: auto;
}
/* 
    multiple animaitons because we have different elements positions for different screen sizes
    Some JS would avoid copy and pasting CSS but Im lazy so here we go
*/
@keyframes animation_small_screen {
    from {
        margin-left: -1000px;
    }
    to {
        margin-left: 3%;
    }
}
@keyframes cards_animation_small_screen {
    from {
        right: -1000px;
    }
    to {
        right: -200px;
    }
}
@keyframes cards_animation_medium_screen {
    from {
        right: -1000px;
    }
    to {
        right: -150px;
    }
}
.header_container {
    display: flex;
    flex-direction: row;
    height: 480px;
    background-color: var(--secondary-color);
}
.logo_container {
    width: 100%;
    text-align: left;
}
.logo_container_mobile img {
    margin: 0 auto;
    width: 60%;
}
.logo_container p {
    margin-left: 3%;
    margin-top: 20px;
    font-size: 25px;
    line-height: 1.5;
    color: var(--soft-text);
    animation: animation_small_screen 1s;
}
.logo_container img {
    margin-left: 3%;
    margin-top: 50px;
    width: 40%;
    max-width: 600px;
    animation: animation_small_screen 1s;
}
.main_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3%;

    width: 180px;
    height: 70px;
    background-color: var(--main-accent);

    border-radius: 12px;
    margin-top: 35px;

    cursor: pointer;
    border: 1px solid var(--main-accent);
    transition: 0.3s;
    animation: animation_small_screen 1s;
}

.main_btn:hover {
    background-color: transparent;
}
.main_btn:hover > h3 {
    color: var(--main-accent);
}

.main_btn h3 {
    color: #f2f2f2;
    font-size: 21px;
}
.dummy_cards {
    position: absolute;
    right: -200px;
    top: -70px;
    transform: scale(1.2);
    z-index: 1;
    animation: cards_animation_small_screen 1s;
}
.mobile_text_section {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    line-height: 2;
    font-size: 18px;
    text-align: left;
}
.title {
    font-weight: bold;
    font-size: 75px;
    line-height: 65px;

    margin-bottom: 100px;
    text-align: center;
}

.main_desc {
    font-size: 30px;
    text-align: center;
    line-height: 50px;

    font-weight: 100;
}

.fancy_line {
    margin-bottom: 150px;
    margin-top: 150px;
}

.text_container {
    margin-top: 50px;
}
.section_one_cols {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 90%;
    max-width: 1300px;
    margin: auto;
    margin-top: 30px;
}
.section_one_cols p {
    width: 50%;
    padding: 30px;
    line-height: 2;
    font-size: 18px;
    text-align: left;
    margin-right: 1px;
}

.future,
.example_section {
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: auto;
    margin-bottom: 200px;
}

.wrapper {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: left;

    height: 500px;
}

.wrapper svg {
    transform: scale(1.2);
}

.wrapper h1 {
    font-size: 75px;
    margin-bottom: 40px;
}

.wrapper p {
    font-size: 22px;
    line-height: 40px;
}

.wrapper p,
.wrapper h1 {
    width: 100%;
}

.example_section {
    padding-bottom: 50px;
    padding-top: 80px;
}

.example_section .wrapper svg {
    transform: scale(1.1);
}

.footer {
    width: 100%;
    height: 500px;
    background-color: var(--secondary-color);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 100px;
    margin-top: 220px;
}

.footer_section {
    flex: 0.3;
    height: 90%;

    display: flex;
    flex-direction: column;
    text-align: left;
}

.footer_section h3 {
    font-size: 30px;
    margin-bottom: 20px;
}

.footer_section p {
    margin-bottom: 15px;
    color: var(--soft-text);
    font-size: 18px;
}

.footer_links div {
    margin-bottom: 30px;
}

.footer_links a {
    text-decoration: none;
    color: var(--soft-text);
    transition: 0.3s;

    font-size: 28px;
}
.footer_links a:hover {
    color: var(--main-font-color);
}

@keyframes cards_animation {
    from {
        right: -1000px;
    }
    to {
        right: -100px;
    }
}
@keyframes banner_animation {
    from {
        margin-left: -1000px;
    }
    to {
        margin-left: 5%;
    }
}

/* need this because the btn has more margin than the text */
@keyframes main_btn_animation {
    from {
        margin-left: -1000px;
    }
    to {
        margin-left: 5.5%;
    }
}

@media only screen and (max-width: 1350px) {
    .main_btn {
        width: 150px;
        height: 60px;
    }
    .example_section .wrapper svg {
        transform: scale(0.9);
    }
    .wrapper svg {
        transform: scale(0.9);
    }
    .wrapper p {
        font-size: 19px;
    }
    .wrapper h1 {
        font-size: 60px;
    }
}
@media only screen and (max-width: 1000px) {
    .future,
    .example_section {
        width: 90%;
    }
    .example_section .wrapper svg {
        transform: scale(0.8);
    }
    .wrapper svg {
        transform: scale(0.8);
    }

    .wrapper p {
        line-height: 30px;
    }
}
@media only screen and (min-width: 1230px) {
    .dummy_cards {
        right: -150px;
        top: -70px;
        transform: scale(1.5);
        animation: cards_animation_medium_screen 1s;
    }
    .header_container {
        height: 565px;
    }
}
@media only screen and (min-width: 1550px) {
    .dummy_cards {
        animation: cards_animation 1s;
        right: -100px;
        top: -70px;
        transform: scale(1.8);
    }
    .logo_container img {
        animation: banner_animation 1s;
        margin-left: 5%;
    }
    .main_btn {
        margin-left: 5.5%;
        animation: main_btn_animation 1s;
    }
    .logo_container p {
        animation: banner_animation 1s;
        margin-left: 5%;
        padding-left: 10px;
        font-size: 32px;
    }
    .header_container {
        height: 620px;
    }
}


/* Mobile Only Styles */
.mobile_header_container {
    max-width: 100vw;
    text-align: center;
    padding-left: 20px;
    padding-top: 30px;
}
.mobile_header_container > img {
    width: 80%;
}
.mobile_header_container > p {
    margin-top: 10px;
    color: var(--soft-text);
    line-height: 1.5;
    font-size: 18px;
}

.main_btn_mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    width: 150px;
    height: 60px;
    background-color: var(--main-accent);

    border-radius: 12px;
    margin-top: 35px;

    cursor: pointer;
    border: 1px solid var(--main-accent);
    transition: 0.3s;
    color: #fff;
    font-size: 18px;
}

.mobile_text_container {
    max-width: 100vw;
    margin-top: 100px;
    margin-bottom: 30px;
}
.mobile_title {
    font-size: 40px;
    font-weight: bold;
}
.main_desc_mobile {
    font-size: 20px;
    text-align: center;
    font-weight: 100;
    
    line-height: 1.5;
    margin: 20px auto;
}
.mobile_text_block {
    width: 75%;
    font-weight: 20;
    margin: 0 auto;
    font-size: 18px;
    text-align: left;
    line-height: 1.5;
}
</style>
