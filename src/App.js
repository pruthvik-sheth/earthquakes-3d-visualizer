import logo from './logo.svg';
import './App.css';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { Html, useProgress } from '@react-three/drei';
import Footer from './components/Footer';
import loaderGif from './loader.svg'
import { Suspense } from 'react';


// store.subscribe(
//   () => {
//     console.log(store.getState());
//   }
// )

function App() {


  function Loader() {
    const { progress } = useProgress()
    return <Html className='loader' center><img src={loaderGif}></img><div>{progress}%</div></Html>
  }

  return (

    <>
      <Provider store={store}>
        <Header />
        <Footer />
        <Canvas
          gl={{
            antialias: true,
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]
          }}
        >
          <Suspense fallback={<Loader />}>
            <Experience />
          </Suspense>
        </Canvas>
      </Provider>
    </>
  );
}

export default App;
