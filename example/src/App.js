import React from 'react'

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
