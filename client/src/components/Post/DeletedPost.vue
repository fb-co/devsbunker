<!-- This is going to be the deleted post card thingy -->
<template>
    <div id="deleted" class="proj_card_main_container">
        <div class="text_container">
            <p class="title">Post is unavailable.</p>
            <p class="desc">This post was deleted by the author.</p>

            <div style="flex-grow: 1"></div>
            <!--placeholder so info_container sinks to bottom -->

            <div class="info_container">
                <div class="vertical_flex_center">
                    <!--Not filled icon -->
                    <svg
                        width="23"
                        height="23"
                        viewBox="0 0 16 16"
                        class="bi bi-heart"
                        fill="#eb4034"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                        />
                    </svg>
                </div>
                <div class="vertical_flex_center likeAmt">
                    <p>Deleted.</p>
                </div>

                <div class="vertical_flex_center">
                    <svg
                        width="18"
                        height="18"
                        stroke-width="0.7"
                        stroke="var(--ssoft-text)"
                        viewBox="0 0 16 16"
                        class="bi bi-bookmark save_btn"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
                        />
                    </svg>
                </div>

                <div class="vertical_flex_center">
                    <p class="language">Deleted.</p>
                </div>
            </div>
        </div>
        <div class="image_container">
            <img src="../../assets/unavailable.png" class="card_image" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        projectData: Object,
        // what is this used for??
        width: {
            type: String,
            default: "200px",
        },
    },
};
</script>

<style scoped>
.proj_card_main_container {
    display: flex;
    flex-direction: row;
    height: auto;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    background: rgba(165, 165, 165, 0.3);
}
.text_container {
    display: flex;
    flex-direction: column;
    min-width: 65%;
    text-align: left;
    padding: 10px;
}
.save_btn {
    margin-left: 10px;
}
.likeAmt {
    margin-left: 10px;
    font-weight: bold;
}
.author {
    margin-bottom: 5px;
    font-size: 15px;
    color: var(--soft-text);
    text-decoration: none;
}
.author:hover {
    text-decoration: underline;
}
.title {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
}
.desc {
    font-size: 16px;
    margin-bottom: 15px;
}
.language {
    margin-left: 10px;
}
.info_container {
    display: flex;
    flex-direction: row;
    color: var(--soft-text);
    margin-bottom: 10px;
}
.info_container > svg {
    cursor: pointer;
}
.image_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    width: 100px;
    height: 200px;
}

.image_container img {
    width: 40%;
    height: 50%;
    margin: auto;
}

.card_image {
    border-radius: 5px;
    width: 100%;
}
.spacer {
    padding-right: 10px;
    padding-left: 10px;
}
</style>
