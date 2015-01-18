export const shaders = 
{
    "default.vert": "/* default vertext shader */\r\n\r\nattribute vec3 aVertexPosition;\r\n\r\nuniform mat4 uMVMatrix;\r\nuniform mat4 uPMatrix;\r\n\r\nvoid main(void) {\r\n    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\r\n}",
    "default.frag": "/* default fragment shader */\r\n\r\nprecision mediump float;\r\n\r\nvoid main(void) {\r\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\r\n}\r\n"
}
;
