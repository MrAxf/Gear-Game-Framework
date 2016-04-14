/*jshint esnext: true */
import Vector2D from './Vector2D';

class HitBox{
  constructor(width, height, position, rotation){
    this.width = width;
    this.height = height;
    this.position = new Vector2D(position.x, position.y);
    this.rotation = rotation;
    this.vertexs = this.getVertexs();
    this.axes = this.getAxes();
  }
  getVertexs(){
    let vertexInitial0 = new Vector2D(this.position.x - this.width/2, this.position.y - this.height/2);
    let vertexInitial1 = new Vector2D(vertexInitial0.x + this.width, vertexInitial0.y);
    let vertexInitial2 = new Vector2D(vertexInitial0.x + this.width, vertexInitial0.y + this.height);
    let vertexInitial3 = new Vector2D(vertexInitial0.x, vertexInitial0.y + this.height);
    let vertexs = new Array(4);
    vertexs[0] = vertexInitial0.rotate(this.rotation, this.position);
    vertexs[1] = vertexInitial1.rotate(this.rotation, this.position);
    vertexs[2] = vertexInitial2.rotate(this.rotation, this.position);
    vertexs[3] = vertexInitial3.rotate(this.rotation, this.position);
    return vertexs;
  }
  getAxes(){
    let axes = new Array(2);
    axes[0] = new Vector2D(this.vertexs[1].x, this.vertexs[1].y, this.vertexs[0].x, this.vertexs[0].y);
    axes[1] = new Vector2D(this.vertexs[2].x, this.vertexs[2].y, this.vertexs[1].x, this.vertexs[1].y);
    return axes;
  }
  moveVertexs(vector){
    this.vertexs[0].x += vector.x;
    this.vertexs[0].y += vector.y;
    this.vertexs[1].x += vector.x;
    this.vertexs[1].y += vector.y;
    this.vertexs[2].x += vector.x;
    this.vertexs[2].y += vector.y;
    this.vertexs[3].x += vector.x;
    this.vertexs[3].y += vector.y;
  }
  projection(proyectionVector){
    let min = this.vertexs[0].projection(proyectionVector);
    let max = min;
    for (let i = 1; i < this.vertexs.length; i++) {
      let p = this.vertexs[i].projection(proyectionVector);
      if (p < min) min = p;
      else if (p > max) max = p;
    }
    return new Projection(min, max);
  }
  overlap(hitbox){
    for (let i = 0; i < this.axes.length; i++) {
      let axis = this.axes[i];
      let projection1 = this.projection(axis);
      let projection2 = hitbox.projection(axis);
      if (!projection1.overlap(projection2)) return false;
    }

    for (let i = 0; i < hitbox.axes.length; i++) {
      let axis = hitbox.axes[i];
      let projection1 = this.projection(axis);
      let projection2 = hitbox.projection(axis);
      if (!projection1.overlap(projection2)) return false;
    }

    return true;
  }
  update(position, rotation){
    position = new Vector2D(position.x, position.y);
    if(rotation != this.rotation){
      this.rotation = rotation;
      this.position = position;
      this.vertexs = this.getVertexs();
      this.axes = this.getAxes();
    }else if(!position.equals(this.position)){
      this.moveVertexs(new Vector2D(position.x, position.y, this.position.x, this.position.y));
      this.position = position;
    }
  }
}

class Projection{
  constructor(min, max){
    this.min = min;
    this.max = max;
  }
  overlap(projection){
    return this.max > projection.min && projection.max > this.min;
  }
}

module.exports = HitBox;
