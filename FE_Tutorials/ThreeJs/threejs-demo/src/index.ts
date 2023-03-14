// import * as THREE from "three";
// import CreateBaseScene from "./utils/createBaseScene";
import createSceneofLight from "./utils/createSceneofLight";
import createOrbitControls from "./utils/createOrbitControls";
import createLight from "./utils/createLight";
// import CreateLine from "./utils/line.js";

const { renderer, scene, camera, cube } = createSceneofLight();

// 剩下的事情就是把它添加到场景中，并调用render（渲染）函数。
// const line = CreateLine(scene, renderer);
// scene.add(line);

const controls = createOrbitControls(camera, renderer);

// 每次控制器触发后，需要触发canvas的重新渲染
// controls.addEventListener("change", function () {
//   console.log("camera：", camera.position);
//   renderer.render(scene, camera);
// });

// 如果摄像机位置变动，需要及时更新到控制器
// camera.position.set(10, 10, 10);
// 摄像机位置变动同步到 controls
// controls.update();

// 添加环境光
createLight(scene, "AmbientLight");

// 设置简易动画，然后渲染
function animate() {
  //   cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 每帧更新控制器，并触发canvas的重新渲染
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
