import * as THREE from "three";
import Create from "./utils/createBase.js";
import CreateLine from "./utils/line.js";

const { renderer, scene, camera } = new Create();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// camera.position.x = 5;
// camera.position.y = 5;
camera.position.z = 5;

// 剩下的事情就是把它添加到场景中，并调用render（渲染）函数。
const line = CreateLine(scene, renderer);
scene.add(line);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.0;
  renderer.render(scene, camera);
}
animate();
