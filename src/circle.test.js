import { Circle } from './circle';
import { fail } from 'jest';

describe('Circle', () => {
  test('new instance of Circle', () => {
    let c = new Circle();
    expect(c).toBeDefined();
    expect(Object.getPrototypeOf(c)).toBe(Circle.prototype);
  });

  test('Not enumerable', () => {
    let c1 = new Circle();
    for (const prop in c1) {
      fail();
    }
  });

  test(' 3 parameters, but 2 attributs', () => {
    const x = 1;
    const y = 2;
    const radius = 5;
    let c1 = new Circle(x, y, radius);
    const [expectedX, expectedY] = c1.coords;
    expect(expectedX).toBe(x);
    expect(expectedY).toBe(y);
    expect(c1.radius).toBe(radius);
  });

  test('no visible x, no visible y', () => {
    const c = new Circle();
    expect(c['x']).toBeUndefined();
    expect(c['y']).toBeUndefined();
  });

  test('coords is readonly', () => {
    let c = new Circle(1, 1);
    expect(() => (c.coords = [0, 0])).toThrow();
    expect(c.coords).toStrictEqual([1, 1]);
  });

  test('only moveTo(x,y) can change coordinates', () => {
    let c = new Circle(1, 1);
    c.moveTo(0, 0);
    c.coords.map((z) => expect(z).toBe(0));
  });

  test('radius can be changed to positive values only', () => {
    let c = new Circle(0, 0, 0);
    c.radius = 12;
    expect(c.radius).toBe(12);

    expect(() => (c.radius = -12)).toThrow();
  });

  test('area is read/write and modifies the radius. Positive values only', () => {
    let c = new Circle(0, 0, 0);
    expect(c.radius).toBe(0);

    c.area = 100 * Math.PI;
    expect(c.area).toBe(100 * Math.PI);

    expect(c.radius).toBe(10);

    expect(() => (c.area = -12)).toThrow();
  });

  test('distance', () => {
    const c1 = new Circle(0, 0, 1);
    const c2 = new Circle(10, 10, 1);
    // SQRT(2) * 10 =
    const expectedDistance = 10 * Math.sqrt(2);
    expect(Circle.distance(c1, c2)).toBe(expectedDistance);
  });

  test('intersection', () => {
    const c1 = new Circle(0, 0, 1);
    const c2 = new Circle(10, 10, 1);
    const c3 = new Circle(1, 1, 1);
    expect(Circle.doIntersect(c1, c2)).toBeFalsy();
    expect(Circle.doIntersect(c1, c3)).toBeTruthy();
  });
});
