import * as BABYLON from '@babylonjs/core'
import Cube from './cube'

export class Enemy {
  private armor: number
  private health: number
  private position: BABYLON.Vector3
  private scene: BABYLON.Scene
  private speed: number
  private type: string
  private level: number
  private enemy!: BABYLON.Mesh

  constructor(scene: BABYLON.Scene, position: BABYLON.Vector3) {
    this.scene = scene
    this.position = position
    this.armor = 100
    this.health = 100
    this.speed = 1
    this.type = 'enemy'
    this.level = 1
    this.renderEnemy()
  }

  public renderEnemy() {
    const cube = new Cube(this.scene, { width: 1, height: 1, depth: 1 }, this.position)
    this.enemy = cube.renderCube()
  }

  public getPosition() {
    return this.position
  }

  // public move(direction: BABYLON.Vector3) {
  //   this.position.x += direction.x * this.speed
  //   this.position.y += direction.y * this.speed
  //   this.position.z += direction.z * this.speed
  // }
  public moveLeft(delta: number) {
    // this.position.x -= delta * this.speed
    // this.renderEnemy()
    const moveAnimation = new BABYLON.Animation('moveAnimation', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
    moveAnimation.setKeys([
      { frame: 0, value: this.position.x },
      { frame: 60, value: this.position.x - delta * this.speed },
    ])
    this.scene.beginDirectAnimation(this.enemy, [moveAnimation], 0, 60, false)
  }

  public moveRight(delta: number) {
    this.position.x += delta * this.speed
    this.renderEnemy()
  }

  // public updatePosition() {
  //   this.renderEnemy()
  // }
}
