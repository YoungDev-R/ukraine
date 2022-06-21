import React from 'react'
import { Marker } from 'react-map-gl'
import { Box, Typography } from '@mui/material'


const MapMarkers = ({ data, currentObjectId, zoom }) => {
	
	return (

		<>
			{data.map((row, idx) => (
				<Marker
					latitude={row.y}
					longitude={row.x}
					anchor="bottom"
					offset={[0, -40]}
					key={'marker-' + idx}
					style={{
						display:
							zoom > 11.5 || currentObjectId === row.id
								? 'initial'
								: 'none'
					}}
				>
					<Box
						sx={{
							padding: '.5em',
							boxShadow: '0px 0px 10px rgba(0,0,0,0.9)',
							background: '#192432',
							pointerEvents: 'none',
							zIndex: 500000
						}}
					>
						<Typography sx={{ lineHeight: 1 }} color="primary">
							<b>{row.type.toLowerCase()}</b> <br />
							{row.time.toLocaleDateString()}
							<br />
							<br />
							{Math.round(row.x * 100000) / 100000},
							{Math.round(row.y * 100000) / 100000}
							<br />
							<b>Confidence Radius:</b> {Math.round(row.radius)}m{' '}
						</Typography>
					</Box>
				</Marker>




			))}

{/* // microphones */}


<Marker longitude={30.478564646609467} latitude={50.477071731606436} anchor="center" >
      <img src="/img/M2.gif"  width="120px" height="120px"/>

    </Marker>

	<Marker longitude={30.495924862907867} latitude={50.45768392698767} anchor="center" >
      <img src="/img/M2.gif"  width="120px" height="120px"/>
    </Marker>

	<Marker longitude={30.526200359072046} latitude={50.39232035125169} anchor="center" >
      <img src="/img/M2.gif"  width="120px" height="120px"/>
    </Marker>

{/* // microphones */}




	<Marker longitude={30.526200359072046} latitude={50.39232035125169} anchor="center" >
      <img src="/img/mic.png" width='20px' height="20px"/>
	  
    </Marker>

	<Marker longitude={30.478564646609467} latitude={50.477071731606436} anchor="center" >
      <img src="/img/mic.png" width='20px' height="20px"/>
    </Marker>

	<Marker longitude={30.495924862907867} latitude={50.45768392698767} anchor="center" >
      <img src="/img/mic.png" width='20px'  height="20px"/>
    </Marker>




		</>



	)
}

export default React.memo(MapMarkers)
