/*global mat4:false */
import  { loadShaderProgram } from './gl-shaders';

export const getTriangleMeshFrom = (triangleMeshSource) => {
    return {
        using: (webGLRenderingContext) => {
            const gl = webGLRenderingContext;

            const verterBufferFrom = (vertices) => {
                const vertexBuffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
                vertexBuffer.itemSize = 3;
                vertexBuffer.numItems = 3;

                return vertexBuffer;
            };

            const shaderProgramFrom = (shaderNames) => { 
                return loadShaderProgram(shaderNames).to(gl);
            };

            return {
                vertexBuffer: verterBufferFrom(triangleMeshSource.vertices),
                shaderProgram: shaderProgramFrom(triangleMeshSource.shaderNames)
            };
        }
    };
};

export const render = (triangleMesh) => {    
    return {
        to: (webGLRenderingContext) => {
            const gl = webGLRenderingContext;
            const shaderProgram = triangleMesh.shaderProgram;

            const setMatrixUniforms = () => {
                gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, gl.projectionMatrix);
                gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, gl.modelViewMatrix);
            };

            mat4.identity(gl.modelViewMatrix);
            mat4.translate(gl.modelViewMatrix, gl.modelViewMatrix, [0, 0.0, -1.8]);
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleMesh.vertexBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangleMesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLES, 0, triangleMesh.vertexBuffer.numItems);
        }
    };
};
