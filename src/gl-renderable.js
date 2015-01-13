import  { loadShaderProgram } from './gl-shaders'

export const render = (renderable) => {    
    return {
        to: (gl) => {
    
            const verterBufferFrom = (renderable) => {
                const vertices = renderable.vertices;
                const vertexBuffer = gl.createBuffer();

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
                vertexBuffer.itemSize = 3;
                vertexBuffer.numItems = 3;

                return vertexBuffer;
            }

            const shaderProgramFrom = (renderable) => { 
                return loadShaderProgram(renderable.shaderNames).to(gl);
            }

            if(!renderable.vertexBuffer) {
                renderable.vertexBuffer = verterBufferFrom(renderable);
            }

            if(!renderable.shaderProgram) {
                renderable.shaderProgram = shaderProgramFrom(renderable);
            }

            if(!renderable.transformationMatrix) {
                renderable.transformationMatrix = mat4.create();
            }

            const shaderProgram = renderable.shaderProgram;

            const setMatrixUniforms = () => {
                gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, gl.projectionMatrix);
                gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, renderable.transformationMatrix);
            }

            mat4.identity(renderable.transformationMatrix);
            mat4.translate(renderable.transformationMatrix, renderable.transformationMatrix, [-1.5, 0.0, -7.0]);
            gl.bindBuffer(gl.ARRAY_BUFFER, renderable.vertexBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, renderable.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
            setMatrixUniforms();
            gl.drawArrays(gl.TRIANGLES, 0, renderable.vertexBuffer.numItems);
        }
    }
}
