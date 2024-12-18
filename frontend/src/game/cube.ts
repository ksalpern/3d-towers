import * as BABYLON from '@babylonjs/core'

class Cube {
  private width: number
  private height: number
  private depth: number
  private scene: BABYLON.Scene
  private position: BABYLON.Vector3
  private previousCubeMesh: BABYLON.Mesh | null = null;

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

  public renderCube(): BABYLON.Mesh {
    if (this.previousCubeMesh) {
      this.previousCubeMesh.dispose();
    }
    
    const cubeMesh = BABYLON.MeshBuilder.CreateBox(
      'cube',
      {
        width: this.width,
        height: this.height,
        depth: this.depth,
      },
      this.scene,
    );
    cubeMesh.position = this.position;

    this.previousCubeMesh = cubeMesh;
    return cubeMesh;
  }

  setPosition(position: BABYLON.Vector3) {
    this.position = position // Оновлюємо позицію куба
    // Додайте також оновлення позиції в рендерингу, якщо потрібно
  }

  moveX(delta: number) {
    this.position.x += delta; // Змінюємо позицію по осі X
    this.renderCube(); // Рендеримо куб на новій позиції
  }

  updateScene() {
    
  }

  animateMoveX(delta: number, duration: number) {
    const startTime = performance.now();
    const initialPosition = this.position.x;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Нормалізуємо прогрес від 0 до 1

      this.position.x = initialPosition + delta * progress; // Оновлюємо позицію
      this.position.z = initialPosition + delta * progress; // Оновлюємо позицію
      this.renderCube(); // Рендеримо куб на новій позиції

      if (progress < 1) {
        requestAnimationFrame(animate); // Продовжуємо анімацію
      }
    };

    requestAnimationFrame(animate); // Запускаємо анімацію
  }
}

export default Cube
