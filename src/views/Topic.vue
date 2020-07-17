<template>
  <div>
    <div v-if="loading">
      <v-sheet class="text-xs-center text-sm-center center">
        <v-layout row wrap class="center">
          <v-flex xs12 class="text-xs-center text-sm-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate v-if="loading"></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-sheet>
    </div>
    <div v-else mb-10>
      <v-tabs fixed-tabs centered  icons-and-text background-color class="fixed" color="blue">
        <v-tab @click="web">
          <v-btn class="purple" color="white--text" width="120px">
            <v-icon>mdi-link</v-icon>Web Links
          </v-btn>
        </v-tab>
        <v-tab @click="video">
          <v-btn class="purple" color="white--text" width="140px">
            <v-icon>mdi-youtube</v-icon>Video Links
          </v-btn>
        </v-tab>
        <v-tab @click="links=false" mr-5>
          <v-btn class="purple" color="white--text" width="145px">
            <v-icon>mdi-forum-outline</v-icon>Suggestions
          </v-btn>
        </v-tab>
      </v-tabs>
      <v-sheet height="500px" class="grad">
        <v-row>
          <v-flex xs12 pa-5 ma-5>
            <v-card width="100%" height="400px">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="display-3" size="5rem">{{topic.title}}</v-card-title>
                  <v-chip
                    class="ma-2"
                    color="purple white--text"
                    v-for="tag in topic.tags"
                    :key="tag.text"
                  >
                    <div>{{ tag.text}}</div>
                  </v-chip>
                  <v-card-text  class="text-left">{{topic.description}}</v-card-text>
                </div>
                <v-list-item-avatar
                  
                  tile
                  size="80"
                  height="320px"
                  width="800px"
                  class="hidden-sm-and-down"
                >
                  <v-img alt="related Image" :src="topic.imageurl"></v-img>
                </v-list-item-avatar>
              </div>
              <v-card-actions v-if="!explore">
                <v-btn
                  large
                  color="light-blue darken-4"
                  class="white--text"
                  router
                  :to="'/addweblink/'+topic.id"
                  pa-10
                >Add Web Link</v-btn>
                <v-btn
                  large
                  color="light-blue darken-4"
                  class="white--text"
                  router
                  :to="'/addvideolink/'+topic.id"
                >Add Video Link</v-btn>
                <v-btn
                  large
                  color="light-blue darken-4"
                  class="white--text"
                  router
                  :to="'/addsuggestion/'+topic.id"
                >Add a Suggestion</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-row>
      </v-sheet>
      <v-container  mb-10>
        <v-flex v-if="links" >
          <v-row justify="center">
            <v-expansion-panels popout>
              <v-expansion-panel v-for="(item,i) in list" :key="i" >
                <v-row>
                  <v-expansion-panel-header>
                    <v-row no-gutters>
                      <v-col cols="4">
                        <v-chip class="ma-2" color="purple white--text">{{item.tag}}</v-chip>
                      </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <v-row no-gutters style="width: 100%">
                            <v-col cols="6">
                              <v-btn class="primary">
                                <v-btn icon color="amber darken-1" @click="editLikes(item,i)">
                                  <v-icon>mdi-thumb-up</v-icon>
                                </v-btn>
                                {{ item.likes }}
                              </v-btn>
                            </v-col>
                            <v-col cols="6">
                              <v-btn class="primary" :href="item.link" target="_blank">Visit</v-btn>
                            </v-col>
                          </v-row>
                        </v-fade-transition>
                      </v-col>
                      contributer: {{ item.name }}
                    </v-row>
                  </v-expansion-panel-header>
                </v-row>
                <v-expansion-panel-content>{{item.description}}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-flex>
        <v-flex v-else style="z-index:-1" mb-10>
          <v-row justify="center">
            <v-timeline dense>
              <v-timeline-item
                v-for="sugg in suggestions"
                :key="sugg.id"
                icon="mdi-forum-outline"
                color="light-blue darken-4"
                style="z-index:-1"
                large
              >
                <v-card class="elevation-10" width="410px">
                  <v-card-title class="headline">
                    <v-chip class="ma-2" color="purple white--text">
                      <div>{{sugg.tag}}</div>
                    </v-chip>
                  </v-card-title>
                  <v-card-subtitle>
                    <span>~ {{ sugg.name }}</span>
                  </v-card-subtitle>
                  <v-card-text>{{ sugg.suggestion }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-row>
        </v-flex>
        <v-sheet height="180px">

    </v-sheet>
      </v-container>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase";

export default {
  props: ["id"],
  data() {
    return {
      links: true,
      list: [],
      weblinks: [],
      videolinks: [],
      suggestions: []
    };
  },
  computed: {
    topic() {
      return this.$store.getters.loadedTopic(this.id);
    },
    loading() {
      return this.$store.getters.loading;
    },
    explore() {
      return this.$store.getters.explore;
    }
  },
  created() {
    this.$store.dispatch("show", true);
    this.$store.dispatch("setLoading", true);
    firebase
      .database()
      .ref("weblinks")
      .child(this.id)
      .once("value")
      .then(data => {
        this.weblinks = data.val();
        this.list = this.weblinks;
        return firebase
          .database()
          .ref("videolinks")
          .child(this.id)
          .once("value");
      })
      .then(data => {
        this.videolinks = data.val();
        return firebase
          .database()
          .ref("suggestions")
          .child(this.id)
          .once("value");
      })
      .then(data => {
        this.$store.dispatch("setLoading", false);
        this.suggestions = data.val();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    video() {
      this.links = true;
      this.list = this.videolinks;
    },
    web() {
      this.links = true;
      this.list = this.weblinks;
    },
    editLikes(item, i) {
      if (this.list === this.weblinks) {
        this.weblinks[i].likes = this.weblinks[i].likes + 1;
        this.$store.dispatch("editwebLikes", {
          ...item,
          id: i,
          topicId: this.id
        });
      } else {
        this.videolinks[i].likes = this.videolinks[i].likes + 1;
        this.$store.dispatch("editvideoLikes", {
          ...item,
          id: i,
          topicId: this.id
        });
      }
    },
    get() {
      this.$store.dispatch("show", true);
      firebase
        .database()
        .ref("weblinks")
        .child(this.id)
        .once("value")
        .then(data => {
          this.weblinks = data.val();
          this.list = this.weblinks;
          return firebase
            .database()
            .ref("videolinks")
            .child(this.id)
            .once("value");
        })
        .then(data => {
          this.videolinks = data.val();
          return firebase
            .database()
            .ref("suggestions")
            .child(this.id)
            .once("value");
        })
        .then(data => {
          this.suggestions = data.val();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    id: function() {
      this.get();
    }
  }
};
</script>

<style>
.fixed {
  position: sticky;
  top: 80px;
  overflow: hidden;
  z-index: 2;
}
</style>