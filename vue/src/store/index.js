import { createStore } from "vuex";
import axiosClient from "../axios";
import moment from "moment";

// const tempForm = [
//     {
//         id: 100,
//         title: "The Codeholic YouTube channel contet",
//         slug: "thecodeholic-youtube-channel-content",
//         status: "draft",
//         image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
//         description: "Hello. My name is Mickey.<br>I an a doctor with 9+ years of expirience, feel free to contact me.",
//         expire_date: "2023-02-04 19:00:00",
//         questions: [
//             {
//                 id: 1,
//                 type: "select",
//                 question: "From which country are you?",
//                 description: null,
//                 data: {
//                     options: [
//                         { uuid: "0cab6e32-d36c-44b2-a8e0-1cbf329beec8", text: "USA" },
//                         { uuid: "5c2e1352-7940-4bd8-9f1b-94d83e079e4f", text: "Georgia" },
//                         { uuid: "9b08133a-d2fc-4287-8172-f77fe2c96163", text: "Germany" },
//                         { uuid: "14a394e6-f11a-4df1-8cb4-966c7d1de5cf", text: "India" }
//                     ]
//                 }
//             }, {
//                 id: 2,
//                 type: "checkbox",
//                 question: "Which language do you speak?",
//                 description: "Lorem ipsum dolor sit amet, ...",
//                 data: {
//                     options: [
//                         { uuid: "c0268854-58a7-4605-b333-39db922d282a", text: "language1" },
//                         { uuid: "b6083836-520a-404e-a66f-8635f3cfa709", text: "language2" },
//                         { uuid: "64b4441c-0cc2-40e4-8ae3-26deb34b48bb", text: "language3" }
//                     ]
//                 }
//             }, {
//                 id: 3,
//                 type: "radio",
//                 question: "Do you ....",
//                 description: "Lorem ipsum dolor sit amet, ...",
//                 data: {
//                     options: [
//                         { uuid: "cb7ba841-250f-44be-a182-45de697de3ea", text: "option 1" },
//                         { uuid: "6a8eb806-8d67-4887-a438-16f4f61a5dc9", text: "option 2" },
//                         { uuid: "24908759-2961-4339-b395-e53fcb206ead", text: "option 3" },
//                         { uuid: "741be5c6-1588-44a3-abbc-19f2efd1c5ad", text: "option 4" },
//                         { uuid: "417c01d3-ef4b-4e36-9b1b-e90b7744bcfc", text: "option 5" },
//                         { uuid: "2f3fdc04-5c49-44d9-ba5a-17ecc3b8d68a", text: "option 6" }
//                     ]
//                 }
//             }, {
//                 id: 4,
//                 type: "text",
//                 question: "Tell me .....",
//                 description: null,
//                 data: {}
//             }, {
//                 id: 5,
//                 type: "textarea",
//                 question: "Tell me more.....",
//                 description: "Write your honest opinion. Everything is anonymos.",
//                 data: {}
//             }
//         ]
//     }, {
//         id: 200,
//         title: "Laravel 8",
//         slug: "laravel-8",
//         status: "active",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.jpg",
//         description: "Hello. My name is Mickey.<br>I an a doctor with 9+ years of expirience, feel free to contact me.",
//         expire_date: "2023-02-04 19:00:00",
//         questions: []
//     }, {
//         id: 300,
//         title: "Vue 3",
//         slug: "vue-3",
//         status: "active",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.jpg",
//         description: "Hello. My name is Mickey.<br>I an a doctor with 9+ years of expirience, feel free to contact me.",
//         expire_date: "2023-02-04 19:00:00",
//         questions: []
//     }, {
//         id: 400,
//         title: "Tailwind 3",
//         slug: "tailwind-3",
//         status: "active",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind.jpg",
//         description: "Hello. My name is Mickey.<br>I an a doctor with 9+ years of expirience, feel free to contact me.",
//         expire_date: "2023-02-04 19:00:00",
//         questions: []
//     }
// ];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
            id: sessionStorage.getItem('ID'),
        },
        currentForm: {
            loading: false,
            data: {}
        },
        forms: {
            loading: false,
            links: [],
            data: []
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            type: null,
            message: null
        },
        answers: {
            uuid: null,
            answers: null
        },
        dashboard: {
            loading: false,
            data: {}
        }
    },

    getters: {},

    actions: {

        // register
        register({ commit }, user) {
            return axiosClient.post('/auth/register', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },

        // login
        login({ commit }, user) {
            return axiosClient.post('/auth/authenticate', user)
                .then(({data}) => {
                    commit('setUser', data);
                    return data;
                })
        },

        // save form
        saveForm({ commit }, form) {

            // console.log("----SAVE-------")
            // console.log(form)
            delete form.image_url;
            form.user_id = sessionStorage.getItem('ID');

            let response;
            if(form.id) {
                response = axiosClient
                    .put(`/forms/${form.id}`, form)
                    .then( (res) => {
                        commit('setCurrentForm', res.data);
                        return res;
                    });
            } else {
                response = axiosClient.post('/forms', form).then( (res) => {
                    commit('setCurrentForm', res.data);
                    // console.log("CUVANJE")
                    // console.log(res.data);
                    return res;
                });
            }
            return response;
        },

        // get form by id
        getForm({ commit }, id) {
            commit('setCurrentFormLoading', true);
            return axiosClient.get(`/forms/${id}`).then( (res)=> {
                console.log("GEEEET")
                res.data.image = res.data.image_url;
                console.log(res.data)
                commit('setCurrentForm', res.data);
                commit('setCurrentFormLoading', false);
                return res;
            })
            .catch( (err) => {
                commit('setCurrentFormLoading', true);
                throw err;
            });
        },

        // delete form by id
        deleteForm({}, id) {
            return axiosClient.delete(`forms/${id}`);
        },

        // get forms
        getForms({ commit }, { url = null } = {}) {
            let id = sessionStorage.getItem('ID');
            url = url || `/forms/user/${id}`;

            commit('setFormsLoading', true);
            return axiosClient.get(url).then( (res) => {
                commit('setFormsLoading', false);
                commit('setForms', res);
                return res;
            });
        },

        // get form by slug
        getFormBySlug({ commit }, slug) {
            commit('setCurrentFormLoading', true);
            return axiosClient.get(`/forms/form-by-slug/${slug}`).then( (res) => {
                commit('setCurrentForm', res.data);
                commit('setCurrentFormLoading', false);
                return res;
            }).catch( (err) => {
                commit('setCurrentFormLoading', true);
                throw err;
            });
        },

        // save answers
        saveFormAnswer({ commit }, { formId, answers }) {
            console.log("OVDE SMO")
            console.log(answers)
            return axiosClient.post(`/forms/answer/${formId}`, {answers});
        },

        // dashboard
        getDashboardData({ commit }) {
            console.log("OVDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
            let userId = sessionStorage.getItem('ID');
            commit('dashboardLoading', true)
            return axiosClient.get(`/dashboard/${userId}`).then((res) => {
                commit('dashboardLoading', false);
                commit('setDashboardData', res.data);
                console.log("DASHBOARD")
                console.log(res.data)
                return res;
            }).catch(err => {
                commit('dashboardLoading', true);
                console.log(err)
                return err;
            })
        },

        //search
        getFormsViaParams({ commit }, param) {
            commit("setFormsLoading", true);
            return axiosClient.get(`/forms/search/${sessionStorage.getItem('ID')}`, {
                params: {title: param}
            }).then((res) => {
                commit("setFormsLoading", false);
                commit("setForms", res);
                return res;
            })
        }
    },

    mutations: {

        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            state.user.id = null;
            sessionStorage.clear();
        },

        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData;
            sessionStorage.setItem('TOKEN', userData.token);
            sessionStorage.setItem('ID', userData.id);
            // sessionStorage.setItem('EMAIL', userData.email);
            // sessionStorage.setItem('FIRST_NAME', userData.firstName);
            // sessionStorage.setItem('LAST_NAME', userData.lastName);
        },

        setCurrentFormLoading: (state, loading) => {
            state.currentForm.loading = loading;
        },
        
        setCurrentForm: (state, form) => {
            state.currentForm.data = form;
            state.currentForm.data.expire_date = moment(
                String(form.expire_date)
            ).format("YYYY-MM-DD");
        },

        setFormsLoading: (state, loading) => {
            state.forms.loading = loading;
        },
        
        setForms: (state, forms) => {
            console.log("SET FORMS")
            console.log(forms)
            state.forms.data = forms.data;
        },

        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout( () => {
                state.notification.show = false;
            }, 3000);
        },

        dashboardLoading: (state, loading) => {
            state.dashboard.loading = loading;
        },

        setDashboardData: (state, data) => {
            state.dashboard.data = data;

            state.dashboard.data.latestForm.latest_update = moment(
                String(data.latestForm.latest_update)
            ).format("YYYY-MM-DD HH:mm:ss");

            state.dashboard.data.latestForm.expire_date = moment(
                String(data.latestForm.expire_date)
            ).format("YYYY-MM-DD HH:mm:ss");

            state.dashboard.data.forms.forEach((f) => {
                if(f.answers) {
                    f.answers.forEach((a) => {
                        a.createdAt = moment(
                            String(a.createdAt)
                        ).format("YYYY-MM-DD HH:mm:ss")
                    });
                }
            });
            
        }
    },

    modules: {}
});

export default store;