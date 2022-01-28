// TODO
// A `Circle` class/function that can be invoked as :
// const c = new Circle();
// It should contain at least 3 hidden fields `x`, `y`, and `radius`.
export class Circle {
  #x;
  #y;
  #radius;

  constructor(x=0, y=2, radius=1) {
      this.#x = x;
      this.#y = y;
      this.#radius = radius;
  }

  get coords() {
      return [this.#x, this.#y];
  }

  get radius() {
      return this.#radius;
  }
  set radius(radius) {
      if(typeof radius !== "number") {
          throw new Error('Circle radius should be a number');
      }
      if(radius < 0) {
          throw new Error('Circle radius should be a positive number');
      }
      this.#radius = radius;
  }

  get area() {
      return Math.PI * this.#radius * this.#radius;
  }

  set area(area) {
      if(typeof area !== "number") {
          throw new Error('Circle radius should be a number');
      }
      if(area < 0) {
          throw new Error('Circle radius should be a positive number');
      }
      this.#radius = Math.sqrt(area/Math.PI);
  }

  moveTo(x, y) {
    this.#x = x;
    this.#y = y;
  }

  static distance(c1, c2) {
      const [x1, y1] = c1.coords;
      const [x2, y2] = c2.coords;

      const dx = x2 - x1;
      const dy = y2 - y1;
      return Math.sqrt(dx*dx + dy*dy);
  }

  static doIntersect(c1, c2) {
      return Circle.distance(c1, c2) - (c1.radius + c2.radius) < 0;
  }
}



