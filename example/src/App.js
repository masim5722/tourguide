import React from 'react'

import 'tourguide/dist/index.css'
import TourGuide from 'tourguide'


const App = () => {
  return <TourGuide page="demo"
                    system={3}
                    employeeId="0"
                    startbutton={true}
                    endbutton={true}
  />
}

export default App
