import glsl from 'babel-plugin-glsl/macro'
import { shaderMaterial } from "@react-three/drei"
import * as THREE from 'three'


const CustomPinShader = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color('blue')
    },

    //Vertex Shader
    glsl`

        varying vec2 vertexUV;
        varying vec3 vertexPos;
        uniform float uTime;

        void main() {


            //init stuff
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // vertexPosition = normalize(normalMatrix * position);
            vertexUV = uv;

        }
    `,

    //Fragment Shader
    glsl`
    
    precision mediump float;

    varying vec2 vertexUV;
    varying vec3 vertexPos;

    uniform vec3 uColor;
    uniform float uTime;

    
    void main() {

        float strength = 0.015 / (sin((distance(vertexUV, vec2(0.5)) - (uTime) * 4.0)) + 1.0);

        gl_FragColor = vec4(strength+ uColor.r,strength + uColor.g,strength + uColor.b ,strength);


    }`
)




export default CustomPinShader

