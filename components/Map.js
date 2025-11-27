import React, { useState } from 'react'
import { Map, Raster, Line } from '@carbonplan/maps'
import { useColormap } from '@carbonplan/colormaps'
// Note: Le ThemeProvider est déjà dans _app.js, pas besoin de le remettre ici, 
// mais on peut le laisser pour être sûr que ce composant est autonome.

const MapComponent = () => {
  // 1. SOURCE S3 DE L'AUTRE GROUPE
  const ZARR_SOURCE = "https://webmap-storage.s3.us-east-1.amazonaws.com/maroc_climate/maroc_climate"
  
  // 2. NOMS DES VARIABLES (Doivent matcher leur fichier Zarr)
  // D'après leur code, ils utilisent : 'tavg' (Temp), 'prec' (Pluie), 'windsp' (Vent)
  const [variable, setVariable] = useState('tavg') 
  
  const colormapName = variable === 'tavg' ? 'warm' : 'cool'
  const colormap = useColormap(colormapName)

  // 3. ÉCHELLES ADAPTÉES
  const getClim = () => {
    switch(variable) {
      case 'tavg': return [270, 315]   // Kelvin (ou [0, 40] si c'est °C, à tester)
      case 'prec': return [0, 30]      // Précipitations
      case 'windsp': return [0, 10]    // Vitesse vent
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
          key={variable} // Force le rafraîchissement
          source={ZARR_SOURCE}
          variable={'climate'} 
          selector={{ band: variable }} // 'tavg', 'prec', ou 'windsp'
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