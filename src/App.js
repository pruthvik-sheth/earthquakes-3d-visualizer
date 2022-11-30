import logo from './logo.svg';
import './App.css';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import Footer from './components/Footer';


// store.subscribe(
//   () => {
//     console.log(store.getState());
//   }
// )

function App() {
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
          <Experience />
        </Canvas>
      </Provider>
    </>
  );
}

export default App;
