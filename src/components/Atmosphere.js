import CustomAtmosphereShader from "../shaders/CustomAtmosphereShader"
import { extend } from "@react-three/fiber"
import * as THREE from 'three'

// extend({ CustomAtmosphereShader })

// console.log(CustomAtmosphereShader);

const Atmosphere = () => {


    return (
        <mesh>
            <sphereGeometry args={[2.8, 64, 64]} />
            <shaderMaterial
                attach="material"
                args={[CustomAtmosphereShader]}
                transparent={true}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
            />
            {/* <customAtmosphereShader
                key={CustomAtmosphereShader.key}
            /> */}
        </mesh>
    )
}

export default Atmosphere