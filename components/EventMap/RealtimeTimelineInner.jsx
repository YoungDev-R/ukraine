import React, { useEffect, useMemo, useState } from 'react'
import { extent } from 'd3-array'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisBottom } from '@visx/axis'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { Text } from '@visx/text'
import Papa from 'papaparse'

import {
	colors,
	ICON_MAP
} from './StyleSettings'

const getDate = (x) => x.time
const getVol = (x) => x.scl1
const getVol2 = (x) => x.scl2
const getVol3 = (x) => x.scl3
const getVols = [getVol, getVol2, getVol3]
const getTime = (x) => x.t

const margin = {
	top: 20,
	right: 20,
	bottom: 50,
	left: 20
}

const RealtimeTimelineInner = ({
	width,
	height
}) => {
	const [data, setData] = useState([])
	const [timeOffset, setTimeOffset] = useState(0)
	const [dataSnapshot, setDataSnapshot] = useState(0)
	
	const handleLoadData = (data) => {
		const hz = data.data.length / 60
		setData(data.data.map((d,i) => ({...d, t: i/hz})))
		setDataSnapshot(performance.now())
		setTimeOffset(0)
	}


	
	function parseData(url, callBack) {
    Papa.parse(url, {
        download: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}

	const fetchData = async () => {
		Papa.parse('https://scl-sounds-of-ukraine.s3.amazonaws.com/sound_record3.csv', {
			header: true,
			download: true,
			dynamicTyping: true,
			complete: handleLoadData
		})
	}
	// /data/sound_record.csv

	useEffect(() => {
		fetchData()
		const offsetInterval = setInterval(() => setTimeOffset(p => (p+.05)%160), 100)
		const dataInterval = setInterval(() => fetchData(), 60 * 1000)
		
		return () => {
			clearInterval(offsetInterval)
			clearInterval(dataInterval)
		}
	}, []) // eslint-disable-line react-hooks/exhaustive-deps
	
	const xMax = width - margin.left - margin.right
	const yMax = height - margin.top - margin.bottom
	const soundLength = data?.length
	const soundExtent = [0, soundLength]
	const graphWidth = xMax * soundLength
	const xOffset = xMax * timeOffset * -1
	
	const xScale = scaleLinear({
		range: [0, graphWidth],
		domain: soundExtent
	})

	const yScale = useMemo(
		() =>
			scaleLinear({
				range: [yMax, 0],
				domain: extent(data, getVol)
			}),
		[data?.length, yMax] // eslint-disable-line react-hooks/exhaustive-deps
	)
	
	const line = useMemo(() => {
		return <>
		{Object.entries(colors).map(([key, color], i) => <LinePath
		key={i} 
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		// WE NEED REAL DATA THIS IS FAKE!!!!
		data={data}
		
		x={(d) => xScale(getTime(d))}
		y={(d) => yScale(getVols[i](d)) + i * height/5 - height/25 - height/25}
		stroke={color}
		strokeWidth={0.5}
		// yScale(getVol(d))
	/>)}
		</>
	},[data.length, dataSnapshot]) // eslint-disable-line react-hooks/exhaustive-deps
	if (!data?.length){
		return null
	}

	return (
		<svg width={width - margin.left} height={height}  >
		
			<Group>
				<text x={xMax/2} y={yMax + margin.bottom - 10} fill="white" textAnchor='middle' fontFamily="Arial, sans-serif" fontSize="10px">
					Realtime Data
				</text>
				<Group left={xOffset} top={20}>
					{line}
					{/* <AxisBottom
						scale={xScale}
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
					/> */}
				</Group>
			</Group>
		</svg>
	)
}

export default RealtimeTimelineInner