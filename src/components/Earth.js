import Pin from "./Pin"
import { useLoader, extend } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useEffect, useRef } from 'react'
import { useState } from "react"
import CustomEarthShader from "../shaders/CustomEarthShader"
import { fakeData } from "./fakeData"
import Atmosphere from "./Atmosphere"
import { useSelector } from "react-redux"
import { filterTo7Days, filterToPastDay } from "../redux/selectors/filters"

extend({ CustomEarthShader })


const Earth = () => {

    const earthTexture = useLoader(TextureLoader, 'earth_nasa.jpg')


    const earthRef = useRef()
    const earthShaderRef = useRef()


    const [array, setArray] = useState([])

    const { pastHour, past30Days, current } = useSelector((state) => state.earthquakes)

    const past7Days = filterTo7Days(past30Days)

    const pastDay = filterToPastDay(past30Days)



    useEffect(() => {

        if (current == 'PAST30DAYS') {
            setArray(past30Days)
        }
        else if (current == 'PAST7DAYS') {
            setArray(past7Days)
        }
        else if (current == 'PASTDAY') {
            setArray(pastDay)
        }
        else {
            setArray(pastHour)
        }

        // console.log('helloooooooo');
    }, [current, past30Days, pastHour])


    return (
        <>

            {/* <mesh rotation-y={-Math.PI * 0.5} > */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[2, 48, 48]} />
                <customEarthShader ref={earthShaderRef} key={CustomEarthShader.key} uTexture={earthTexture} />
            </mesh>

            <Atmosphere />

            {/* <Pin latitude={-8.6335} longitude={-71.4124} magnitude={30.2} earthRef={earthRef} /> */}

            {array.map(
                (earthquake) => {
                    return (<Pin
                        key={earthquake.id}
                        latitude={earthquake.latitude}
                        longitude={earthquake.longitude}
                        magnitude={earthquake.magnitude}
                        place={earthquake.place}
                        time={earthquake.time}
                        earthRef={earthRef}
                    />
                    )
                }
            )}


        </>
    )
}

export default Earth