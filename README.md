# Vue Google components

> Defines a set of reusable components designed using vuetify, that has built in interactions with Google's APIs.

## Table of contents

- [Vue Google components](#vue-google-components)
  - [Table of contents](#table-of-contents)
  - [How to use ?](#how-to-use-)
    - [Requirements](#requirements)
    - [Installation](#installation)
  - [Components](#components)
    - [Autocomplete](#autocomplete)
      - [Lazy loading](#lazy-loading)

## How to use ?

### Requirements

In order to use this library, you have to properly configure the following
- vuetify (used to style components)


### Installation

Register `VueGoogleComponents` in your `vue.js` application.

```typescript
import Vue from 'vue'
import VueGoogleComponents from './path/to/vue-google-components'

Vue.use(VueGoogleComponents)
```

Then components provided by the library are available.

## Components

### Autocomplete

#### Lazy loading

To optimize your google API key's quotas, you don't want to call google search api each time the query changes. That's why autocomplete suggestions are lazy loaded according to the following principle.



![autocomplete-lazy-loading](docs/images/autocomplete-lazy-loading.png)