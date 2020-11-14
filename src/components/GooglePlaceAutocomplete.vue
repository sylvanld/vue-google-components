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
import { GPlace } from "../types";

@Component({
  computed: {},
})
export default class GooglePlaceAutocomplete extends Vue {
  private readonly = true;
  private queryAddress = "";
  private selectedPlaceName: string | null = null;

  private loading = false;
  private candidates: GPlace[] = [];

  private lastInputTimestamp = new Date().getTime();
  private deltaCounter = 0;

  @Prop({ required: true })
  private value!: GPlace;

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
    const place: GPlace = this.candidates.filter(
      (item) => item.name === newName
    )[0];
    // emit selected place object
    this.$emit("input", place);
  }

  /**
   * Determine wether querySelections should be called or not. (Manage lazy loading)
   */
  @Watch("queryAddress")
  private onQueryChange(query: string) {
    const timeout = 300;
    const maxIgnoredInput = 10;
    const minQuerySize = 5;

    const currentTimestamp = new Date().getTime();

    /**
     * check if query exists and has changed
     * don't perform search if query is too small
     * don't perform search for now if user is tiping
     * */
    //
    if (
      query &&
      query !== this.selectedPlaceName &&
      query.length > minQuerySize &&
      currentTimestamp - this.lastInputTimestamp < timeout
    ) {
      setTimeout(() => {
        if (this.lastInputTimestamp === currentTimestamp) {
          // called after user stoped tiping for <timeout> ms
          this.querySelections(query);
        }
      }, timeout);
    } else if (this.deltaCounter > maxIgnoredInput) {
      this.deltaCounter = 0;
      this.querySelections(query);
    } else {
      this.deltaCounter++;
    }

    this.lastInputTimestamp = currentTimestamp;
  }

  //lazyQuerySelections(query: string) {}

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