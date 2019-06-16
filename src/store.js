import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    now_datetime: moment().format("YYYY-MM-DD"),
    tags: { 1: 'perl', 2: 'HTML', 3: 'CSS', 4: 'javascript', 5: 'その他', 6: '雑記' },
    users: [],
    notes: [],
  },
  mutations: {
    // OAuth
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },

    // users
    updateUser (state, { id, user }) {
      const index = state.users.findIndex(user => user.id === id)
      state.users[index] = user
    },

    // notes
    addNote (state, { id, note }) {
      note.id = id
      state.notes.push(note)
    },
    updateNote (state, { id, note }) {
      const index = state.notes.findIndex(note => note.id === id)
      state.notes[index] = note
    },
    deleteNote (state, { id }) {
      const index = state.notes.findIndex(note => note.id === id)
      state.notes.splice(index, 1)
    },
  },
  actions: {
    // OAuth
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },

    // users
    updateUser ({ getters, commit }, { id, user }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}`).doc(id).update(user).then(() => {
          commit('updateUser', { id, user })
        })
      }
    },


    // notes
    pickupNote ({ getters, commit }) {
      firebase.firestore().collection(`notes`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addNote', { id: doc.id, note: doc.data() }))
      })
    },
    addNote ({ getters, commit }, note) {
      if (getters.uid) {
        firebase.firestore().collection(`notes`).add(note).then(doc => {
          commit('addNote', { id: doc.id, note })
        })
      }
    },
    updateNote ({ getters, commit }, { id, note }) {
      if (getters.uid) {
        firebase.firestore().collection(`notes`).doc(id).update(note).then(() => {
          commit('updateNote', { id, note })
        })
      }
    },
    deleteNote ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users`).doc(id).delete().then(() => {
          commit('deleteNote', { id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getNoteById: state => id => state.notes.find(note => note.id === id),
    getNoteTags: state => state.tags

  }
})