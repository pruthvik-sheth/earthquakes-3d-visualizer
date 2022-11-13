import glsl from 'babel-plugin-glsl/macro'

const CustomPinShader = {

    vertexShader: glsl`

        varying vec2 vertexUV;
        uniform float uTime;

        void main() {


            //init stuff
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            // vertexPosition = normalize(normalMatrix * position);
            vertexUV = uv;

        }
    `,

    fragmentShader: glsl`
    
    precision mediump float;

    varying vec2 vertexUV;

    uniform vec3 uColor;
    uniform float uTime;

    
    void main() {

        float strength = 0.015 / sin(distance(vertexUV, vec2(0.5)) - (uTime * 2.0));
        // float intensity = pow(0.6 - dot(vertexNormal, vec3(0,0,1.0)), 2.8);
        gl_FragColor = vec4(sin(vertexUV.x + uTime * 2.0) * uColor ,1.0);
        gl_FragColor = vec4(strength + 1.0 ,strength,strength ,strength);

    }

    `

}




export default CustomPinShader

