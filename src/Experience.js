import { OrbitControls } from "@react-three/drei"
import Earth from "./components/Earth"

const Experience = () => {

    return (

        <>
            <OrbitControls makeDefault />

            <directionalLight position={[1, 2, 3]} />

            <ambientLight intensity={0.5} />

            <Earth />
        </>

    )
}

export default Experience