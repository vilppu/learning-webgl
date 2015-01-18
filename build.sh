./third-party/glslangValidator shaders/default.frag
./third-party/glslangValidator shaders/default.vert
node ./bundle_shaders.js > lib/shaders.js
browserify -d  -t 6to5ify -r ./src/application.js:application > lib/bundle.js
