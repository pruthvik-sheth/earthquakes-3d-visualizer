import logo from './logo.svg';
import './App.css';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <Canvas
      // dpr={[1, 2]}
      // orthographic
      gl={{
        antialias: true,
        // toneMapping
        // outputEncoding: 
      }}
      camera={{
        fov: 45,
        // zoom: 100,
        near: 0.1,
        far: 200,
        position: [3, 2, 6]
      }}
    >
      <Experience />
    </Canvas>
  );
}

export default App;
