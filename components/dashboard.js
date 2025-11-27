import React, { useState } from 'react';
import { Box, Select, Slider, Label } from 'theme-ui'; 
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- DONNÉES AGRÉGÉES STATIQUES ---
const INITIAL_AGGREGATED_DATA = {
    "tavg": { "1": 12.05, "2": 13.61, "3": 15.94, "4": 17.98, "5": 20.52, "6": 23.84, "7": 26.79, "8": 27.02, "9": 24.55, "10": 20.65, "11": 16.36, "12": 12.93 },
    "prec": { "1": 24.22, "2": 23.61, "3": 23.67, "4": 19.89, "5": 12.02, "6": 4.83, "7": 1.69, "8": 3.34, "9": 10.76, "10": 17.90, "11": 25.40, "12": 29.69 },
    "windsp": { "1": 3.5, "2": 3.8, "3": 4.1, "4": 4.0, "5": 3.7, "6": 3.5, "7": 3.2, "8": 3.1, "9": 3.3, "10": 3.6, "11": 3.8, "12": 3.7 },
    "srad": { "1": 100, "2": 130, "3": 180, "4": 220, "5": 250, "6": 280, "7": 270, "8": 240, "9": 190, "10": 140, "11": 110, "12": 90 },
};


const Dashboard = ({ month, setMonth, band, setBand }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [data] = useState(INITIAL_AGGREGATED_DATA); 
    const [loading] = useState(false); 

    const toggleDashboard = () => {
        setIsOpen((prev) => !prev);
    };

    // --- Logique du Graphique (inchangée) ---
    
    const chartData = data && data[band]
        ? Object.keys(data[band]).map((m) => ({
            month: m,
            value: data[band][m],
        }))
        : [];

    const lineColors = {
        tavg: 'red', prec: 'blue', windsp: 'green', srad: 'url(#gradient)',
    };
    const yAxisLabel = {
        tavg: 'Temperature (°C)', prec: 'Precipitation (mm)', windsp: 'Wind Speed (m/s)', srad: 'Solar Radiation (W/m²)',
    };
    const axisTextColor = '#333';

    // Créer un tableau de 1 à 12 pour les mois
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <>
            {/* 1. TITRE CENTRÉ ET STYLISÉ */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '15px',
                    left: '50%',
                    transform: 'translateX(-50%)', 
                    zIndex: 999, 
                    color: 'primary', 
                    bg: 'rgba(0, 0, 0, 0.6)', 
                    p: [2, 3],
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                }}
            >
                <h1 
                    sx={{ 
                        m: 0, 
                        fontSize: [3, 4, 5], 
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                >
                    Carte Interactive du Climat du Maroc 2004
                </h1>
            </Box>

            {/* 2. CARRE DES AUTEURS (Coin supérieur gauche) */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '15px',
                    left: '15px',
                    zIndex: 999, 
                    color: 'white',
                    bg: 'rgba(0, 0, 0, 0.7)', 
                    p: 3,
                    borderRadius: '5px',
                    fontSize: [1, 2],
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                    pointerEvents: 'none', 
                }}
            >
                <h4 sx={{ mt: 0, mb: 2 }}>Travail effectué par</h4>
                <Box 
                    as="ul" 
                    sx={{ 
                        listStyle: 'none', 
                        m: 0, 
                        p: 0, 
                        color: 'white',
                        // MODIFICATION: Ajout de la police monospace pour le style "code/gaming"
                        fontFamily: 'monospace',
                    }}
                >
                    <li>Zarakia Benlarbi</li>
                    <li>Ahddar Ikram</li>
                    <li>Sebiti Nouhaila</li>
                    <li>Boutouba Safaa</li>
                </Box>
            </Box>


            {/* 3. BOUTON D'OUVERTURE DU DASHBOARD */}
            <Box
                as="button"
                onClick={toggleDashboard}
                sx={{
                    position: 'fixed',
                    top: '1rem',
                    right: isOpen ? '50%' : '10px', 
                    transition: 'right 0.3s ease-in-out',
                    zIndex: 1001,
                    bg: 'primary',
                    color: 'white',
                    borderRadius: '5px',
                    p: 3,
                    cursor: 'pointer',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    fontSize: [2, 2, 2, 3],
                }}
            >
                <span sx={{ textTransform: 'uppercase' }}>
                    {isOpen ? 'Close Analysis' : 'Open Analysis'}
                </span>
            </Box>

            {/* 4. PANNEAU PRINCIPAL (Dashboard/Analyse) */}
            <Box
                sx={{
                    bg: 'background',
                    color: 'text',
                    p: 4,
                    width: '50%',
                    height: '100%',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    overflowY: 'auto',
                    zIndex: 1000,
                    boxShadow: '-2px 0px 5px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h2 sx={{ textTransform: 'uppercase', fontSize: 3 }}>Analyse des Variables Climatiques </h2>

                {/* Contrôles Fusionnés */}
                <Box sx={{ p: 3, bg: 'muted', borderRadius: '8px', mb: 4 }}>
                    <h3 sx={{ mt: 0, mb: 3 }}> Contrôles de la carte et du graphique</h3>
                    
                    {/* Sélecteur de Variable Climatique */}
                    <Box sx={{ mb: 4 }}>
                        <Label>Variable</Label>
                        <Select value={band} onChange={e => setBand(e.target.value)} sx={{ bg: '#333' }}>
                            <option value="tavg">Température Moyenne (tavg)</option>
                            <option value="prec">Précipitations (prec)</option>
                            <option value="windsp">Vitesse du Vent (windsp)</option>
                            <option value="srad">Rayonnement Solaire (srad)</option>
                        </Select>
                    </Box>

                    {/* Boutons Mois */}
                    <Box sx={{ mb: 3 }}>
                        <Label sx={{ mb: 2 }}>Mois actuellement sélectionné: {month}</Label>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {months.map((m) => (
                                <Box
                                    key={m}
                                    as="button"
                                    onClick={() => setMonth(m)}
                                    sx={{
                                        width: ['30px', '35px'], 
                                        height: ['30px', '35px'], 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        fontWeight: 'bold',
                                        fontSize: [1, 2],
                                        p: 0,
                                        border: '1px solid',
                                        
                                        borderColor: m === month ? 'primary' : 'text',
                                        bg: m === month ? 'primary' : 'background',
                                        color: m === month ? 'background' : 'text',
                                        
                                        '&:hover': {
                                            opacity: 0.8,
                                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                                        },
                                    }}
                                >
                                    {m}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                
                {/* Zone d'Affichage du Graphique */}
                {data && data[band] && (
                    <>
                        {/* Dégradé pour le rayonnement solaire */}
                        {band === 'srad' && (
                            <svg width="0" height="0">
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: 'orange', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        )}

                        {/* Graphique en Aires (Area Chart) */}
                        <ResponsiveContainer width="100%" height={400}> 
                            <AreaChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    stroke={axisTextColor}
                                    tick={{ fontSize: 10 }}
                                    label={{ value: 'Mois', fontSize: 14, position: 'insideBottom', offset: 0, fill: axisTextColor }}
                                />
                                <YAxis
                                    stroke={axisTextColor}
                                    tick={{ fontSize: 10 }}
                                    label={{
                                        value: yAxisLabel[band],
                                        fontSize: 14, angle: -90, position: 'insideLeft', dx: 10, fill: axisTextColor
                                    }}
                                />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    name={yAxisLabel[band]}
                                    stroke={lineColors[band]}
                                    fill={lineColors[band]}
                                    fillOpacity={0.3}
                                    activeDot={{ r: 8 }}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </>
                )}
            </Box>
        </>
    );
};

export default Dashboard;