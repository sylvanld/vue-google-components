<template>
  <v-autocomplete
    :readonly="readonly"
    v-model="select"
    :label="label"
    :loading="loading"
    :items="itemsNames"
    :search-input.sync="search"
    cache-items
    hide-no-data
    hide-details
  ></v-autocomplete>
</template>

<script>
import GoogleMapsService from "../services/google-maps";

export default {
  props: {
    value: {
      required: true,
    },
    label: {
      required: false,
      default: "Search for a place",
    },
  },
  data() {
    return {
      readonly: true,
      lastInputDate: new Date(),
      ignoredInputCounter: 0,
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  mounted() {
    // enable tiping only when google library is loaded
    this.$google.then(() => {
      this.readonly = false;
    });
  },
  computed: {
    itemsNames() {
      return this.items.map((item) => item.name);
    },
  },
  watch: {
    select(newValue) {
      console.log(this.items);
      const place = this.items.filter((item) => item.name === newValue)[0];
      console.log("emit place");
      this.$emit("input", place);
    },
    search(val) {
      const maxIgnoredInput = 10;

      if (val && val !== this.select) {
        if (val.length > 5) {
          this.lazyQuerySelections(val);
        } else if (this.ignoredInputCounter > maxIgnoredInput) {
          this.ignoredInputCounter = 0;
          this.querySelections(val);
        } else {
          this.ignoredInputCounter++;
        }
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

    querySelections(query) {
      this.loading = true;
      GoogleMapsService.searchPlace(query).then((candidates) => {
        this.items = candidates;
        this.loading = false;
      });
    },
  },
};
</script>