<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>My DashBord</h1>
        <p></p>
      </v-flex>

      <v-flex xs12 mt-5>
        <Profile/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Profile from './Profile.vue'
export default {
  components: {
    Profile
  },
  methods: {
    ...mapActions([''])
  }
}
</script>