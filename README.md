# DigitalPersona Fingerprint Reader for Vue 3

This project demonstrates how to integrate the DigitalPersona Fingerprint Reader (U.are.U 4500) with Vue 3. While the existing tutorials were straightforward for VueJS integration, we've documented our working solution to help others integrate fingerprint scanning capabilities into their Vue applications.

## Prerequisites

- Windows OS (Driver support is primarily for Windows)
- DigitalPersona U.are.U 4500 Fingerprint Reader
- Node.js and npm installed
- Vue 3 project (we used Vite as the build tool)

## Installation

1. Install the DigitalPersona U.are.U 4500 driver for Windows:

   - Download the [driver](https://www.hidglobal.com/de/media/4502) from the official DigitalPersona website 
   - Run the installer and follow the setup wizard
   - Download [DigitalPersona Lite Client](https://crossmatch.hid.gl/lite-client)
   - Connect your fingerprint reader device
   - Verify that Windows recognizes the device in Device Manager

2. Clone the repository
3. Install dependencies:

```bash
pnpm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```
http://localhost:5173
```

6. Test the fingerprint reader:
   - Click the "Start Capturing Fingerprint" button
   - Place your finger on the reader
   - The captured fingerprint image should appear on the screen

Note: If you encounter any issues:

- Make sure the fingerprint reader is properly connected
- Check that the driver is correctly installed
- Check the browser console for any error messages

## How to integrate into your project

1. Install the DigitalPersona device library:

```bash
npm install @digitalpersona/devices
```

2. Copy the `WebSdk` folder to your project's `src/modules/` directory

3. Update your `index.html` to include the WebSDK script:

```html
<script src="/src/modules/WebSdk/index.js"></script>
```

4. Configure Vite by adding the following to your `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ["WebSdk"],
  },
  resolve: {
    alias: {
      WebSdk: "/src/modules/WebSdk/index.js",
    },
  },
});
```

5. Manually fix the runtime error
   We needed to add the following line to `WebSdk/index.js` to resolve a runtime error:

```javascript
root = root || (typeof window !== "undefined" ? window : global);
return (root.ifvisible = factory());
```

This fix was suggested by an LLM and works for our use case.

## Examples

Here's a basic example of how to use the fingerprint reader:

```vue
<script setup>
import { ref } from "vue";
import { SampleFormat, FingerprintReader } from "@digitalpersona/devices";

const reader = new FingerprintReader();
const fingerprintImage = ref("");

const capture = () => {
  reader
    .startAcquisition(SampleFormat.PngImage)
    .then((response) => console.log("Starting capture"))
    .catch((error) => console.log(error));
};

onMounted(() => {
  reader.on("SamplesAcquired", (event) => {
    let base64 = event.samples[0];
    base64 = base64.replace(/_/g, "/");
    base64 = base64.replace(/-/g, "+");
    fingerprintImage.value = `data:image/png;base64,${base64}`;
  });
});
</script>

<template>
  <button @click="capture">Start Capturing Fingerprint</button>
  <div v-if="fingerprintImage">
    <img :src="fingerprintImage" alt="Fingerprint" />
  </div>
</template>
```

## Known Limitations

- This implementation has been tested only on Windows
- The DigitalPersona drivers are primarily designed for Windows OS
- Mac OS support is uncertain and untested

## References
- https://hidglobal.github.io/digitalpersona-devices/tutorial.html

## Contributing

Feel free to submit issues and enhancement requests!
