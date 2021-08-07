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

                    <div class="main_btn">
                        <!-- had to use h3 cuz jac uses Ps everywhere and his css was messing with mine -->
                        <h3>Start</h3>
                    </div>
                </div>
                <DummyCards class="dummy_cards" :dark="darkTheme" />
            </div>
        </div>
        <div v-else>
            <div class="logo_container_mobile">
                <img src="../assets/LOGO.svg" alt="Logo" />
            </div>
        </div>

        <!-- The text -->
        <div v-if="!$store.getters.mobile" class="text_container">
            <p class="title">About</p>
            <div class="section_one_cols">
                <p class="col1">
                    Devsbunker is a project meant for developers of any kind to promote and share their work.
                </p>
                <p class="col2">
                    Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                    augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                    pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui
                    rhoncus varius.
                </p>
            </div>

            <div class="fancy_line" />
            <p class="title" style="margin-top: 70px;">Future</p>

            <div class="section_one_cols">
                <p>
                    Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                    augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                    pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui
                    rhoncus varius.
                </p>
                <p>
                    Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                    augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                    pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui
                    rhoncus varius.
                </p>
            </div>
        </div>
        <div v-else style="padding-bottom: 50px;">
            <p class="title" style="margin-top: 50px; font-size: 30px;">About</p>

            <p class="mobile_text_section">
                Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui rhoncus
                varius.
            </p>

            <p class="title" style="margin-top: 50px; font-size: 30px;">Future</p>

            <p class="mobile_text_section">
                Nunc libero ipsum, tristique ac euismod sed, faucibus elementum diam. Proin quis libero quis quam congue pellentesque. Quisque rhoncus nunc
                augue, in fringilla augue rutrum a. Sed sollicitudin est et nibh maximus, non ornare lectus ullamcorper. Quisque tellus mi, hendrerit vel
                pharetra vel, dictum sed ligula. Nulla vitae aliquet turpis. Sed vestibulum egestas cursus. Cras cursus tellus dui, non facilisis dui rhoncus
                varius.
            </p>
        </div>
        <div class="exampple_section">
            <ExampleCard :dark="true" />
        </div>
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";
import DummyCards from "../assets/dummy_cards/DummyCardsWrapper.vue";
import ExampleCard from "../assets/dummy_cards/ExampleCardWrapper.vue";
import GeneralProperties from "@/mixins/general.mixin";

export default {
    created() {
        SharedMethods.loadPage();
    },
    components: {
        DummyCards,
        ExampleCard,
    },
    mixins: [GeneralProperties],
};
</script>

<style scoped>
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
    font-size: 40px;
    line-height: 65px;

    margin-top: px;
    text-align: center;
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
</style>
