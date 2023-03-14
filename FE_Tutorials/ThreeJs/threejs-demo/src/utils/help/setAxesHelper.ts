/**
 * 添加axesHelper
 * 用于简单模拟3个坐标轴的对象.
 * 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
 */
import * as THREE from "three";

export default function setAxesHelper(scene: THREE.Scene) {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
}
