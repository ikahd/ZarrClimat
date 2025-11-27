import { useState } from 'react'
import { Box, useThemeUI } from 'theme-ui'
import { Map, Fill, Line, Raster } from '@carbonplan/maps'
import { useThemedColormap } from '@carbonplan/colormaps'
import Dashboard from '../components/dashboard'


export default function Home() {
  const { theme } = useThemeUI()
  const [month, setMonth] = useState(1)
  const [band, setBand] = useState('tavg')

  const colormapName = band === 'tavg' ? 'warm' : 'cool'
  const colormap = useThemedColormap(colormapName)

  // Même échelle que leur code
  const clim = band === 'tavg' ? [-20, 30] : [0, 100]

  return (
    <Box sx={{ position: 'absolute', top: 0, bottom: 0, width: '100%' }}>
      <Map 
        zoom={5} 
        center={[31.5, -7]}
      >
        <Fill
          color={theme.rawColors.background}
          source="https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/ocean"
          variable={'ocean'}
        />
        <Line
          color={theme.rawColors.primary}
          source="https://carbonplan-maps.s3.us-west-2.amazonaws.com/basemaps/land"
          variable={'land'}
        />
        
        {/* EXACTEMENT  */}
        <Raster
          colormap={colormap}
          clim={clim}
          opacity={1}
          mode={'grid'}  
          source="https://webmap-storage.s3.us-east-1.amazonaws.com/maroc_climate/maroc_climate"
          variable={'climate'}
          selector={{ month, band }}  
        />
      </Map>
        
        <Dashboard 
          month={month} 
          setMonth={setMonth} 
          band={band} 
          setBand={setBand} 
        />
    </Box>
  )
}
