<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12 mb-4 mt-4>
        <h1>ノート</h1>
      </v-flex>
      <v-flex xs12 mt-4 justify-center>
        <v-toolbar flat color="white">
          <v-toolbar-title>ノート一覧</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
          <v-flex text-xs-right>
            <router-link :to="{ name: 'note_edit' }">
              <v-btn outline color="indigo">
                <v-icon>edit</v-icon>追加
              </v-btn>
            </router-link>
          </v-flex>
        </v-toolbar>
        <v-data-table :headers='headers' :items='notes' :search="search" :rows-per-page-items="rows_per_page_items">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">
              <v-btn v-for="(tag,i) in props.item.tag" class="light-green mr-1" small>
                <span class="white--text"><v-icon small class="mr-1">tag</v-icon>{{ tags[tag] }}</span>
              </v-btn>
            </td>
            <td class="text-xs-left">{{ props.item.edit_user }}</td>
            <td class="text-xs-left">{{ props.item.reg_datetime }}</td>
            <td class="text-xs-left">
              <span>
                <router-link :to="{ name: 'note_edit', params: { note_id: props.item.id }}">
                  <v-icon small class="mr-2">edit</v-icon>
                </router-link>
              </span>
              <span>
                <v-icon small class="mr-2" @click="deleteConfirm(props.item.id)">delete</v-icon>
              </span>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.notes = this.$store.state.notes
    this.tags = this.$store.state.tags
  },
  data () {
    return {
      search: '',
      headers: [
        { text: 'タイトル', value: 'title', width: '45%' },
        { text: 'タグ', value: 'tag' },
        { text: '作成者', value: 'edit_user' },
        { text: '最終更新', value: 'reg_datetime' },
        { text: '操作', sortable: false }
      ],
      rows_per_page_items: [20,50,100,{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}],
      notes: [],
      tags: {}
    }
  },
  computed: {
  },
  methods: {
    deleteConfirm (id) {
      if (confirm('削除してよろしいですか？')) {
        this.deleteNote({ id })
      }
    },
    ...mapActions(['deleteNote'])
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>