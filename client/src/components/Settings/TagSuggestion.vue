<template>
    <div class="list_container" @click.stop="open()">
        <CreateTag v-for="(tag, index) in tags_to_show" :key="index" tagType="lang" :label="tag.tag" />
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots are_more" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
        </svg>

        <div v-if="isOpen" @click.stop="close()" class="backdrop fix_random_highlights">
            <div @click.stop="" class="popup_container">
                <div class="popup_header">
                    <div class="close_btn_container" @click="close()">
                        <svg @click="close()" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="var(--main-font-color)" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    <p class="vertical_flex_center" style="font-size: 20px;">Tags to Suggest</p>
                    <div style="width: 50px;" />
                </div>
                <QueryInput ref="tag_search" searchFor="languages" />
                <div @click.stop="" class="popup_list">
                    <div v-for="(tag, index) in tags" :key="index" class="popup_tag_container"> 
                        <CreateTag  tagType="lang" :label="tag.tag" class="popup_tag" />
                        <div class="vertical_flex_center">
                            <svg 
                                @click="remove_tag(tag.tag)" 
                                xmlns="http://www.w3.org/2000/svg" 
                                class="icon icon-tabler icon-tabler-circle-x deleteIcon" 
                                width="25" 
                                height="25" 
                                viewBox="0 0 24 24" 
                                stroke-width="1.5" 
                                stroke="var(--main-font-color)" 
                                fill="none" 
                                stroke-linecap="round" 
                                stroke-linejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="12" r="9" />
                                <path d="M10 10l4 4m0 -4l-4 4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CreateTag from "@/components/NewPost/CreateTag.vue";
import QueryInput from "@/components/QueryInput";
import GraphQLService from "@/services/graphql.service.js";

export default {
    data() {
        return {
            initialTags: [],
            tags: this.$store.getters.common_tags,
            tags_to_show: [],
            isOpen: false,
        }
    },
    created() {
        this.initialTags = [...this.tags]; // creates a shallow copy
        this.tags_to_show = this.tags.slice(0, 3);
    },
    components: {
        CreateTag,
        QueryInput,
    },
    async beforeDestroy() {
        await this.save_changes();
    },
    methods: {
        async close() {
            await this.save_changes();
            this.isOpen = false;
        },
        open() {
            this.isOpen = true;
        },

        remove_tag(tag) {
            for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i].tag === tag) {
                    this.tags.splice(i, 1);
                    this.tags_to_show = this.tags.slice(0, 3);
                    break;
                }
            }
        },
        add_entry(tag) {
            let dup = false;

            // check for duplicates
            for (let i = 0; i < this.tags.length; i++) {
                if (tag == this.tags[i].tag) {
                    dup = true;
                    break;
                }
            }

            if (!dup) {
                this.tags.push({
                    tag: tag
                });
                this.tags_to_show = this.tags.slice(0, 3);
                this.$refs.tag_search.clearValue();
            }
        },
        async save_changes() {
            // if the tags have not changed at all, don't query the server
            const changesMade = JSON.stringify(this.initialTags) != JSON.stringify(this.tags);
            
            if (changesMade) {
                let finalTags = [];
                
                // convert to what graphql understands
                for (let i = 0; i < this.tags.length; i++) {
                    finalTags.push(this.tags[i].tag);
                }

                const res = await GraphQLService.setCommonTags(finalTags, this.$store.getters.accessToken);
                if (!res.errors) {
                    this.tags = res.data.setCommonTags;
                } else {
                    console.log(res);
                    this.$store.dispatch("alertUser", { type: "error", title: "Error", msg: "Something went wrong" });
                }
            }
        }
    }
}
</script>

<style scoped>
@keyframes slideAnimation {
    from {
        top: -100%;
    }
    to {
        top: 50%;
    }
}

.list_container {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    margin: 0 auto;
}
.list_container:hover {
    box-shadow: 0px 0px 5px var(--drop-shadow);
    cursor: pointer !important;
}

.popup_list {
    display: flex;
    flex-direction: column;
    margin: 30px auto 30px auto;
}

.popup_tag_container {
    max-width: 250px;
    display: flex;
    margin: 0 auto;
}
.popup_tag {
    max-width: 200px;
    margin: 5px auto 5px auto;
}
.deleteIcon {
    margin-left: 10px;
}
.deleteIcon:hover {
    stroke-width: 2.5px;
}

.are_more {
    margin: 0 auto;
}

.popup_container {
    min-width: 300px;
    width: 40%;
    max-width: 500px;
    min-height: 300px;
    overflow-y: auto;
    background-color: var(--secondary-color);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-height: 95vh;
    border-radius: 5px;
    box-shadow: 0px 0px 5px var(--drop-shadow);
    animation: slideAnimation 0.5s;
}
.popup_container_desktop {
    min-width: 400px;
    width: 40%;
    max-width: 500px;
}
.popup_container_mobile {

}
.popup_header {
    display: flex;
}
.popup_header > p {
    flex-grow: 1;
    font-weight: bold;
    font-size: 18px;
}
.close_btn_container {
    width: 50px;
}
.close_btn_container:hover > svg {
    stroke-width: 2px;
}
</style>