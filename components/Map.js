import React, { useState } from 'react'
import { Map, Raster, Line } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'


const MapComponent = () => {
 
  const ZARR_SOURCE = "https://webmap-storage.s3.us-east-1.amazonaws.com/maroc_climate/maroc_climate"
  

  const [variable, setVariable] = useState('tavg') 
  
  const colormapName = variable === 'tavg' ? 'warm' : 'cool'
  const colormap = useColormap(colormapName)


  const getClim = () => {
    switch(variable) {
      case 'tavg': return [270, 315]   
      case 'prec': return [0, 30]      
      case 'windsp': return [0, 10]    
      default: return [0, 1]
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1b1b1b', position: 'relative' }}>
      <Map zoom={5} center={[31.5, -7]}>
        <Line
          color="white"
          source="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
        />
        
        <Raster
          key={variable} 
          source={ZARR_SOURCE}
          variable={'climate'} 
          selector={{ band: variable }} 
          colormap={colormap}
          clim={getClim()}
          opacity={1}
          mode="texture"
        />
      </Map>

      {/* Interface Mise à jour */}
      <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(0,0,0,0.8)', padding: 15, borderRadius: 8, color: 'white' }}>
          <h3>Météo Maroc (S3)</h3>
          <select 
            onChange={(e) => setVariable(e.target.value)} 
            value={variable}
            style={{ background: '#333', color: 'white', border: '1px solid gray', padding: '5px' }}
          >
              <option value="tavg">Température (tavg)</option>
              <option value="prec">Précipitations (prec)</option>
              <option value="windsp">Vent (windsp)</option>
          </select>
      </div>
    </div>
  )
}

export default MapComponent
