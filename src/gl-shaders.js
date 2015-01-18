/*
    .vert vertex shader
    .tesc tessellation control shader
    .tese tessellation evaluation shader
    .geom geometry shader
    .frag fragment shader
    .comp compute shader
*/
import { shaders } from '../lib/shaders.js';

const validateThatShaderWasCompiledSuccessfully = (gl, shader, shaderName) => {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var lastError = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw 'Failed to compile shader ' + shaderName + ':' + lastError;
    }
};

const validateThatProgramWasLinkedSuccessfully = (gl, shaderProgram) => {
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        var lastError = gl.getProgramInfoLog(shaderProgram);
        gl.deleteProgram(shaderProgram);
        throw 'Failed to link shader program:' + lastError;
    }
};

const loadShaderFromLibrary = (shaderName) => {
    return {
        using: (gl) => {
            const shaderSource = shaders[shaderName];
            const shaderType = shaderName.indexOf('frag') !== -1 ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
            const shader = gl.createShader(shaderType);

            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            validateThatShaderWasCompiledSuccessfully(gl, shader, shaderName);
            
            return shader;
        }
    };
};

const loadShader = (shaderName) => {
    return {
        to: (shaderProgram) =>{
            return {
                using: (gl) => {
                    var shader = loadShaderFromLibrary(shaderName).using(gl);
                    
                    gl.attachShader(shaderProgram, shader);
                    gl.deleteShader(shader);

                    return shader;
                }
            };
        }
    };
};

export const getUniform = (uniformName) => {
    return {
        of: (shaderProgram) => {
            return {
                using: (gl) => {
                    shaderProgram.uniforms = shaderProgram.uniforms || [];
                    shaderProgram.uniforms[uniformName] = shaderProgram.uniforms[uniformName] || gl.getUniformLocation(shaderProgram, uniformName);
                  
                    return shaderProgram.uniforms[uniformName];  
                }
            };
        }
    };
};

export const loadShaderProgram = (shaderNames) => {
    return  {
        to: (gl) => {
            const shaderProgram = gl.createProgram();
            
            for (var shaderName of shaderNames) {
                loadShader(shaderName).to(shaderProgram).using(gl);
            }
            
            gl.linkProgram(shaderProgram);
            validateThatProgramWasLinkedSuccessfully(gl, shaderProgram);

            gl.useProgram(shaderProgram);
            shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
            gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

            shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
            shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');

            return shaderProgram;
        }
    };
};
