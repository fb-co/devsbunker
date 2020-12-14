<!-- IMPORTANT: THE PARENT COMPONENT NEEDS TO HAVE A getComponentToUpdate() function that returns the component it should render results in-->

<template>
    <div class="post_search_bar" :style="cssProps">
        <input class="post_search_input" placeholder='search...'>

        <div class="form_line_container">
            <div class="bottom_line"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: "100%"
        }
    },
    computed: {
        cssProps() {
            return {
                "--width": this.width,
            };
        },
    },
}
</script>

<style scoped>
    @keyframes form_field_animation {
        from {
            width: 98%;
        }
        to {
            width: 100%;
        }
    }

    .post_search_bar {
        width: var(--width);
    }

    .post_search_input {
        width: 98%;
        border: none;
        padding: 3px;
        background-color: var(--main-color);
        margin: 0px auto 5px auto; 
        font-family: rubik;
        color: var(--main-font-color);
        text-align: left;
        font-size: 15px;
    }
    .post_search_input:focus {
        outline: none;
    }

    .form_line_container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        height: 2px;
    }
    .form_line_container > div {
        width: 98%;
        height: 1px;
        background-image: linear-gradient( to right, var(--secondary-color) 0%, var(--main-font-color) 2%, var(--main-font-color) 98%, var(--secondary-color) 100% );
        opacity: 0.3;
    }
    .post_search_bar input:focus + .form_line_container > div {
        animation: form_field_animation 1s;
        width: 100%;
        height: 1.5px;
    }
</style>