# Vuetify Google components

> Defines a set of reusable components designed using vuetify, that has built in interactions with Google's APIs.

## Table of contents

- [Vuetify Google components](#vuetify-google-components)
  - [Table of contents](#table-of-contents)
  - [How to use ?](#how-to-use-)
    - [Requirements](#requirements)
    - [Installation](#installation)
  - [Available components](#available-components)
    - [Autocomplete](#autocomplete)
      - [Example usage](#example-usage)
      - [Lazy loading explained](#lazy-loading-explained)

## How to use ?

### Requirements

In order to use this library, you have to properly configure the following
- vuetify (used to style components)


### Installation

Register `VuetifyGoogleComponents` in your `vue.js` application.

```typescript
import Vue from 'vue'
import VuetifyGoogleComponents from './path/to/vuetify-google-components'

Vue.use(VuetifyGoogleComponents, {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY
})

```

> Here I assume you provided an environment variable named `VUE_APP_GOOGLE_API_KEY` containing a valid api key [provided by google](https://developers.google.com/maps/documentation/javascript/get-api-key)


## Available components

### Autocomplete

#### Example usage

```html
<template>
  <google-place-autocomplete />
</template>
```

#### Lazy loading explained

To optimize your google API key's quotas, you don't want to call google search api each time the query changes. That's why autocomplete suggestions are lazy loaded according to the following principle.



![autocomplete-lazy-loading](docs/images/autocomplete-lazy-loading.png)