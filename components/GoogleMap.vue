<template>
  <v-responsive :aspect-ratio="16 / 9">
    <div id="map" ref="map" style="height: 100%"></div>
  </v-responsive>
</template>


<script type="javascript">
import GoogleMapsService from "../services/google-maps";

export default {
  props: {
    place: {
      required: true,
    },
    center: { required: false },
    markerLabel: {
      required: false,
      default: "Location",
    },
  },
  mounted() {
    this.$google.then(() => {
      this.renderMap();
    });
  },
  watch: {
    place: {
      handler: () => {
        this.renderMap();
      },
    },
  },
  methods: {
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
    },
  },
};
</script>