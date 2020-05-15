# tourguide

> Tour Guide is a private react library which is used to implement web tour in to the application

[![NPM](https://img.shields.io/npm/v/tourguide.svg)](https://www.npmjs.com/package/tourguide) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @masim5722/tourguide
```

## Usage

```jsx
import React from 'react'

import 'tourguide/dist/index.css'
import TourGuide from 'tourguide'
import config from './config'


const App = () => {
  return <TourGuide page="demo"
                    base_api_url={config.base_api_url}
                    api_secret={config.api_secret}
                    system={3}
                    employeeId="0"
                    startbutton={true}
                    endbutton={true}
  />
}

export default App

```

## config.js
Create config.js file in components folder.
```$xslt
/**
 * Configuration file for TourGuide Library
 * @type {string}
 */

// base api url
const base_api_url = <BASE API URL>;
const api_secret = <API SECRET>;

let config = {
    "base_api_url":base_api_url,
    "api_secret":api_secret,
};

export default config;

```

## License

MIT © [masim5722](https://github.com/masim5722)
