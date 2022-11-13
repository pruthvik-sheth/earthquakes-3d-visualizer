import glsl from 'babel-plugin-glsl/macro'

const CustomAtmosphereShader = {
    vertexShader: glsl`

        varying vec3 vertexPosition;
        varying vec3 vertexNormal;

        void main() {

            //init stuff
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vertexPosition = normalize(normalMatrix * position);
            vertexNormal = normalize(normalMatrix * normal);

        }
    `,

    fragmentShader: glsl`
    
    // varying vec3 vertexPosition;
    varying vec3 vertexNormal;

    // vec3 brightnessToColor(float b) {
    //     b *= 0.25;

    //     return(vec3(b, b*b, b*b*b*b)/0.25) * 0.8;
    // }
    
    void main() {

        // float radial = 1.0 - vertexPosition.z;

        // radial *= radial;

        // float radial = 1.0 - vertexPosition.z;

        // radial *= radial * radial;

        // float brightness = 0.5 + radial * 0.6;

        // gl_FragColor.rgb = brightnessToColor(brightness) * radial;
        // gl_FragColor.a = radial;


        float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1.0)), 2.8);
        gl_FragColor = vec4(0.3,0.6,1.0,1.0) * intensity;
    }

    `

}








// import { shaderMaterial } from "@react-three/drei"
// import glsl from "babel-plugin-glsl/macro"
// import * as THREE from 'three'


// const CustomAtmosphereShader = shaderMaterial(
//     {},

//     //Vertex
//     glsl`

//     varying vec3 vertexPosition;

//     void main() {

//         //init stuff
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

//         vertexPosition = position;

//     }`,


//     //Fragment
//     glsl`


//     varying vec3 vertexPosition;

//     void main() {
//         // vec3 texture = texture2D(uTexture, vertexUV).rgb;

//         gl_FragColor = vec4(vertexPosition.z,0,0,1.0);
//     }`
// )

export default CustomAtmosphereShader