// vec4 texColor = texture(uTexture, vertexUV);

        // if (texColor.r == 0.0 && texColor.g == 0.0 && texColor.b < 0.08) {
        //     // If the pixel is blue-ish, use the texture color
        //     gl_FragColor = vec4(0,0,1.0,1.0);
        // } 

        // gl_FragColor = texColor;

        // else {
        //     // Calculate the size of the dots
        //     float dotSize = 0.1;

        //     // Calculate the distance between the dots
        //     float dotDistance = 0.01;

        //     // Calculate the current position in the grid of dots
        //     float xPos = floor(vertexUV.x / dotDistance);
        //     float yPos = floor(vertexUV.y / dotDistance);

        //     // Calculate the position within the current dot
        //     float x = mod(vertexUV.x, dotDistance) / dotDistance;
        //     float y = mod(vertexUV.y, dotDistance) / dotDistance;


        //     // If the current position is within the dot, use the texture color.
        //     // Otherwise, use transparent black.
        //     if (x < dotSize && y < dotSize) {
        //         // outColor = texColor;
        //         gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

        //     } else {
        //         gl_FragColor = vec4(0, 0, 0, 1.0);
        //     }
        // }