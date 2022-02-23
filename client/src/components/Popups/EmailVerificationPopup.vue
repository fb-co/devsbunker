<template>
    <div v-if="isOpen" class="backdrop">
        <div @click.stop="" class="popup_container">
            <div class="header">
                <p class="title">Email Confirmation</p>
            </div>

            <p>We have sent you an email with a link to verify your account. Please do so to begin using DevsBunker.</p>
            
            <p style="margin-top: 20px; margin-bottom: 20px;">Didn't get an email? Check spam or press resend.</p>
            <button @click="resendEmail()" class="general_button resend_btn">Resend</button>

            <div v-if="isResending" class="resend_loading_gif">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin:auto;background:none;display:block;"
                    width="50px"
                    height="50px"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                >
                    <g transform="rotate(0 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(30 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(60 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(90 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(120 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(150 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(180 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(210 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(240 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(270 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(300 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite" />
                        </rect>
                    </g>
                    <g transform="rotate(330 50 50)">
                        <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#93dbe9">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
                        </rect>
                    </g>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
            isResending: false,
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        resendEmail() {
            this.isResending = true;
        }
    },
}
</script>

<style scoped>
.popup_container {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 13;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0px 0px 20px var(--drop-shadow);
    background-color: var(--main-color);
    animation: slideAnimation 0.4s;
    padding: 20px;
    text-align: center;
    max-height: 95vh;
    overflow: auto;

    width: 95%;
    max-width: 400px;
}

.title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 20px;
}

.resend_btn {
    width: 150px;
    margin: 0 auto;
    border-radius: 5px;
}
</style>