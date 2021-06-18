const state = {
    alerts: [],
    alertDuration: 3000
};

const getters = {
    getAlerts: (state) => state.alerts
};

const mutations = {
    createAlert(state, alertData) {
        const alert = alertData;

        state.alerts.push(alert);

        // remove the alert after some "alertDuration"
        setTimeout(() => {
            state.alerts.splice(state.alerts.indexOf(alert), 1);
        }, state.alertDuration);
    }
};

const actions = {
    alertUser({ commit }, alertData) {
        commit("createAlert", alertData);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};