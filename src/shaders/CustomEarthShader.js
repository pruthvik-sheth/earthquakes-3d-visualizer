import { shaderMaterial } from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro"
import * as THREE from 'three'
import { Vector2 } from "three"


const CustomEarthShader = shaderMaterial(
    {
        uTexture: new THREE.Texture(),
        uBumpTexture: new THREE.Texture()
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

        vec4 color = texture2D(uTexture, vertexUV);

        
        // vec3 hazeColor = vec3(0.3,0.6,1.0);
        // vec3 hazeColor = vec3(0.41,0.22,1.0);
        vec3 hazeColor = vec3(0.09,0.09,0.09);
        vec3 viewDirectionW = normalize(cameraPosition - vertexPositionW);
        float fresnelTerm = dot(viewDirectionW, vertexNoramlW);
        fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

        vec3 dotsColor = vec3(0.5,0.5,0.5);
        vec3 landRawColor = vec3(0.15,0.15,0.15);
        vec3 finalLandColor = vec3(landRawColor * fresnelTerm + landRawColor);

        vec3 finalWaterColor = vec3(hazeColor * fresnelTerm + hazeColor);
      
        // Check if the color is blueish
        if (color.b > color.r && color.b > color.g) {
          // If it is, apply the texture color without any modifications
          gl_FragColor = vec4(finalWaterColor,1.0);

        } 
        else {
          // If it's not, apply the modified color with the dot effect

               // Calculate the size of the dots
            float dotSize = 0.1;

            // Calculate the distance between the dots
            float dotDistance = 0.01;

            // Calculate the current position in the grid of dots
            float xPos = floor(vertexUV.x / dotDistance);
            float yPos = floor(vertexUV.y / dotDistance);

            // Calculate the position within the current dot
            float x = mod(vertexUV.x, dotDistance) / dotDistance * 0.8;
            float y = mod(vertexUV.y, dotDistance) / dotDistance * 0.5;

            if (x < dotSize && y < dotSize) {

                gl_FragColor = vec4(dotsColor,1.0);

            } else {
                // gl_FragColor = vec4(0.06, 0.06, 0.06, 1.0);
                gl_FragColor = vec4(finalLandColor, 1.0);

            }

        //   gl_FragColor = vec4(1.0,1.0,1.0,1.0);
        }
        
        // vec3 color = vec3(0.3,0.6,1.0);
		// vec3 viewDirectionW = normalize(cameraPosition - vertexPositionW);
		// float fresnelTerm = dot(viewDirectionW, vertexNoramlW);

		// fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

        // // float intensity = 1.05 - dot(vertexNormal, vec3(0.0,0.0,1.0));
        // // vec3 atmosphere = vec3(0.3,0.6,1.0) * pow(intensity, 1.5);

        // vec3 texture = texture2D(uTexture, vertexUV).rgb;

        // // gl_FragColor = vec4(atmosphere + texture,1.0);
        // gl_FragColor = vec4(color * fresnelTerm + texture,1.0);
    }`
)

export default CustomEarthShader