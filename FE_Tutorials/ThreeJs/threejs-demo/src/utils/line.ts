import * as THREE from "three";

/**
 *
 * @param {*} scene 场景
 * @param {*} renderer 渲染器
 */
const createLine = function (
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer
) {
  //对于线条来说，我们能使用的材质只有LineBasicMaterial 或者 LineDashedMaterial。
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  //定义好材质之后，我们需要一个带有一些顶点的geometry（几何体）。
  const points = [];
  points.push(new THREE.Vector3(5, 0, 0));
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  //注意，线是画在每一对连续的顶点之间的，而不是在第一个顶点和最后一个顶点之间绘制线条（线条并未闭合）。
  // 既然我们已经有了能够画两条线的点和一个材质，那我们现在就可以将他们组合在一起，形成一条线。
  const line = new THREE.Line(geometry, material);
  // 剩下的事情就是把它添加到场景中，并调用render（渲染）函数。
  //   scene.add(line);
  //   renderer.render(scene, camera);
  return line;
};

export default createLine;
