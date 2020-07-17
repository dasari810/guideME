<template>
  <div>
    <v-container v-if="loading">
      <v-layout row wrap class="center">
        <v-flex xs12 class="text-xs-center text-sm-center">
          <v-progress-circular :size="70" :width="7" color="purple" indeterminate v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else pa-10>
      <v-layout row wrap>
        <v-row ma-10>
          <v-flex xs6>
            <v-text-field
              v-model="search"
              outlined
              label="Search"
              prepend-inner-icon="mdi-magnify"
              clearable
            ></v-text-field>
          </v-flex>
          <v-flex class="d-flex justify-end" justify="space-around" v-if="!explore">
            <v-btn
              absolute
              class="d-flex justify-end"
              color="light-blue darken-4 white--text"
              @click="dialog=true"
              height="55px"
            >
              <v-avatar color="amber" size="30" mr-3>
                <v-icon color="purple">mdi-plus</v-icon>
              </v-avatar>Create new Topic ?
            </v-btn>
          </v-flex>
        </v-row>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <v-flex
        xs12
        sm6
        md4
        lg3
        xl3
        v-for="item in filteredTopics"
        :key="item.id"
        my-10
        justify="space-around"
      >
        <v-card class="mx-auto" max-width="344" elevation="10" :to="'/topic/'+item.id">
          <v-list-item three-line>
            <v-list-item-content>
              <v-card-title class="headline">{{ item.title }}</v-card-title>
              <v-list-item-subtitle>{{ item.description}}</v-list-item-subtitle>
              <v-img height="250px" alt="related image" width="400" :src="item.imageurl"></v-img>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>
            <v-chip
              class="ma-2"
              color="purple white--text"
              v-for="tag in item.tags"
              :key="tag.text"
            >
              <div>{{ tag.text}}</div>
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confrim</v-card-title>

        <v-card-text>Are you sure that the topic doesn't exist in the already listed topics ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">Let me check again</v-btn>

          <v-btn color="green darken-1" text @click="dialog = false" to="/create">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    filteredTopics() {
      if (!this.search) {
        return this.topics;
      }

      return this.topics.filter(topic => {
        if (topic.title.toLowerCase().includes(this.search.toLowerCase())) {
          return true;
        }
        if (topic.tags) {
          var tags = topic.tags;
          for (var i = 0; i < tags.length; i++) {
            if (
              tags[i].text.toLowerCase().includes(this.search.toLowerCase())
            ) {
              return true;
            }
          }
        }
      });
    },
    loading() {
      return this.$store.getters.loading;
    },
    topics() {
      return this.$store.getters.loadedTopics;
    },
    explore() {
      return this.$store.getters.explore;
    }
  },
  data() {
    return {
      search: "",
      dialog: false,
      show: true
    };
  },
  created() {
    this.$store.dispatch("show", true);
  }
};
</script>

<style>
</style>