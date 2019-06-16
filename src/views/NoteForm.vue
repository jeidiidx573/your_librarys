<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>ノート編集</h1>
      </v-flex>

      <v-flex xs6 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="note.title" label="タイトル"></v-text-field>
              <v-layout>
                <v-checkbox color="orange" v-model="note.tag" v-for="(tag,i) in $store.state.tags" :label="tag" :value="i"></v-checkbox>
              </v-layout>
              <v-textarea rows="20" v-model="note.comment" label="本文"></v-textarea>
              <v-layout align-content-space-around>
                <v-flex xs6>
                  <v-text-field v-model="note.edit_user" label="作成者"></v-text-field>
                </v-flex>
                <v-flex xs6 ml-4>
                  <v-text-field v-model="note.reg_datetime" label="最終更新"></v-text-field>
                </v-flex>
              </v-layout>
              <v-btn @click="$router.push({ name: 'note' })">キャンセル</v-btn>
              <v-btn color="info" @click="submit">保存</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created () {
    if (!this.$route.params.note_id) return
    const note = this.$store.getters.getNoteById(this.$route.params.note_id)
    if (note) {
      this.note = note
    } else {
      this.$router.push({ name: 'note' })
    }
  },
  data () {
    return {
      note: {
        title: "",
        tag: [],
        comment: "",
        edit_user: this.$store.getters.userName,
        reg_datetime: this.$store.state.now_datetime,
      }
    }
  },
  computed: {
  },
  methods: {
    submit () {
      if (this.$route.params.note_id) {
        this.updateNote({ id: this.$route.params.note_id, note: this.note })
      } else {
        this.addNote(this.note)
      }
      this.$router.push({ name: 'note' })
      this.note = {}
    },
    ...mapActions(['addNote','updateNote'])
  }
}
</script>