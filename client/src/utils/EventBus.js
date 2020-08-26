/*
    this is the event bus. Just like a bus in a computer, it lets us
    broadcast data, in this case events, between components (parent to child, child to parent and child to child).
*/
import Vue from 'vue';
import CookiesService from "../services/cookies.service";


const EventBus = new Vue({
    methods: {
        // flag here is a boolean
        broadcastLoginState(flag) {
            this.$emit('isLoggedIn', flag);
            // li stands for 'logged in'
            CookiesService.setCookie(this.$cookies, 'li', flag);
        }
    }
});

export default EventBus;