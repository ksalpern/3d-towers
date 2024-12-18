<script setup lang="ts">
import Cube from '@/game/cube';
import Ground from '@/game/ground';
import * as BABYLON from '@babylonjs/core'
import { onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
// const canvasContainerRef = ref<HTMLDivElement | null>(null);
let engine: BABYLON.Engine | null = null

onMounted(async () => {
  if (!canvasRef.value) return
  engine = new BABYLON.Engine(canvasRef.value, true)

  const createScene = async () => {
    const scene = new BABYLON.Scene(engine!)
    scene.createDefaultLight()
    // const ground = new Ground(20, 20, 20, scene)
    // ground.renderGround()

    const matrix = [
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    ];

    const ground = new Ground(scene, {w: matrix[0].length, h: matrix.length}, matrix);
    ground.createGround();

    const wireframeMaterial = new BABYLON.StandardMaterial('wireframeMaterial', scene)
    wireframeMaterial.wireframe = true

    const cube = new Cube(scene, { width: 1, height: 1, depth: 1 }, new BABYLON.Vector3(0, 0.5, 0))
    cube.renderCube()
    // cube.moveX(10)
    // cube.animateMoveX(2, 1000)

    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      10,
      new BABYLON.Vector3(0, 0, 0),
      scene,
    )

    camera.attachControl(canvasRef.value, true)

    camera.setTarget(new BABYLON.Vector3(0, 0, 0))
    camera.setPosition(new BABYLON.Vector3(0, 1, -5))

    return scene
  }

  const scene = await createScene()

  engine.runRenderLoop(() => {
    scene.render()
  })

  window.addEventListener('resize', () => {
    engine?.resize()
  })
})
</script>

<template>
  <!-- <div class="" ref="canvasContainerRef"> -->
  <canvas class="w-full h-full touch-none outline-none" ref="canvasRef"></canvas>
  <!-- </div> -->
</template>
