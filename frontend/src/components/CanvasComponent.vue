<script setup lang="ts">
// import Cube from '@/game/cube';
// import { Enemy } from '@/game/enemy';
import Ground from '@/game/ground'
import { matrix } from '@/mocks/matrix'
// import { keyboardHandler } from '@/game/keyboardHandler';
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

    const ground = new Ground(scene, { w: matrix[0].length, h: matrix.length }, matrix)
    ground.createGround()

    const wireframeMaterial = new BABYLON.StandardMaterial('wireframeMaterial', scene)
    wireframeMaterial.wireframe = true

    // const cube = new Cube(scene, { width: 1, height: 1, depth: 1 }, new BABYLON.Vector3(0, 0.5, 0))
    // cube.renderCube()

    const box = BABYLON.MeshBuilder.CreateBox(
      'box',
      {
        width: 1,
        height: 1,
        depth: 1,
      },
      scene,
    )
    box.position.set(0, 0.5, 0)
    box.actionManager = new BABYLON.ActionManager(scene)

    box.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
      box.position.x += 1
    }));

    // const action = new BABYLON.ExecuteCodeAction(
    //   {
    //     trigger: BABYLON.ActionManager.OnKeyUpTrigger,
    //     parameter: function (actionEvent) {
    //       return actionEvent.sourceEvent.key === "R";
    //     },
    //   },
    //   function () {
    //     console.log('r button was pressed')
    //   },
    // )

    // box.actionManager.registerAction(action)

    // scene.onPointerDown = function castRay() {
    //   const hit = scene.pick(scene.pointerX, scene.pointerY)

    //   if(hit.pickedMesh && hit.pickedMesh.name === "box"){  
    //     const redMaterial = new BABYLON.StandardMaterial('red', scene)
    //     redMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0)
    //     hit.pickedMesh.material = redMaterial
    //   }
    // }

    // const enemy = new Enemy(scene, new BABYLON.Vector3(0, 0.5, 0))
    // enemy.renderEnemy()
    // enemy.moveLeft(1)

    // enemy.actionManager = new BABYLON.ActionManager(scene);
    // enemy.moveRight(1)
    // enemy.move(new BABYLON.Vector3(1, 0, 0))
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

    // keyboardHandler(scene.actionManager)

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
