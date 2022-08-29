import { useEffect, useState } from 'react';
import './App.css';
import Map from './Map'

function App() {
  const [base, setBase] = useState([])
  const [values, setValues] = useState([])

  const width = 1200;
  const height = 600;
  const padding = 60;

  useEffect(()=> {
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
      .then(response => response.json())
      .then(data =>{
        setBase(data.baseTemperature)
        setValues(data.monthlyVariance)
      })
  }, [])


  return (
    <div className="main--container">
      <h1 id='title'>Monthly Global Land-Surface Temperature</h1>
      <h3 id='description'>1753 - 2015: base temperature 8.66℃</h3>
      <div id='tooltip'>

      </div>
      <Map
        width={width}
        height={height}
        padding={padding}
        base={base}
        values={values}
      />
      <svg id='legend'>
          <g>
              <rect x="10" y="0" width="40" height="40" fill="SteelBlue"></rect>
              <text x="60" y="20" fill="black">Variance of -1 or less</text>
          </g>
          <g>
              <rect x="10" y="40" width="40" height="40" fill="LightSteelBlue"></rect>
              <text x="60" y="60" fill="black">On or Below Average</text>
          </g>
          <g>
              <rect x="10" y="80" width="40" height="40" fill="Orange"></rect>
              <text x="60" y="100" fill="black">Above Average</text>
          </g>
          <g>
              <rect x="10" y="120" width="40" height="40" fill="Crimson"></rect>
              <text x="60" y="140" fill="black">Variance of +1 or more</text>
          </g>
      </svg>
    </div>
  );
}

export default App;
