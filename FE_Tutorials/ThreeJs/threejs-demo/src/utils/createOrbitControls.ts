/**
 * 创建一个轨道控制器
 *
 */
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function controls(
  camera: THREE.Camera,
  renderer: THREE.Renderer
) {
  const controls = new OrbitControls(camera, renderer.domElement);
  return controls;
}
