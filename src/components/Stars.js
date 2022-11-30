import { useEffect, useMemo, useRef, useState } from "react"
import { Points } from "@react-three/drei"
import * as THREE from 'three'



const Stars = ({ amount }) => {

    const [positions, setpositions] = useState([])

    const geoRef = useRef()

    // const generateStars = () => {

    //     const amount = 500

    //     const positions = useMemo(
    //         () => {
    //             const positions = new Float32Array(amount * 3)

    //             for (let i = 0; i < amount; i++) {
    //                 positions[i] = (Math.random() - 0.5) * 5
    //             }

    //             return positions
    //         }
    //         , [])

    //     setpositions(positions)
    // }

    useMemo(
        () => {

            const positions = new Float32Array(amount * 3)

            for (let i = 0; i < amount; i++) {
                positions[i] = (Math.random() - 0.5) * 40
            }

            setpositions(positions)
        }
        , [])

    // useEffect(() => {
    //     geoRef.current.computeVertexNormals()
    // }, [])

    return (
        // <mesh scale={1}>
        //     <bufferGeometry ref={geoRef}>
        //         <bufferAttribute
        //             attach="attributes-position"
        //             count={amount}
        //             itemSize={3}
        //             array={positions}

        //         />
        //     </bufferGeometry>

        //     <meshBasicMaterial color="white" />
        // </mesh>
        <Points positions={positions} stride={3} >
            <pointsMaterial size={0.1} blending={THREE.AdditiveBlending} emissive={true} />
        </Points>
    )
}

export default Stars