import  { getWebGLRenderingContextOf } from './gl-context';
import  { setupViewPortOf, clearViewPortOf,  } from './gl-camera';
import  { getTriangleMeshFrom, render  } from './gl-triangle-mesh';


export const startOn = (canvas) => {

    const triangleVertices = [
        0.0,  1.0,  0.0,
        -1.0, -1.0,  0.0,
        1.0, -1.0,  0.0
    ];

    const gl = getWebGLRenderingContextOf(canvas);

    const triangleSource = {        
        vertices: triangleVertices,
        shaderNames: ['default.frag', 'default.vert']
    };

    const triangle = getTriangleMeshFrom(triangleSource).using(gl);

    const resizeCanvasToFitWindow = () => {
        setupViewPortOf(gl);
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    };

    const animationLoop = () => {
        resizeCanvasToFitWindow();

        clearViewPortOf(gl);
        render(triangle).to(gl);
        window.requestAnimationFrame(animationLoop);
    };

    animationLoop();
};
