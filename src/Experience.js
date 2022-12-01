import { OrbitControls } from "@react-three/drei"
import { Perf } from "r3f-perf"
import Earth from "./components/Earth"
import Stars from "./components/Stars"
import { useDispatch } from "react-redux"
import { useEffect } from 'react'
import { setPast30days, setPastHour } from "./redux/slices/earthquakeSlice"


const Experience = () => {


    const dispatch = useDispatch()

    async function fetchData() {

        const urls = [
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson',
            'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson'
        ]

        try {

            let res = await Promise.all(urls.map(url => fetch(url)))
            let resJson = await Promise.all(res.map(r => r.json()))

            const pastHourData = resJson[0]
            const past30DaysData = resJson[1]


            // const res = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson");
            // const data = await res.json();
            // // setData(data)
            // // console.log(data.features)

            pastHourData?.features.map(
                (earthquake) => {

                    dispatch(setPastHour({
                        id: earthquake.id,
                        latitude: earthquake.geometry.coordinates[1],
                        longitude: earthquake.geometry.coordinates[0],
                        magnitude: earthquake.properties.mag,
                        place: earthquake.properties.place,
                        time: earthquake.properties.time
                    }))
                }
            )

            past30DaysData?.features.map(
                (earthquake) => {

                    dispatch(setPast30days({
                        id: earthquake.id,
                        latitude: earthquake.geometry.coordinates[1],
                        longitude: earthquake.geometry.coordinates[0],
                        magnitude: earthquake.properties.mag,
                        place: earthquake.properties.place,
                        time: earthquake.properties.time
                    }))
                }
            )

            // console.log('fetch data called');

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        fetchData()
    }, [])

    return (

        <>

            {/* <Perf /> */}

            <OrbitControls makeDefault maxDistance={20} minDistance={3} />

            <directionalLight position={[1, 2, 3]} />

            <ambientLight intensity={0.5} />

            <Earth />

            <Stars amount={1000} />
        </>

    )
}

export default Experience