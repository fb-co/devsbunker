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
                <svg width="671" height="554" viewBox="0 0 671 554" fill="none" xmlns="http://www.w3.org/2000/svg" class="dummy_cards">
                    <g clip-path="url(#clip0)">
                        <g filter="url(#filter0_d)">
                            <rect x="96" y="201.617" width="290" height="121" rx="12" transform="rotate(-37.7684 96 201.617)" fill="#0D0D0D" />
                        </g>
                        <g filter="url(#filter1_d)">
                            <rect x="183.789" y="317.021" width="290" height="121" rx="12" transform="rotate(-37.7684 183.789 317.021)" fill="#0D0D0D" />
                        </g>
                        <g filter="url(#filter2_d)">
                            <rect x="272.788" y="434.017" width="290" height="121" rx="12" transform="rotate(-37.7684 272.788 434.017)" fill="#0D0D0D" />
                        </g>
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M174.555 259.81L173.442 259.616C170.827 259.161 168.65 261.705 169.224 264.378C169.494 265.635 170.421 267.035 172.531 268.102C174.564 269.13 177.68 269.832 182.223 269.707C183.479 265.339 183.577 262.146 183.091 259.921C182.584 257.61 181.461 256.363 180.311 255.788C177.865 254.564 174.858 256.037 174.645 258.682L174.555 259.81ZM183.06 270.786C163.148 271.687 166.572 257.697 173.293 258.486C173.382 258.497 173.471 258.509 173.56 258.525C173.566 258.436 173.576 258.347 173.59 258.258C174.501 251.551 188.905 251.73 183.06 270.786Z"
                            fill="#FF5A5A"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M262.344 375.214L261.23 375.02C258.616 374.566 256.438 377.109 257.012 379.782C257.283 381.039 258.209 382.439 260.32 383.507C262.352 384.534 265.469 385.236 270.012 385.111C271.268 380.743 271.366 377.55 270.879 375.325C270.372 373.014 269.249 371.768 268.099 371.192C265.654 369.969 262.647 371.441 262.434 374.086L262.344 375.214ZM270.849 386.191C250.937 387.092 254.361 373.101 261.082 373.891C261.171 373.901 261.26 373.914 261.349 373.929C261.355 373.84 261.365 373.751 261.378 373.663C262.289 366.955 276.693 367.134 270.849 386.191Z"
                            fill="#FF5A5A"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M351.344 492.21L350.23 492.017C347.615 491.562 345.438 494.105 346.012 496.778C346.283 498.035 347.209 499.435 349.319 500.503C351.352 501.53 354.468 502.232 359.012 502.107C360.267 497.739 360.365 494.547 359.879 492.321C359.372 490.01 358.249 488.764 357.099 488.188C354.653 486.965 351.646 488.437 351.434 491.082L351.344 492.21ZM359.848 503.187C339.937 504.088 343.361 490.097 350.082 490.887C350.17 490.897 350.259 490.91 350.348 490.925C350.355 490.836 350.365 490.747 350.378 490.659C351.289 483.951 365.693 484.13 359.848 503.187Z"
                            fill="#FF5A5A"
                        />
                        <rect x="269.845" y="101.078" width="71" height="67" rx="10" transform="rotate(-37.7684 269.845 101.078)" fill="#44AEFA" />
                        <rect x="357.634" y="216.482" width="71" height="67" rx="10" transform="rotate(-37.7684 357.634 216.482)" fill="#6BB2A0" />
                        <path
                            d="M452.758 341.383C449.375 337.018 450.172 330.736 454.538 327.354L494.853 296.118C499.219 292.735 505.5 293.532 508.883 297.898L537.669 335.051C541.051 339.417 540.254 345.698 535.889 349.081L495.574 380.317C491.208 383.699 484.926 382.902 481.544 378.537L452.758 341.383Z"
                            fill="#CB44FA"
                        />
                        <rect
                            x="120.273"
                            y="203.794"
                            width="46"
                            height="8"
                            rx="4"
                            transform="rotate(-37.2604 120.273 203.794)"
                            fill="#F2F2F2"
                            fill-opacity="0.6"
                        />
                        <rect
                            x="208.062"
                            y="319.199"
                            width="46"
                            height="8"
                            rx="4"
                            transform="rotate(-37.2604 208.062 319.199)"
                            fill="#F2F2F2"
                            fill-opacity="0.6"
                        />
                        <rect
                            x="297.061"
                            y="436.195"
                            width="46"
                            height="8"
                            rx="4"
                            transform="rotate(-37.2604 297.061 436.195)"
                            fill="#F2F2F2"
                            fill-opacity="0.6"
                        />
                        <rect x="146.307" y="238.018" width="144" height="6" rx="3" transform="rotate(-37.2604 146.307 238.018)" fill="#969696" />
                        <rect x="234.095" y="353.422" width="144" height="6" rx="3" transform="rotate(-37.2604 234.095 353.422)" fill="#969696" />
                        <rect x="323.095" y="470.418" width="144" height="6" rx="3" transform="rotate(-37.2604 323.095 470.418)" fill="#969696" />
                        <rect x="152.967" y="246.773" width="126" height="6" rx="3" transform="rotate(-37.2604 152.967 246.773)" fill="#969696" />
                        <rect x="240.755" y="362.177" width="126" height="6" rx="3" transform="rotate(-37.2604 240.755 362.177)" fill="#969696" />
                        <rect x="329.755" y="479.173" width="126" height="6" rx="3" transform="rotate(-37.2604 329.755 479.173)" fill="#969696" />
                        <rect x="130.375" y="218.726" width="107" height="11" rx="5.5" transform="rotate(-37.2604 130.375 218.726)" fill="#F2F2F2" />
                        <rect x="218.164" y="334.13" width="107" height="11" rx="5.5" transform="rotate(-37.2604 218.164 334.13)" fill="#F2F2F2" />
                        <rect x="307.163" y="451.126" width="107" height="11" rx="5.5" transform="rotate(-37.2604 307.163 451.126)" fill="#F2F2F2" />
                    </g>
                    <defs>
                        <filter id="filter0_d" x="56" y="-1" width="383.352" height="353.266" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="15" />
                            <feGaussianBlur stdDeviation="20" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                        </filter>
                        <filter
                            id="filter1_d"
                            x="143.789"
                            y="114.404"
                            width="383.352"
                            height="353.266"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="15" />
                            <feGaussianBlur stdDeviation="20" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                        </filter>
                        <filter
                            id="filter2_d"
                            x="232.788"
                            y="231.4"
                            width="383.352"
                            height="353.266"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                        >
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="15" />
                            <feGaussianBlur stdDeviation="20" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                        </filter>
                        <clipPath id="clip0">
                            <rect width="671" height="554" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
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
    </div>
</template>

<script>
import SharedMethods from "../utils/shared";

export default {
    created() {
        SharedMethods.loadPage();
    },
};
</script>

<style scoped>
.header_container {
    display: flex;
    flex-direction: row;
    height: 650px;
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
}
.logo_container img {
    margin-left: 3%;
    margin-top: 50px;
    width: 40%;
    max-width: 600px;
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

@media only screen and (min-width: 1230px) {
    .dummy_cards {
        right: -150px;
        top: -70px;
        transform: scale(1.5);
    }
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
}
</style>
