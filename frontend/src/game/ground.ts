import * as BABYLON from "@babylonjs/core";

class Ground {
  private scene: BABYLON.Scene;
  private grid: {w: number; h: number};
  private matrix: number[][];

  constructor(
    scene: BABYLON.Scene,
    grid: {w: number; h: number},
    matrix: number[][]
  ) {
    this.scene = scene;
    this.grid = grid;
    this.matrix = matrix;
  }

  createGround() {
    const tiledGround = BABYLON.MeshBuilder.CreateTiledGround(
      "Tiled Ground",
      {
        xmin: -8, // Змінено для відповідності 16
        zmin: -4.5, // Змінено для відповідності 9
        xmax: 8,
        zmax: 4.5,
        subdivisions: {w: this.grid.w, h: this.grid.h},
      },
      this.scene
    );

    const whiteMaterial = new BABYLON.StandardMaterial("White");
    whiteMaterial.diffuseTexture = new BABYLON.Texture("/assets/grass.png");

    const blackMaterial = new BABYLON.StandardMaterial("Black");
    // blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    blackMaterial.diffuseTexture = new BABYLON.Texture("/assets/rock.png");


    const verticesCount = tiledGround.getTotalVertices();
    const indices = tiledGround.getIndices();
    if (!indices) return;

    const tileIndicesLength = indices.length / (this.grid.w * this.grid.h); // Переконайтеся, що grid.w і grid.h правильні

    tiledGround.subMeshes = [];
    let base = 0;
    for (let row = this.grid.h - 1; row >= 0; row--) {
      for (let col = 0; col < this.grid.w; col++) {
        const colorIndex = this.matrix[row][col]; // Отримуємо значення з матриці
        const materialIndex = colorIndex === 0 ? 0 : 1; // 0 - білий, 1 - чорний

        tiledGround.subMeshes.push(
          new BABYLON.SubMesh(
            materialIndex,
            0,
            verticesCount,
            base,
            tileIndicesLength,
            tiledGround
          )
        );
        base += tileIndicesLength;
      }
    }

    tiledGround.material = new BABYLON.MultiMaterial("multi", this.scene);
    (tiledGround.material as BABYLON.MultiMaterial).subMaterials.push(whiteMaterial);
    (tiledGround.material as BABYLON.MultiMaterial).subMaterials.push(blackMaterial);
  }
}

export default Ground;
