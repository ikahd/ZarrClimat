import { Box, Flex, Select, Slider, Label } from 'theme-ui'

const ParameterControls = ({ getters, setters }) => {
  const { opacity, month, band } = getters
  const { setOpacity, setMonth, setBand } = setters

  return (
    <Box sx={{ position: 'absolute', top: 20, right: 20, width: 250, bg: 'rgba(0,0,0,0.7)', p: 3, borderRadius: 4, color: 'white' }}>
      <Box sx={{ mb: 3 }}>
        <Label>Variable</Label>
        <Select value={band} onChange={(e) => setBand(e.target.value)} sx={{ color: 'white', bg: 'black' }}>
          <option value="tavg">Température</option>
          <option value="prec">Précipitations</option>
          <option value="windsp">Vent</option>
          <option value="srad">Radiation Solaire</option>
        </Select>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Label>Mois ({month})</Label>
        <Slider 
          min={1} max={12} step={1} 
          value={month} 
          onChange={(e) => setMonth(parseFloat(e.target.value))} 
        />
      </Box>

      <Box>
        <Label>Opacité ({opacity})</Label>
        <Slider 
          min={0} max={1} step={0.1} 
          value={opacity} 
          onChange={(e) => setOpacity(parseFloat(e.target.value))} 
        />
      </Box>
    </Box>
  )
}

export default ParameterControls