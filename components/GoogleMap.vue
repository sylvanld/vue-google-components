<template>
  <v-responsive :aspect-ratio="16 / 9">
    <div id="map" ref="map" style="height: 100%"></div>
  </v-responsive>
</template>


<script lang="ts">
import { Place } from "../types";
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import GoogleMapsService from "../services/google-maps";

Vue.prototype.$google = null;

@Component
export default class GoogleMap extends Vue {
  @Prop({ required: true })
  private place!: Place;

  @Prop({ required: false })
  private center!: Place;

  @Prop({ required: false, default: "Location" })
  private markerLabel!: string;

  @Watch("place")
  renderMap() {
    const mapRoot = this.$el.querySelector("#map");
    console.log("render map", mapRoot, this.place);
    if (this.place) {
      GoogleMapsService.createMap({
        mapRoot: mapRoot,
        place: this.place,
        center: this.center ? this.center : this.place,
      });
    }
  }
}
</script>