const validateThatShaderWasCompiledSuccessfully = (gl, shader, shaderName) => {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        var lastError = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw "Failed to compile shader " + shaderName + ":" + lastError;
    }
}

const validateThatProgramWasLinkedSuccessfully = (gl, shaderProgram) => {
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        var lastError = gl.getProgramInfoLog(shaderProgram);
        gl.deleteProgram(shaderProgram);
        throw "Failed to link shader program:" + lastError;
    }
}

const loadShaderFromElement = (elementId) => ({
    using: (gl) => {
        const shaderScriptElement = document.getElementById(elementId);
        const shaderType = shaderScriptElement.type == "x-shader/x-fragment" ? gl.FRAGMENT_SHADER : gl.VERTEX_SHADER;
        const shader = gl.createShader(shaderType);

        gl.shaderSource(shader, shaderScriptElement.textContent);
        gl.compileShader(shader);
        validateThatShaderWasCompiledSuccessfully(gl, shader, elementId);
        
        return shader;
    }
})

const loadShader = (shaderName) => ({
    to: (shaderProgram) => ({
        using: (gl) => {
            var shader = loadShaderFromElement(shaderName).using(gl);
            
            gl.attachShader(shaderProgram, shader);
            gl.deleteShader(shader);

            return shader;
        }
    })
})

export const getUniform = (uniformName) => ({
    of: (shaderProgram) => ({
        using: (gl) => {
            shaderProgram.uniforms = shaderProgram.uniforms || [];
            shaderProgram.uniforms[uniformName] = shaderProgram.uniforms[uniformName] || gl.getUniformLocation(shaderProgram, uniformName);
          
            return shaderProgram.uniforms[uniformName];  
        }
    })
})

export const loadShaderProgram = (shaderNames) => ({
    to: (gl) => {
        const shaderProgram = gl.createProgram();
        
        for (var shaderName of shaderNames) {
            loadShader(shaderName).to(shaderProgram).using(gl);
        }
        
        gl.linkProgram(shaderProgram);
        validateThatProgramWasLinkedSuccessfully(gl, shaderProgram);

        gl.useProgram(shaderProgram);
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

        return shaderProgram;
    }
})
