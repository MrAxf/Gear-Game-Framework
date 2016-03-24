/*jshint esnext: true */

class Spritesheet{
  constructor(image, width, height, rows, cols){
    this.game = game;
    this.texture = new PIXI.Texture.fromImage(image);
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.spriteWidth = this.width/cols;
    this.spriteHeight = this.height/rows;
    this.sprites = new Array(this.rows);
    for(let i = 0; i < this.rows; i++){
      this.sprites[i] = new Array(this.cols);
      for(let j = 0; j < this.cols; j++){
        this.sprites[i][j] = new PIXI.Texture(this.texture, new PIXI.Rectangle(j*this.spriteWidth, i*this.spriteHeight, this.spriteWidth, this.spriteHeight));
      }
    }
  }
  getSprite(row, col){
    if(row < 0 || col < 0 || row >= this.rows || col >= this.cols) return false;
    return this.sprites[row][col];
  }
  getRow(row){
    if(row < 0 || row >= this.rows) return false;
    return this.sprites[row];
  }
}

module.exports = Spritesheet;
