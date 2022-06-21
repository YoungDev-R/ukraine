import React from 'react'
import { Box, Typography, Modal, Button, Grid } from '@mui/material'

const modalStyling = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxWidth: '100%',
	maxHeight: '90%',
	background: '#192432',
	padding: '1em',
	color: 'white'
}

export const MethodModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<Box sx={modalStyling}>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						position: 'relative',
						paddingRight: '40px'
					}}
				>
					<Typography variant="h5" element="h1" color="primary">
					<b>Methods and Technology</b>
					</Typography>
					<br />
					<br />
					<Typography sx={{ maxWidth: '60ch' }}>
						
As the conflict in Ukraine unfolded, we realized the potential of multiple webcams with sound that can tell us a lot about what is happening on the ground. A live stream of sound information captured a various mix of urban noises - from traffic to birds. While we are not able to listen to the steam 24/7, a deep neural network can easily do it for us - and open vast possibilities for urban activity analysis in an emergency setting. 

We trained a multiclass classifier on sound melspectrograms from existing urban sound datasets to capture various sounds occurring in Kyiv during this time period. Relying on smartphone microphones installed by our volunteers and open-source webcams, we have been collecting the sound profile of Kyiv as it returns back to normalcy. 

		
						<br />
						<br />
			
						<br/> <br/>

						Team: <br />

						<br/>
						<Grid container>
							<Grid item xs={7}> 
							<b>Carlo Ratti</b>, Director <br />
							<b>Simone Mora</b>, Project Manager <br />
							<b>Ariana Salazar Miranda</b>, Research <br />
							<b>Dylan Halpern</b>, Visualization <br />
							<b>Nikita Klimenko</b>, Research, Visualization <br />
							<b>Oluwatobi Oyinlola</b>, Research <br />
			
							<br />
							<b>Artem Laptiev</b>, Volunteer<br />
							<b>Tonya</b>, Volunteer <br />

							</Grid>

							<Grid item xs={1}>

							</Grid>


							<Grid item xs={4}>
							
							<b>Publication</b>
							<br />
							<b>Accessibility</b>
							<br />  <br />   <br />  <br />
							<img src="/img/mit.svg"   height="30px"/>
							<br /><br />
							<img src="/img/UC.png"   height="30px"/>
							
							
							</Grid>
						</Grid>
						

	
						<br/> <br/>
		
					

					</Typography>
					<Button
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 0,
							top: 0,
							width: '20px',
							height: '20px',
							minWidth: '20px',
							minHeight: '20px'
						}}
					>
						&times;
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}
