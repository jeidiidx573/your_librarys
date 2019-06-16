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
    notes: [],
    addresses: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
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

    // address
    addAddress (state, { id, address }) {
      address.id = id
      state.addresses.push(address)
    },
    updateAddress (state, { id, address }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses[index] = address
    },
    deleteAddress (state, { id }) {
      const index = state.addresses.findIndex(address => address.id === id)

      state.addresses.splice(index, 1)
    },
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
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
        firebase.firestore().collection(`notes/${getters.uid}`).doc(id).update(note).then(() => {
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
    },

    // addresses
    fetchAddresses ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addAddress', { id: doc.id, address:  doc.data() }))
      })
    },
    addAddress ({ getters, commit }, address) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).add(address).then(doc => {
          commit('addAddress', { id: doc.id, address })
        })
      }
    },
    updateAddress ({ getters, commit }, { id, address }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).update(address).then(() => {
          commit('updateAddress', { id, address })
        })
      }
    },
    deleteAddress ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/addresses`).doc(id).delete().then(() => {
          commit('deleteAddress', { id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getAddressById: state => id => state.addresses.find(address => address.id === id),
    getNoteById: state => id => state.notes.find(note => note.id === id),
    getNoteTags: state => state.tags

  }
})