import  { getWebGLContextOf } from './gl-context'
import  { setupViewPortOf, clearViewPortOf,  } from './gl-camera'
import  { render  } from './gl-renderable'

export const startOn = (canvas) => {

    const resizeCanvasToFitWindow = () => {
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    }

    const triangleVertives = [
        0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
        1.0, -1.0,  0.0
    ];

    const triangle = {        
        vertices: triangleVertives,
        shaderNames: ["shader-fs", "shader-vs"]
    }

    const gl = getWebGLContextOf(canvas);

    const animationLoop = () => {
        resizeCanvasToFitWindow();

        setupViewPortOf(gl);
        clearViewPortOf(gl);
        render(triangle).to(gl);
        window.requestAnimationFrame(animationLoop);
    }

    animationLoop();
}
