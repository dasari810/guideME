import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '@/router'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        topics: [],
        loading: false,
        error: null,
        explore: false,
        show: true,
        snackbar: {
            show1: false,
            message: "videoLink added succesfully "
        }
    },
    mutations: {
        createTopic(state, payload) {
            state.topics.push(payload)
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setLoadedTopics(state, payload) {
            state.topics = payload
        },
        explore(state, payload) {
            state.explore = payload
        },
        show(state, payload) {
            state.show = payload
        },
        snackbar(state, payload) {
            state.snackbar = payload
        }
    },
    actions: {
        createTopic({ commit ,dispatch}, payload) {
            commit('setLoading', true)
            if (payload.imageurl === null) {
                payload.imageurl = "https://previews.123rf.com/images/vectorshowstudio/vectorshowstudio1812/vectorshowstudio181200060/126701287-online-learning-flat-design-distant-education-seamless-pattern-background-training-store-learning-re.jpg"
            }
            const topic = {
                title: payload.title,
                imageurl: payload.imageurl,
                description: payload.description,
                tags: payload.tags,
            }
            firebase.database().ref('topics').once('value')
                .then(data => {
                    let topics = data.val();

                    for (let key in topics) {

                        if (topics[key].title.toLowerCase() === payload.title.toLowerCase()) {
                            dispatch('snackbar', {
                                show1: true,
                                message: "Sorry ! the Topic already exists , start contributing to it ! "
                            })
                            commit('setLoading', false)
                            router.push("/topics")
                            return false
                        }
                    }

                    return true
                })
                .then(result => {
                    if (result) {
                        firebase.database().ref('topics').push(topic)
                            .then((data) => {
                                commit('setLoading', false)
                                commit('createTopic', {
                                    ...topic,
                                    id: data.key
                                })
                                dispatch("snackbar",{
                                    show1 : true ,
                                    message : "Topic Created  succesfully ! lets start contributing"
                                  });
                                router.push("/topic/" + data.key)
                            })
                            .catch(err => {
                                commit('setLoading', false)
                                console.log(err)
                            })
                    }
                })


        },
        loadTopics({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('topics').once('value')
                .then((data) => {
                    const topics = []
                    const obj = data.val()
                    for (let key in obj) {
                        topics.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageurl: obj[key].imageurl,
                            tags: obj[key].tags,
                        })
                    }
                    commit('setLoadedTopics', topics)
                    commit('setLoading', false)
                })
                .catch(err => {
                    console.log(err)
                    commit('setLoading', false)
                })
        },
        addwebLink({ commit, dispatch }, payload) {
            commit('setLoading', true)
            const weblink = {
                link: payload.link,
                name: payload.name,
                description: payload.description,
                tag: payload.tag,
                likes: payload.likes
            }
            firebase.database().ref("weblinks").child(payload.id).once("value")
                .then(data => {
                    let weblinks = data.val();

                    for (let key in weblinks) {

                        if (weblinks[key].link === payload.link) {
                            dispatch('snackbar', {
                                show1: true,
                                message: "Sorry ! the link already exists in this topic "
                            })
                            commit('setLoading', false)
                            return false
                        }
                    }

                    return true
                })
                .then(result => {
                    if (result) {
                        firebase.database().ref('weblinks/' + payload.id).push(weblink)
                            .then(async () => {
                                dispatch("snackbar", {
                                    show1: true,
                                    message: "webLink added succesfully !  Thanks for the contribution"
                                });
                                commit('setLoading', false)
                                dispatch('updateContribution', payload)
                            })
                            .catch(err => {
                                commit('setLoading', false)
                                console.log(err)
                            })
                    }
                })

        },
        addvideoLink({ commit, dispatch }, payload) {
            commit('setLoading', true)
            const videolink = {
                link: payload.link,
                name: payload.name,
                description: payload.description,
                tag: payload.tag,
                likes: payload.likes
            }
            firebase.database().ref("videolinks").child(payload.id).once("value")
                .then(data => {
                    let videolinks = data.val();

                    for (let key in videolinks) {

                        if (videolinks[key].link === payload.link) {
                            dispatch('snackbar', {
                                show1: true,
                                message: "Sorry ! the link already exists in this topic "
                            })
                            commit('setLoading', false)
                            return false
                        }
                    }

                    return true
                })
                .then(result => {
                    if (result) {
                        firebase.database().ref('videolinks/' + payload.id).push(videolink)
                            .then(async () => {
                                dispatch("snackbar", {
                                    show1: true,
                                    message: "videoLink added succesfully !  Thanks for the contribution"
                                });
                                commit('setLoading', false)
                                dispatch('updateContribution', payload)
                            })
                            .catch(err => {
                                commit('setLoading', false)
                                console.log(err)
                            })
                    }
                })

        },
        addSuggestion({ commit, dispatch }, payload) {
            commit('setLoading', true)
            const suggestion = {
                name: payload.name,
                suggestion: payload.suggestion,
                tag: payload.tag
            }
            firebase.database().ref('suggestions/' + payload.id).push(suggestion)
                .then(() => {
                    commit('setLoading', false)
                    dispatch('updateContribution', payload)
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
        },
        editwebLikes({ commit }, payload) {
            // commit('setLoading', true)
            firebase.database().ref('weblinks/' + payload.topicId).child(payload.id).update(payload)
                .then(() => {
                    commit('setLoading', false)
                    // commit('updateMeetup', payload)
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
        },
        editvideoLikes({ commit }, payload) {
            // commit('setLoading', true)
            firebase.database().ref('videolinks/' + payload.topicId).child(payload.id).update(payload)
                .then(() => {
                    commit('setLoading', false)
                    // commit('updateMeetup', payload)
                })
                .catch(err => {
                    commit('setLoading', false)
                    console.log(err)
                })
        },
        explore({ commit }, payload) {
            commit('explore', payload)
        },
        show({ commit }, payload) {
            commit('show', payload)
        },
        setLoading({ commit }, payload) {
            commit('setLoading', payload)
        },
        async updateContribution({ commit }, payload) {
            var data = await firebase.database().ref('contributors/' + payload.name).once('value')
            commit('setLoading', false)
            if (data.val()) {
                let obj = data.val()
                let i = 1
                let item = {}
                for (let key in obj) {
                    i = key
                    item = obj[key]
                }
                item.points = item.points + 1
                await firebase.database().ref('contributors/' + payload.name).child(i).update(item)
            }
            else {
                let obj = {
                    name: payload.name,
                    points: 1
                }
                await firebase.database().ref('contributors/' + payload.name).push(obj)
            }
        },
        snackbar({ commit }, payload) {
            commit('snackbar', payload)
        }
    },
    getters: {
        loadedTopics(state) {
            return state.topics
        },
        loading(state) {
            return state.loading
        },
        loadedTopic(state) {

            return (topicId) => {
                return state.topics.find((topic) => {
                    return topic.id === topicId
                })
            }
        },
        explore(state) {
            return state.explore
        },
        show(state) {
            return state.show
        },
        snackbar(state) {
            return state.snackbar
        }
    }
})