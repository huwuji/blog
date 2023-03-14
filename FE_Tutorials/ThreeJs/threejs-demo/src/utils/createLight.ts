import * as THREE from "three";

/**
 * 添加光源
 */

type LightType = "PointLight" | "RectAreaLight" | "AmbientLight" | "SpotLight";

export default function createLight(
  scene: THREE.Scene,
  type: LightType = "PointLight",
  color?: string
) {
  let light = null;
  switch (type) {
    case "AmbientLight":
      light = new THREE.AmbientLight(color ?? "0xffffff");
      break;
    default:
      light = new THREE[type](color ?? "0xffffff");
      break;
  }
  light.position.set(50, 100, 50);
  scene.add(light);
}
