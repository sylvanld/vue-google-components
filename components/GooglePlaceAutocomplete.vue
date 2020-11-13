<template>
  <v-autocomplete
    v-model="select"
    :label="label"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    hide-no-data
    hide-details
  ></v-autocomplete>
</template>

<script>
export default {
  props: {
    label: {
      required: false,
      default: "Hello bitches",
    },
  },
  data() {
    return {
      lastInputDate: new Date(),
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
    };
  },
  watch: {
    search(val) {
      if (val && val !== this.select && val.length > 5) {
        this.lazyQuerySelections(val);
      }
    },
  },
  methods: {
    lazyQuerySelections(v) {
      const timeout = 300;
      const localLastInputDate = new Date();

      // lastInput was less than timeout ago
      if (new Date() - this.lastInputDate < timeout) {
        console.log(`Refresh will be triggered in ${timeout} seconds`);
        setTimeout(() => {
          // wait until user stop tiping so quickly
          if (this.lastInputDate === localLastInputDate) {
            this.querySelections(v);
          }
        }, timeout);
      }

      this.lastInputDate = localLastInputDate;
    },
    querySelections(v) {
      this.loading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
  },
};
</script>