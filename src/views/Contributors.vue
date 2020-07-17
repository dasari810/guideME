<template>
  <v-container mt-10>
    <v-container v-if="loading">
      <v-sheet class="text-xs-center text-sm-center center">
        <v-layout  class="center">
          <v-flex xs12 class="text-xs-center text-sm-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate v-if="loading"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-sheet>
    </v-container >
    <v-container v-else  mt-10 mb-10 style="top:0">
      <v-list two-line dense subheader elevation="24" rounded >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>CONTRIBUTOR NAME</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>NO OF CONTRIBUTIONS</v-list-item-action>
        </v-list-item>
        <v-divider color="light-blue darken-4"></v-divider>
        <div v-for="item in items" :key="item.name">
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar color="yellow" size="48">
                <v-icon color="purple">mdi-account-circle</v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip class="ma-2" color="purple" text-color="white">{{ item.name }}</v-chip>
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-avatar color="teal" size="48">
                <span class="white--text headline">{{ item.points}}</span>
              </v-avatar>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <v-sheet heigth="500px">
        
      </v-sheet>
    </v-container>
    <v-sheet height="400">
        
      </v-sheet>
  </v-container>
</template>

<script>
import * as firebase from "firebase";
export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    // this.$store.dispatch("show", false);
    this.$store.dispatch("setLoading", true);
    firebase
      .database()
      .ref("contributors")
      .once("value")
      .then(data => {
        let items = [];
        let items1 = [];
        let obj = data.val();
        for (let i in obj) {
          items.push(obj[i]);
        }
        for (let i = 0; i < items.length; i++) {
          for (let key in items[i]) {
            items1.push(items[i][key]);
          }
        }
        this.$store.dispatch("setLoading", false);
        let items2 = items1.sort((a, b) =>
          parseInt(a.points, 10) < parseInt(b.points, 10) ? 1 : -1
        );
        this.items = items2;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
</style>