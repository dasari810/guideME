<template>
  <v-app>
    <v-layout d-flex align-space-around justify-center column class="items">
      <v-navigation-drawer temporary v-model="sideNav" transition="fab-transition" app>
        <v-list rounded>
          <v-subheader>TOPICS</v-subheader>
          <v-list-item-group color="primary">
            <div v-for="item in topics" :key="item.id">
              <v-list-item :to="'/topic/'+item.id">
                <v-list-item-icon>
                  <v-icon color="light-blue darken-4">mdi-book-open-page-variant</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider width="300px"></v-divider>
            </div>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
    <div>
      <v-app-bar color="light-blue darken-4" height="80px" dense dark elevate-on-scroll fixed>
        <v-app-bar-nav-icon color="white" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        <v-divider class="mx-2" inset vertical color="white"></v-divider>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor:pointer">
            <h2 class="font">guideME</h2>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom v-if="show">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="white blue--text"
              v-if="show"
              @click="mode"
              v-bind="attrs"
              v-on="on"
              to="/topics"
            >{{ explore ? "Contribute" : "Explore" }}</v-btn>
          </template>
          <span>{{ explore ? "Start Contributing" : "Start Exploring" }}</span>
        </v-tooltip>
        <v-divider class="mx-1" inset vertical color="white"></v-divider>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="white blue--text" v-bind="attrs" v-on="on" to="/contributors">Contributors</v-btn>
          </template>
          <span>see who Contributed</span>
        </v-tooltip>
      </v-app-bar>
      <div mt-5>
        <router-view class="main"></router-view>
      </div>
    </div>
    <v-snackbar
      v-if="snackbar.show1"
      :app="true"
      v-model="snackbar.show1"
      :timeout="5000"
      elevation="20"
      bottom
    >
      {{ snackbar.message }}
      <v-icon>mdi-emoticon-happy-outline</v-icon>
    </v-snackbar>

    <div class="footer" v-if="!loading">
      <div style="display:inline-block">
        <v-btn
          href="https://www.facebook.com/madhavareddy.dasari.503"
          target="_blank"
          class="icon"
          icon
        >
          <v-icon size="35px" color="white">mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          icon
          class="icon"
          color="white"
          target="_blank"
          href="https://www.instagram.com/madhava_8_10/?hl=en"
        >
          <v-icon size="35px">mdi-instagram</v-icon>
        </v-btn>
        <v-btn class="icon" icon href="https://github.com/MadhavaDasari" target="_blank">
          <v-icon size="35px" color="white">mdi-github</v-icon>
        </v-btn>

        <v-btn
          icon
          href="https://www.linkedin.com/in/dasari-madhava-reddy-290b85187/"
          target="_blank"
        >
          <v-icon size="35px" color="white">mdi-linkedin</v-icon>
        </v-btn>
      </div>
      <v-col class="text-center" style="margin-bottom:10px" cols="12">
        <strong style="color:white">Madhava Dasari &copy; {{ new Date().getFullYear() }}</strong>
      </v-col>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    mode() {
      if (this.explore) {
        this.$store.dispatch("explore", false);
      } else {
        this.$store.dispatch("explore", true);
      }
    }
  },
  data() {
    return {
      sideNav: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
    };
  },
  computed: {
    show() {
      return this.$store.getters.show;
    },
    explore() {
      return this.$store.getters.explore;
    },
    topics() {
      return this.$store.getters.loadedTopics;
    },
    snackbar() {
      return this.$store.getters.snackbar;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
<style >
.footer {
  /* position: sticky; */
  left: 0;
  bottom: 0;
  /* width: 100%; */
  background-color: rgb(5, 85, 190);
  color: white;
  text-align: center;
  overflow: hidden;
  z-index: 2;
}
.center {
  padding: 100px 0;
  text-align: center;
}
.font {
  font-family: sans-serif;
  font-size: 35px;
}
.icon {
  color: white;
  size: 30px;
  margin-right: 30px;
  margin-top: 10px;
  
}
.grad {
  background-image: linear-gradient(
    to bottom right,
    rgb(250, 250, 246),
    rgb(255, 196, 4),
    white
  );
}
.fixed {
  position: sticky;
  width: 100%;

  overflow: hidden;
}
.main {
  margin-top: 80px;
}

html {
  min-width: 550px;
  position: relative;
}
</style>