import * as THREE from 'three'
import CustomPinShader from "../shaders/CustomPinShader"
import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { Html } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'

extend({ CustomPinShader })

const Pin = ({ latitude, longitude, magnitude, place, earthRef }) => {


    const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 })
    // const [target, setTarget] = useState(new THREE.Vector3(0, 0, 0))
    const [popUpVisible, setPopUpVisible] = useState(true)



    const planeRef = useRef()
    const customPinShaderRef = useRef()




    useFrame(
        (state, delta) => {
            customPinShaderRef.current.uTime += delta
            // shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
            // console.log(shaderRef.current.uniforms.uTime.value);
        }
    )

    const calculateCartesianCoords = () => {

        const radLat = (90 - latitude) * (Math.PI / 180)
        const radLng = ((90 + longitude) * (Math.PI / 180)) // here 90 + is for cancelling the texture offset


        const vector = new THREE.Vector3().setFromSphericalCoords(2, radLat, radLng)

        // console.log(vector);

        setCoordinates({
            x: vector.x,
            y: vector.y,
            z: vector.z
        })



    }

    const computePlaneAlignment = () => {

        const lookDirection = new THREE.Vector3()
        const posi = new THREE.Vector3(coordinates.x, coordinates.y, coordinates.z)

        const mytarget = new THREE.Vector3()

        lookDirection.subVectors(posi, earthRef.current.position).normalize()
        mytarget.copy(posi).add(lookDirection);

        planeRef.current.lookAt(mytarget)

    }

    // useLayoutEffect(
    //     () => {
    //         planeRef.current.lookAt(target)
    //         console.log('Updating');

    //     }, [target])


    useEffect(() => {

        customPinShaderRef.current.transparent = true
        customPinShaderRef.current.blending = THREE.AdditiveBlending
        calculateCartesianCoords()

    }, [])


    useEffect(() => {
        computePlaneAlignment()
    }, [coordinates])



    return (
        <mesh
            ref={planeRef}
            scale={magnitude / 50}
            position={[coordinates.x, coordinates.y, coordinates.z]}
            onClick={(e) => {
                popUpVisible ? setPopUpVisible(false) : setPopUpVisible(true)
                console.log('click');
            }}
        >
            {/* <sphereGeometry args={[(mag / 80), 16, 16]} /> */}
            {/* <planeGeometry /> */}
            <circleGeometry args={[1, 16]} />
            <customPinShader
                ref={customPinShaderRef}
                key={CustomPinShader.key}
                uColor={(magnitude) < 3 ? 'green' : 'red'}
            />

            {
                popUpVisible ?
                    <Html
                        position={[0, 1, 0]}
                        distanceFactor={1}
                        // center
                        wrapperClass="label"
                        occlude={[earthRef]}
                    >
                        <div>Place: {place},</div>
                        <div>Magnitude: {magnitude}</div>
                    </Html>
                    : null
            }
        </mesh>
    )
}

export default Pin



    // const x = (Math.sin(radLat) * Math.cos(radLng))
    // const y = Math.sin(radLat) * Math.sin(radLng)
    // const z = Math.cos(radLat)

    // var spherical = new THREE.Spherical().setFromVector3(vector);
    // console.log(spherical);
    // console.log(vector.x, vector.y, vector.z);