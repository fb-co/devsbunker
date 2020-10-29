<!-- This component will query the server as the user types to get a dynamic view, width is inherited by the intup width given to the slot -->

<template>
    <div class="dynamic_input_container">
        <slot>
            
        </slot>
    </div>
</template>

<script>
// Were gonna need a way to tell the component from the parent what kind of data it should display

//import GraphQLService from "@/services/graphql.service";

export default {
    methods: {
        queryData() {
            /*
            GraphQLService.fetchUserDetails(this.$store.getters.username, ["desc", "email", "profile_pic"]).then((user) => {
                this.userObject = user.data.user;
            });
            */
        }
    }
}
</script>

<style scoped>
    
</style>