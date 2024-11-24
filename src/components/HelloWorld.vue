<script setup>
import { ref } from "vue";
import { SampleFormat, FingerprintReader } from "@digitalpersona/devices";
import { onMounted } from "vue";

const reader = new FingerprintReader();
const fingerprintImage = ref("");

const capture = () => {
  reader
    .startAcquisition(SampleFormat.PngImage)
    .then((response) => {
      console.log("Starting capture");
      console.log(response);
    })
    .catch((error) => console.log(error));
};

onMounted(() => {
  reader.on("DeviceConnected", (event) => {
    console.log("Device connected", event);
  });
  reader.on("SamplesAcquired", (event) => {
    let base64 = event.samples[0];
    base64 = base64.replace(/_/g, "/");
    base64 = base64.replace(/-/g, "+");
    fingerprintImage.value = `data:image/png;base64,${base64}`;
  });
  reader.on("AcquisitionStarted", (event) => {
    console.log("Acquisition started", event);
  });
  reader.on("AcquisitionStopped", (event) => {
    console.log("Acquisition stopped", event);
  });
});
</script>

<template>
  <button @click="capture">Start Capturing Fingerprint</button>

  <div v-if="fingerprintImage">
    <img :src="fingerprintImage" alt="Fingerprint" />
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
