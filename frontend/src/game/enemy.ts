import * as BABYLON from '@babylonjs/core'

export class Enemy {
  private armor: number
  private health: number
  private position: BABYLON.Vector3
  private scene: BABYLON.Scene
  private speed: number
  private type: string
  private level: number

  constructor(scene: BABYLON.Scene, position: BABYLON.Vector3) {
    this.scene = scene
    this.position = position
  }

  
}
