import * as BABYLON from '@babylonjs/core'

export class Ground {
  private width: number
  private height: number
  private subdivisions: number
  private scene: BABYLON.Scene

  constructor(width: number, height: number, subdivisions: number, scene: BABYLON.Scene) {
    this.width = width
    this.height = height
    this.subdivisions = subdivisions
    this.scene = scene
  }

  
  renderGround() {
    const wireframeMaterial = new BABYLON.StandardMaterial('wireframeMaterial', this.scene)
    const groundMesh = BABYLON.MeshBuilder.CreateGround(
      'ground',
      { width: this.width, height: this.height, subdivisions: this.subdivisions },
      this.scene,
    )
    wireframeMaterial.wireframe = true
    groundMesh.material = wireframeMaterial
    ;(groundMesh.material as BABYLON.StandardMaterial).diffuseColor = new BABYLON.Color3(0, 0.5, 0)
    // groundMesh.position.y = 0
    // groundMesh.material = wireframeMaterial
    // wireframeMaterial.wireframe = true
  }
}
