/*global mat4:false */

export const getWebGLRenderingContextOf = (canvas) => {
    const glOptions = { antialias: true };
    let gl = canvas.getContext("webgl", glOptions);

    if(!gl) {
        canvas.getContext("experimental-webgl", glOptions);
    }

    if(!gl) {
        throw "WebGL is not supported";
    }

    gl.projectionMatrix = mat4.create();
    gl.modelViewMatrix = mat4.create();
    mat4.perspective(gl.projectionMatrix, 45, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

    return gl;
};
