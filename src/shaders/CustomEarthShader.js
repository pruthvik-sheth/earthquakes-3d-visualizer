import { shaderMaterial } from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro"
import * as THREE from 'three'


const CustomEarthShader = shaderMaterial(
    {
        uTexture: new THREE.Texture()
    },

    //Vertex
    glsl`

    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    varying vec3 vertexPositionW;
    varying vec3 vertexNoramlW;

    void main() {

        //init stuff
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        vertexUV = uv;
        vertexNormal = normal;

        vertexPositionW = vec3( vec4(position, 1.0) * modelMatrix);
        vertexNoramlW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );
    
    }`,


    //Fragment
    glsl`

    uniform sampler2D uTexture;

    varying vec2 vertexUV;
    varying vec3 vertexNormal;

    varying vec3 vertexPositionW;
    varying vec3 vertexNoramlW;
    
    void main() {
        vec3 color = vec3(0.3,0.6,1.0);
		vec3 viewDirectionW = normalize(cameraPosition - vertexPositionW);
		float fresnelTerm = dot(viewDirectionW, vertexNoramlW);

		fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

        // float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));
        // vec3 atmosphere = vec3(0.3,0.6,1.0) * pow(intensity, 1.5);

        vec3 texture = texture2D(uTexture, vertexUV).rgb;

        // gl_FragColor = vec4(atmosphere + texture,1.0);
        gl_FragColor = vec4(color * fresnelTerm + texture,1.0);
    }`
)

export default CustomEarthShader