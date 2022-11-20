<!--Laura set up the graph to dasboard based on the module 10 code-->
<template>
  <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
  <main>
    <div class="row justify-content-center"> <!--THIS IS TO CREATE TABLE-->
      <table class="table table-striped">
        <thead class="table-dark">
          <strong>Table </strong>
          <tr>
            <th>Event Name</th>
            <th>Total Attendees</th>
            
          </tr>
        </thead>
        <tbody>
         <tr v-for="event in Events" :key="event._id">
            <td>{{ event._id }}</td>
            <td>{{ event.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="column">
        <strong>Bar Chart </strong>
        <div>
          <div>
            <EventBar
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendees"
            ></EventBar>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
        </div>
      </div>
  </main>
</template>

<script>
import axios from "axios";

//http://localhost:3000/eventdata/eventAttendees/

import EventBar from "@/components/Bar.vue";

export default {
  components: {
    EventBar,
  },
  data() {
    return {
      labels: [], //for graph
      attendees: [], //for graph
      Events:[], // for table to store the events
      loading: false,
      error: null,
    };
  },
  created() { // this will display the data from the graph
            let apiURL = 'http://localhost:3000/eventdata/eventAttendees/';
            axios.get(apiURL).then(res => {
                this.Events = res.data;
            }).catch(error => {
                console.log(error)
            });
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = `http://localhost:3000/eventdata/eventAttendees/`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item._id);
        this.attendees = response.data.map((item) => item.total);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>


