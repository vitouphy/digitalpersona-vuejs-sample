<script setup>
import { ref } from "vue";
import {
  SampleFormat,
  AcquisitionStarted,
  DeviceConnected,
  DeviceDisconnected,
  FingerprintReader,
} from "@digitalpersona/devices";
import { onBeforeMount, onMounted, onUnmounted } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
const reader = new FingerprintReader();
const fingerprintImage = ref("");

const capture = () => {
  console.log("capture");
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
    console.log("Samples acquired", event);
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
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <button @click="capture">Start Capture</button>

  <div v-if="fingerprintImage">
    <img :src="fingerprintImage" alt="Fingerprint" />
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
