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
    uniform vec2 uResolution;

    
    void main() {

        // float strength = 0.015 / (sin((distance(vertexUV, vec2(0.5)) - (uTime) * 4.0)) + 1.0);

        // gl_FragColor = vec4(strength+ uColor.r,strength + uColor.g,strength + uColor.b ,strength);

        float distance = length(vertexUV - 0.5); // distance from the center of the window

        float wave = sin(distance * 30.0 - uTime * 2.0) / distance; // wave pattern

        gl_FragColor = vec4(wave,0.0,0.0, 0.8); // set the output color


    }`
)




export default CustomPinShader

