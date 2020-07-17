<template>
  <v-container outlined mb-10 pa-10>
    <v-layout row ma-5>
      <v-flex xs12 sm6 offset-sm3>
        <h1>ADD A SUGGESTION</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex sm6 offset-sm3>
        <v-form lazy-validation @submit.prevent="onCreateSuggestion">
          
          <v-layout row>
            <v-flex xs12>
              <v-textarea
                outlined
                name="suggestion"
                label="Suggestion"
                id="suggestion"
                :rules="[v => !!v || 'This Feild  is required']"
                required
                v-model="suggestion"
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
                label="Your Name"
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
    props:["id"],
  data() {
    return {
      items: ["beginner", "intermediate", "expert", "all"],
      suggestion: "",
      name : "",
      select : ""
    };
  },
    computed :{
      formIsValid() {
      return (
        this.suggestion != "" &&
        this.name != ""
        
      );
    },
  },
  methods: {
    onCreateSuggestion() {
       if (!this.formIsValid) {
          this.$store.dispatch("snackbar", {
           show1 : true ,
           message : "Please Fill the form completely"
         });
        return;
      }
        const suggestion = {
            id: this.id,
            name: this.name,
            suggestion : this.suggestion,
            tag : this.select,
        }
        this.$store.dispatch("addSuggestion",suggestion)
         this.$store.dispatch("snackbar",{
           show1 : true ,
           message : "Suggestion added succesfully !  Thanks for the contribution"
         })
         this.$router.push('/topic/'+this.id)
    }
  }
};
</script>