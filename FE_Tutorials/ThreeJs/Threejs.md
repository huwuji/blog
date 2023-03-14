## 关于 Threejs 的使用

1. 基础元素如：
   - [场景]
   - [摄像机]
     - perspective projection（透视投影)
     - ...
   - [渲染器]
   - [物体]
     - [形状]
       - ...
     - [材质]
       - 基础网格材质(MeshBasicMaterial)这种材质不受光照的影响。
       - ...

设置一个简单的 Demo 如下：

```
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
  // 设置相机的聚焦点（相机的捕获目标），可以是一个位置，也可以是一个物体；
  // camera.lookAt(0, 0, 0);
  // camera.lookAt(cube.positon);

  // 形状，材质  =》网格模型（物体）
  // 形状
  const geometry = new THREE.BoxGeometry(5, 5, 5);
  // 基础网格材质(MeshBasicMaterial)这种材质不受光照的影响。
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.4,
  });
  const cube = new THREE.Mesh(geometry, material);
  // 设置物体坐标
  cube.position.set(0, 0, 0);

  scene.add(cube);

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
```

2.  光照效果：
    需要构建一个光源，设置物体的关照材质：

    - 光源
      - 平行光 RectAreaLight
      - 点光 PointLight
      - 聚光 SpotLight
      - 光照探针 LightProbe
      - 环境光 AmbientLight 环境光会均匀的照亮场景中的所有物体。
    - 物体光照材质
      - MeshLambertMaterial ( 一种非光泽表面的材质，没有镜面高光。)
      - ...

    那怎么添加一个光照效果呢？局部 code 如下

    ```
     //设置一个MeshLambertMaterial (一种非光泽表面的材质，没有镜面高光)材质的物体
    const geometry = new THREE.BoxGeometry(5, 5, 5);
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

    ```

3.  创建一个轨道控制器
    主要

            ```
            import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

            export default function controls(
            camera: THREE.Camera,
            renderer: THREE.Renderer
            ) {
            return new OrbitControls(camera, renderer.domElement);
            }

            ```
            注意：
            其实当我们设置好控制器后，每次控制器触发事件，我们需要及时绘制到canvas上，绘制方式；
            - 1）利用requestAnimationFrame API，每帧绘制
                ```
                function animate() {
                    requestAnimationFrame(animate);
                    // 每帧更新控制器，并触发canvas的重新渲染
                    renderer.render(scene, camera);
                    }
                    animate();
                ```
            - 2）利用轨道控制器监控变化，回调绘制
                ```
                controls.addEventListener("change", function () {
                console.log("camera：", camera.position);
                renderer.render(scene, camera);
                });
                ```

    > 如果相机摄像机位置变动,需同步到 controls，如下：

        ```
         camera.position.set(10, 10, 10);
        // 摄像机位置变动同步到 controls
         controls.update();
        ```
