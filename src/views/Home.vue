<template>
  <div>
    <v-container fluid pa-0>
      <v-layout >
      <v-flex>
    <v-sheet>
      <v-row class="adj">
        <v-flex xs6 sm6 class="text-xs-center text-sm-right pa-10">
          <v-btn
            large
            color="light-blue darken-4"
            class="white--text"
            router
            to="/topics"
            @click.native="explore"
          >Explore</v-btn>
        </v-flex>
        <v-flex xs6 sm6 class="text-xs-center text-sm-left pa-10">
          <v-btn
            large
            color="light-blue darken-4"
            class="white--text"
            router
            to="/topics"
            @click.native="contribute"
          >Contribute</v-btn>
        </v-flex>
      </v-row>
      <div id="particles-js" style="height:60vh;"></div>
    </v-sheet>
    <v-layout row >
      <v-flex xs12  >
        
          <v-card height="620px" >
            <v-card-text  class=" matter font-weight-bold">
              Whenever we start to new things many question arise in our mind like :
              <br />
              <br /><p>What are the resource available &#10067; </p>
              
              <br /><p>In that which resource is the best &#x2753; &#129300;</p>
              
              <br /><p>should I refer a video or a website or a book &#x2753;</p>
              
              <br /><p>what are some suggestions I can get before starting &#x2753; &#128580;</p>
              <br /><p>and many more ... &#x1F635;</p>
              <br />This website is one stop to answer many of these questions ...
              <br />
              <br />Feel free to Contribute in any manner and start exploring .
               <br />
              <br /> <p>Happy Learning  &#128522;</p>
            </v-card-text>
          </v-card>
       
      </v-flex>
      <!-- <v-flex xs12 >
        <div>
          <v-img :src="require('../assets/home.png')"></v-img>
        </div>
      </v-flex> -->
    </v-layout>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  mounted() {
    require("particles.js");
    this.$nextTick(() => {
      this.ParticlesJS();
    });
  },
  methods: {
    explore() {
      this.$store.dispatch("show", true);
      this.$store.dispatch("explore", true);
    },
    contribute() {
      this.$store.dispatch("show", true);
      this.$store.dispatch("explore", false);
    },
    ParticlesJS() {
      /* eslint-disable */
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 180,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#0000ff"
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 1,
            random: false,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#0000ff",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 8,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  },
  created() {
    this.$store.dispatch("show", false);
  }
};
</script>
<style >
@import url('https://fonts.googleapis.com/css?family=Artifika');

.matter {
    font-family: 'Artifika';
    color: rgb(5, 5, 5);
    font-weight: 300;
     font-size: 20px;
     text-align: center;
}
#particles-js {
  width: 100%;
  height: 100%;
  /* background: #000000; */
  background-image: linear-gradient(
    to bottom right,
    rgb(250, 250, 246),
    rgb(255, 196, 4),
    #ffffff
  );
}
.grad {
  background-image: linear-gradient(
    to bottom right,
    rgb(250, 250, 246),
    rgb(255, 196, 4),
    white
  );
}

.adj {
  position: absolute;
  top: 40vh;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
}

</style>