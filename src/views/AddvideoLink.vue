<template>
  <v-container outlined mb-10 pa-10>
    <v-layout row ma-5>
      <v-flex xs12 sm6 offset-sm3>
        <h1>ADD A VIDEO LINK</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex sm6 offset-sm3>
        <v-form lazy-validation @submit.prevent="onCreateLink">
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                name="link"
                label="Link"
                 clearable
                :rules="[v => !!validateurl(v) || 'Please Enter a valid url']"
                id="link"
                required
                outlined
                v-model="link"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-textarea
                outlined
                name="description"
                label="Description"
                id="description"
                :rules="[v => !!v || 'This Feild  is required']"
                required
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row ma-5>
            <v-flex xs12>
              <v-col cols="12">
                <v-combobox v-model="select" :items="items" label="Recommended for " outlined chips>
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="light-blue darken-4 white--text"
                        left
                        v-text="data.item.slice(0, 1).toUpperCase()"
                      ></v-avatar>
                      {{ data.item }}
                    </v-chip>
                  </template>
                </v-combobox>
              </v-col>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                outlined
                 clearable
                name="name"
                label="Your Name "
                id="name"
                 :rules="[v => !!v || 'This Feild  is required']"
                required
                v-model="name"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-btn type="submit" class="primary">ADD</v-btn>
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

export default {
  props: ["id"],
  data() {
    return {
      items: ["beginner", "intermediate", "expert", "all"],
      link: "",
      description: "",
      name: "",
      select: ""
    };
  },
  computed :{
      formIsValid() {
      return (
        this.link != "" &&
        this.description != "" &&
        this.name != "" 
        
      );
    },
  },
 
  methods: {
    onCreateLink() {
       if (!this.formIsValid) {
          this.$store.dispatch("snackbar", {
           show1 : true ,
           message : "Please Fill the form completely"
         });
        return;
      }
      const videolink = {
        id: this.id,
        link: this.link,
        name: this.name,
        description: this.description,
        tag: this.select,
        likes: 0
      };
      var result = this.validateurl(this.link);
      if (!result) {
        this.$store.dispatch("snackbar", {
          show1: true,
          message: "Please Enter a valid url "
        });
        return;
      }
      this.$store.dispatch("addvideoLink", videolink);
      
      this.$router.push("/topic/" + this.id);
    },
    validateurl(url) {
      var re = /^(ftp|http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/;
      if (re.test(url)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>