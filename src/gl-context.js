export const getWebGLContextOf = (canvas) => {
    const glOptions = { antialias: true };
    const gl = canvas.getContext("webgl", glOptions) 
             || canvas.getContext("experimental-webgl", glOptions);

    if(!gl) {
        throw "WebGL is not supported";
    }

    return gl;
}
