import * as THREE from "three";

import setAxesHelper from "./help/setAxesHelper";

/**
 * 设置基础的场景，摄像机，渲染器
 * @returns
 */
export default function () {
  // 定义一个场景
  const scene = new THREE.Scene();
  // 定义一个相机，如下通过构造一个透视相机以及视椎体
  const camera = new THREE.PerspectiveCamera(
    75, //视角角度
    window.innerWidth / window.innerHeight, // 比例理解为生成画布的宽高比
    1,
    1000
  );
  // 定义相机的位置
  camera.position.set(10, 10, 10);

  // 形状，材质  =》网格模型（物体）
  // 形状
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  // MeshLambertMaterial 一种非光泽表面的材质，没有镜面高光。
  const material = new THREE.MeshLambertMaterial({
    color: 0x3f7b9d,
    transparent: true,
    opacity: 0.4,
  });
  const cube = new THREE.Mesh(geometry, material);
  // 设置物体坐标
  cube.position.set(0, 0, 0);
  scene.add(cube);

  // 添加光源
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(50, 100, 50);
  scene.add(light);

  camera.lookAt(cube.position);

  // 设置渲染器，渲染输出canvas画布
  const renderer = new THREE.WebGLRenderer();
  // 设置canvas画布的宽高：将输出canvas的大小调整为(width, height)并考虑设备像素比
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  // 添加axesHelper
  setAxesHelper(scene);

  // 渲染：可以理解为在这个场景下，对这个摄像机的拍摄内容进行渲染
  renderer.render(scene, camera);

  // 将Webgl渲染出的canvas画布添加到dom节点上
  document.body.appendChild(renderer.domElement);

  return {
    scene,
    camera,
    renderer,
    cube,
  };
}
