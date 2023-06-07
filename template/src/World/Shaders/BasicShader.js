import { UniformsLib, UniformsUtils, ShaderLib, ShaderMaterial } from "three";

const basicVertShader = /*glsl*/`
#include <fog_pars_vertex>
varying vec2 vUv;

void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    #include <fog_vertex>
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

const shaderPoint = ShaderLib.points;

const uniforms = UniformsUtils.merge([UniformsLib['fog'], UniformsUtils.clone(shaderPoint.uniforms)]);
uniforms.scale.value = 350;
const BasicShaderMat = new ShaderMaterial({
    uniforms: uniforms,
    defines: {
        USE_SIZEATTENUATION: ""
    },
    vertexShader: basicVertShader,
    fragmentShader: basicFragShader,
    fog: true,
    transparent: true,
})



export { BasicShaderMat }