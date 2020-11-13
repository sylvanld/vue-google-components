<template>
  <v-autocomplete
    :readonly="readonly"
    v-model="selectedPlaceName"
    :label="label"
    :loading="loading"
    :items="candidatesNames"
    :search-input.sync="queryAddress"
    cache-items
    hide-no-data
    hide-details
  ></v-autocomplete>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import GoogleMapsService from "../services/google-maps";
import { Place } from "../types";

@Component({
  computed: {},
})
export default class GooglePlaceAutocomplete extends Vue {
  private readonly = true;
  private queryAddress = "";
  private selectedPlaceName: string | null = null;

  private loading = false;
  private candidates: Place[] = [];

  private lastInputTimestamp = new Date().getTime();
  private deltaCounter = 0;

  @Prop({ required: true })
  private value!: Place;

  @Prop({ required: false, default: "Search for a place" })
  private label!: string;

  get candidatesNames() {
    return this.candidates.map((candidate) => candidate.name);
  }

  /**
   * Disable readonly mode when google SDK is loaded.
   */
  mounted() {
    GoogleMapsService.ready.then(() => {
      this.readonly = false;
    });
  }

  /**
   *
   */
  @Watch("selectedPlaceName")
  onSelectedPlaceNameChange(newName: string) {
    const place: Place = this.candidates.filter(
      (item: Place) => item.name === newName
    )[0];
    // emit selected place object
    this.$emit("input", place);
  }

  /**
   *
   */
  @Watch("queryAddress")
  private onQueryChange(query: string) {
    const maxIgnoredInput = 10;

    if (query && query !== this.selectedPlaceName) {
      if (query.length > 5) {
        this.lazyQuerySelections(query);
      } else if (this.deltaCounter > maxIgnoredInput) {
        this.deltaCounter = 0;
        this.querySelections(query);
      } else {
        this.deltaCounter++;
      }
    }
  }

  /**
   * Called when user tipes to determine wether querySelections
   * should be called or not. (Manage lazy loading)
   */
  lazyQuerySelections(query: string) {
    const timeout = 300;
    const currentTimestamp = new Date().getTime();

    // lastInput was less than timeout ago
    if (currentTimestamp - this.lastInputTimestamp < timeout) {
      console.log(`Refresh will be triggered in ${timeout} seconds`);
      setTimeout(() => {
        if (this.lastInputTimestamp === currentTimestamp) {
          // called after user stoped tiping for <timeout> ms
          this.querySelections(query);
        }
      }, timeout);
    }

    this.lastInputTimestamp = currentTimestamp;
  }

  /**
   * Query google places API to retrieve new suggestions
   */
  querySelections(query: string) {
    this.loading = true;
    GoogleMapsService.searchPlace(query).then((candidates) => {
      this.candidates = candidates;
      this.loading = false;
    });
  }
}
</script>