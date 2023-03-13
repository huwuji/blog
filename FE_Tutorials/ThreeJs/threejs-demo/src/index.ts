// import * as THREE from "three";
import CreateBase from "./utils/createBase";
// import CreateLine from "./utils/line.js";

const { renderer, scene, camera, cube } = CreateBase();

// 剩下的事情就是把它添加到场景中，并调用render（渲染）函数。
// const line = CreateLine(scene, renderer);
// scene.add(line);

// 设置简易动画，然后渲染
function animate() {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
