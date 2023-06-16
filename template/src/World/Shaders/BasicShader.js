import { UniformsLib, UniformsUtils, ShaderMaterial } from "three";

const basicVertShader = /*glsl*/`
#include <fog_pars_vertex>
varying vec2 vUv;

void main(){
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position,1.0);
    #include <fog_vertex>
    gl_Position = projectionMatrix * mvPosition;
}
`;

const basicFragShader = /*glsl*/`
#include <fog_pars_fragment>
varying vec2 vUv;
void main(){
    gl_FragColor = vec4(vUv,1.0,1.0);
    #include <fog_fragment>
}   
`;


const uniforms = UniformsUtils.merge([UniformsLib['fog']]);
const BasicShaderMat = new ShaderMaterial({
    uniforms: uniforms,
    defines: {
    },
    vertexShader: basicVertShader,
    fragmentShader: basicFragShader,
    fog: true,
    transparent: true,
})



export { BasicShaderMat }