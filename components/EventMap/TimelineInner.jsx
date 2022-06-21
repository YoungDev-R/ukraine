import React, { useMemo, useState } from 'react'
import { extent } from 'd3-array'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { Text } from '@visx/text'
import {
	colors,
	ICON_MAP
} from './StyleSettings'

const getDate = (x) => x.time


const margin = {
	top: 20,
	right: 0,
	bottom: 50,
	left: 5
}

const getDaysAgo = (date, days) => {
	let tempDate = new Date(date)
	tempDate.setDate(tempDate.getDate() - days)
	return tempDate
}

const TimelineInner = ({
	width,
	height,
	data,
	soundData,
	handleChartClick,
	activePhone
}) => {
	const xMax = width - margin.left - margin.right
	const yMax = height - margin.top - margin.bottom
	const dateExtent = extent(soundData, getDate)

	const scaleDate = useMemo(
		() =>
			scaleTime({
				range: [margin.left, xMax / 4, xMax / 2, xMax],
				domain: [
					dateExtent[0],
					getDaysAgo(dateExtent[1], 2),
					getDaysAgo(dateExtent[1], 1),
					dateExtent[1]
				]
			}),
		[xMax, width, soundData?.length  && JSON.stringify(soundData[0])] // eslint-disable-line react-hooks/exhaustive-deps
	)
	const scaleFrequency = useMemo(
		() =>
			scaleLinear({
				range: [yMax, 0],
				domain: [0, 3000]
			}),
		[yMax, soundData?.length && JSON.stringify(soundData[0])] // eslint-disable-line react-hooks/exhaustive-deps
	)


	const [activeIcon, setActiveIcon] = useState(null)
	const handleIconHover = (index) => {
		if (index !== null){
			setActiveIcon(index)
			// playSound(iconSound)
		} else {
			setActiveIcon(null)
		}
	}

	return (
		<svg width={width} height={height}>
			<Group left={margin.left}>
				<Text
					verticalAnchor="start"
					color="white"
					fill="white"
					fontFamily='"Jost", sans-serif'
					fontWeight="bold"
				>
					Detection Timeline
				</Text>

				{data.map((d, i) => {
					const x = Math.min(
						scaleDate(d.time),
						width - margin.left - margin.right
					)
					const y = height - 20
					const r = 4
					const color = '#f9ff00'
					const icon = ICON_MAP[d.type]
					return (
						<g key={i}>
							<image x={x} y={y} transform="translate(-7.5 -7.5)" href={icon} alt="" height="15" width="15" opacity={activeIcon === i ? '0.5' : '1'}/>
							<circle
								cx={x}
								cy={y}
								r={40}
								fill={'rgba(0,0,0,0'}
								onClick={() => handleChartClick(d)}
								onMouseEnter={() => handleIconHover(i)} onMouseLeave={()=>handleIconHover(null)}
							/>
							<line
								x1={x}
								y1={margin.top+40}
								x2={x}
								y2={height - margin.bottom}
								stroke={color}
								strokeDasharray="2,2"
							/>

							<line 
								x1={xMax}
								y1={margin.top+40}
								x2={xMax}
								y2={yMax+20}
								
								stroke='#808080'
								strokeWidth="7"
								opacity ='0.8'
								animation = "blinker 0.6s linear infinite"
							/>

							<line className="blink"
								x1={xMax}
								y1={margin.top+40}
								x2={xMax}
								y2={yMax+20}
								
								stroke='white'
								strokeWidth="7"
								opacity ='0.8'
								animation = "blinker 0.6s linear infinite"
							/>



							<line
								x1={x}
								y1={margin.top}
								x2={x}
								y2={height - margin.bottom}
								stroke="rgba(0,0,0,0)"
								strokeWidth="40"
								onClick={() => handleChartClick(d)}
								
							/>
						</g>
					)
				})}
				{['Mic1', 'Mic2', 'Mic3'].map((_phone, i) => {
					const getY = (d) => d[`Mic${i + 1}`]
					return (
						<Group key={`lines-${i}`} top={i * height/5 - height/2.5}>
							<LinePath
								data={soundData}
								x={(d) => scaleDate(getDate(d))}
								y={(d) => scaleFrequency(getY(d)/3)}
								stroke={colors[_phone]}
								strokeWidth={0.5}
								strokeOpacity={
									activePhone === '' || activePhone === _phone
										? 1
										: 0.25
								}
							/>
						</Group>
					)
				})}
				<AxisBottom
					scale={scaleDate}
					label="Date"
					top={height - margin.bottom}
					stroke={'white'}
					tickStroke={'white'}
					tickLabelProps={() => ({
						fill: 'white',
						fontSize: 8,
						textAnchor: 'middle',
						fontFamily: "'Jost', sans-serif"
					})}
					// tickFormat={(d) => {
					// 	return `${d.getMonth() + 1}-${d.getDay() + 1}`
					// }}
				/>
			</Group>
		</svg>
	)
}

export default TimelineInner
