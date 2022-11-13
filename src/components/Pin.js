import * as THREE from 'three'
import CustomPinShader from "../shaders/CustomPinShader"
import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const Pin = ({ latitude, longitude, magnitude, earthRef }) => {


    const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 })
    const [target, setTarget] = useState(new THREE.Vector3(0, 0, 0))



    const planeRef = useRef()
    const shaderRef = useRef()


    useFrame(
        ({ clock }) => {
            shaderRef.current.uniforms.uTime.value = clock.getElapsedTime()
            // console.log(shaderRef.current.uniforms.uTime.value);
        }
    )

    const calculateCartesianCoords = () => {

        const radLat = (90 - latitude) * (Math.PI / 180)
        const radLng = ((90 + longitude) * (Math.PI / 180)) // here 90 + is for cancelling the texture offset


        const vector = new THREE.Vector3().setFromSphericalCoords(2.5, radLat, radLng)

        console.log(vector);

        setCoordinates({
            x: vector.x,
            y: vector.y,
            z: vector.z
        })
        console.log(coordinates);

    }

    const computePlaneAlignment = () => {

        const lookDirection = new THREE.Vector3()
        const posi = new THREE.Vector3(coordinates.x, coordinates.y, coordinates.z)

        const mytarget = new THREE.Vector3()

        lookDirection.subVectors(posi, earthRef.current.position).normalize()
        mytarget.copy(posi).add(lookDirection);

        setTarget(mytarget)

    }

    // useLayoutEffect(
    //     () => {
    //         planeRef.current.lookAt(target)
    //         console.log('Updating');

    //     }, [target])


    useEffect(() => {

        calculateCartesianCoords()
        computePlaneAlignment()


    }, [])




    return (
        <mesh onUpdate={self => self.lookAt(target)} ref={planeRef} scale={0.4} position={[coordinates.x, coordinates.y, coordinates.z]} >
            {/* <sphereGeometry args={[(mag / 80), 16, 16]} /> */}
            {/* <planeGeometry /> */}
            <circleGeometry args={[1, 16]} />
            {/* <meshStandardMaterial color="red" /> */}
            <shaderMaterial
                ref={shaderRef}
                attach="material"
                args={[CustomPinShader]}
                // blending={THREE.AdditiveBlending}
                transparent={true}
                uniforms={{
                    uTime: { value: 0.0 },
                    uColor: { value: (magnitude) < 7 ? new THREE.Color('red') : new THREE.Color('red') },
                }}
            />
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