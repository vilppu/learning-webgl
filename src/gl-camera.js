/*global mat4:false */


export const setupViewPortOf = (gl) => {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
};

export const clearViewPortOf = (gl) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

// export const positionCameraTo = (positionVector) => {
//         return {
//         using: (gl) => {   
//         }
//     };
// };

// export const directCameraTo = (directionVector) => {
//         return {
//         using: (gl) => {   
//         }
//     };
// };
