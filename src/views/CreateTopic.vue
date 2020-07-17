<template>
  <v-container   pa-10>
    <v-layout row ma-5>
      <v-flex xs12 sm6 offset-sm3>
        <h1>CREATE A NEW TOPIC</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex sm6 offset-sm3>
        <v-form lazy-validation @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="title"
                 clearable
                label="Title"
                :rules="[v => !!v || 'This Feild is required']"
                id="title"
                required
                outlined
                v-model="title"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-textarea
                outlined
                name="description"
                label="Topic Description"
                id="description"
                :rules="[v => !!v || 'This Feild  is required']"
                required
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row mt-5>
            <v-flex xs12>
              <v-text-field
                name="url"
                label="Image url (relevent to topic)"
                clearable
                id="url"
                outlined
                v-model="imageurl"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 v-if="imageurl">
              <img :src="imageurl" height="150px" width="150px" />
            </v-flex>
          </v-layout>
          <v-layout row ma-5>
            <v-flex xs12>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <vue-tags-input
                    v-bind="attrs"
                    v-on="on"
                    required
                    v-model="tag"
                    :tags="tags"
                    @tags-changed="newTags => tags = newTags"
                  />
                </template>
                <span>hit enter after writing tag</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-btn type="submit" class="primary">Create</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
     <v-sheet height="150px">

    </v-sheet>
  </v-container>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  components: {
    VueTagsInput
  },
      computed :{
      formIsValid() {
      return (
        this.title!= "" &&
        this.description != ""
      );
    },
  },
  data() {
    return {
      tag: "",
      tags: [],
      title: "",
      description: "",
      imageurl: null
    };
  },
  methods: {
    onCreateMeetup() {
       if (!this.formIsValid) {
          this.$store.dispatch("snackbar", {
           show1 : true ,
           message : "Please Fill the form completely"
         });
        return;
      }
      const topic = {
        title: this.title,
        imageurl: this.imageurl,
        description: this.description,
        tags: this.tags
      };
      this.$store.dispatch("createTopic", topic);
      
    }
  }
};
</script>

<style scoped>
</style>