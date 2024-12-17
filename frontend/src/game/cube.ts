import * as BABYLON from '@babylonjs/core'

class Cube {
  private width: number
  private height: number
  private depth: number
  private scene: BABYLON.Scene
  private position: BABYLON.Vector3

  constructor(
    scene: BABYLON.Scene,
    { width, height, depth }: { width: number; height: number; depth: number },
    position: BABYLON.Vector3,
  ) {
    this.scene = scene
    this.width = width
    this.height = height
    this.depth = depth
    this.position = position
  }

  renderCube() {
    const cubeMesh =  BABYLON.MeshBuilder.CreateBox(
      'cube',
      {
        width: this.width,
        height: this.height,
        depth: this.depth,
      },
      this.scene,
    )
    cubeMesh.position = this.position
    
  }

  setPosition(position: BABYLON.Vector3) {
    this.position = position // Оновлюємо позицію куба
    // Додайте також оновлення позиції в рендерингу, якщо потрібно
  }
}

export default Cube
