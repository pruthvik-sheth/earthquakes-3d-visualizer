import Pin from "./Pin"
import { useLoader, extend } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useRef, useEffect } from 'react'
import { useState } from "react"
import CustomEarthShader from "../shaders/CustomEarthShader"
import { fakeData } from "./fakeData"
import Atmosphere from "./Atmosphere"

extend({ CustomEarthShader })


const Earth = () => {

    const earthTexture = useLoader(TextureLoader, 'earth_nasa.jpg')

    const earthRef = useRef()

    const [data, setData] = useState(fakeData)

    // console.log(data);


    async function fetchData() {
        try {
            const res = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
            const data = await res.json();
            // setData(data)
            console.log(data.features)


        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        // fetchData()
    }, [])

    return (
        <>
            {/* <mesh rotation-y={-Math.PI * 0.5} > */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <customEarthShader uTexture={earthTexture} />
            </mesh>

            <Atmosphere />

            {data?.features.map(
                (earthquake) => {
                    // <Pin latitude={-8.6335} longitude={-71.4124} />
                    return (<Pin
                        key={earthquake.id}
                        latitude={earthquake.geometry.coordinates[1]}
                        longitude={earthquake.geometry.coordinates[0]}
                        magnitude={earthquake.properties.mag}
                        earthRef={earthRef}
                    />
                    )
                }
            )}


        </>
    )
}

export default Earth