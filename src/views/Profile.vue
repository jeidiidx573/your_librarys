<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap align-center justify-center>
      <v-flex xs8>
        <v-card>
          <v-list three-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple :href="item.url" target="_blank" class="pt-2">
                <v-card-title primary-title>
                  <v-img :src="item.user.profile_image_url" height="60" width="60"></v-img>
                </v-card-title>
                <v-list-tile-content>
                  <v-list-tile-title class="text-truncate">{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>by {{ item.user.id }} <v-icon small>thumb_up</v-icon> {{ item.likes_count }}</v-list-tile-sub-title>
                    <p><span class="caption" v-for="tags in item.tags">#{{ tags.name }}　</span></p>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  created () {
    this.login_user = this.$store.state.login_user

    // API
    axios.get( 'https://qiita.com/api/v2/items?page=1&per_page=20&query=stocks:>30' )
    .then( ( res ) => {
      this.items = res.data
    } )
    .catch( ( res ) => {
    } );
  },
  data () {
    return {
      login_user: null,
        items: []
    }
  },
  computed: {
    ...mapGetters(['userName','photoURL'])
  },
}
</script>