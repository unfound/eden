import Vector from './vector'
const cos = Math.cos, sin = Math.sin, tan = Math.tan

export class Matrix {
  elements: number[] = []

  static Identity = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ]

  constructor(a: number[])
  constructor (
    a11?: number | number[],
    a12?: number,
    a13?: number,
    a21?: number,
    a22?: number,
    a23?: number,
    a31?: number,
    a32?: number,
    a33?: number,
  )
  constructor (
    a11: number | number[] = 1,
    a12: number = 0,
    a13: number = 0,
    a21: number = 0,
    a22: number = 1,
    a23: number = 0,
    a31: number = 0,
    a32: number = 0,
    a33: number = 1,
  ) {
    this.set(a11, a12, a13, a21, a22, a23, a31, a32, a33)
  }

  set(a: number[]): Matrix
  set (
    a11?: number | number[],
    a12?: number,
    a13?: number,
    a21?: number,
    a22?: number,
    a23?: number,
    a31?: number,
    a32?: number,
    a33?: number,
  ): Matrix
  set (
    a11: number | number[] = 1,
    a12: number = 0,
    a13: number = 0,
    a21: number = 0,
    a22: number = 1,
    a23: number = 0,
    a31: number = 0,
    a32: number = 0,
    a33: number = 1,
  ) {
    if (Array.isArray(a11)) {
      this.elements = a11.concat()
    } else {
      this.elements = [
        a11, a12, a13,
        a21, a22, a23,
        a31, a32, a33
      ]
    }
    return this
  }

  getValue () {
    return this.elements.concat()
  }

  copy (m: Matrix) {
    this.elements[0] = m.elements[0]
    this.elements[1] = m.elements[1]
    this.elements[2] = m.elements[2]
    this.elements[3] = m.elements[3]
    this.elements[4] = m.elements[4]
    this.elements[5] = m.elements[5]
    this.elements[6] = m.elements[6]
    this.elements[7] = m.elements[7]
    this.elements[8] = m.elements[8]
    return this
  }

  identity () {
    this.elements = Matrix.Identity.concat()
    return this
  }

  multiply (scale: number): Matrix
  multiply (m: Matrix): Matrix
  multiply (v: Vector): Vector
  multiply (
    x: number,
    y: number,
    z?: number,
  ): Vector
  multiply (
    a11: number,
    a12: number,
    a13: number,
    a21: number,
    a22: number,
    a23: number,
    a31?: number,
    a32?: number,
    a33?: number,
  ): Matrix
  multiply(
    a11: number | Matrix | Vector,
    a12?: number,
    a13?: number,
    a21?: number,
    a22?: number,
    a23?: number,
    a31: number = 0,
    a32: number = 0,
    a33: number = 1,
  ) {
    if (a11 instanceof Vector) {
      return this.multiplyVector(a11)
    } else if (a11 instanceof Matrix) {
      return this.multiplyMatrix(a11)
    }
    if (arguments.length === 1) {
      this.multiplyScalar(a11)
    } else if (arguments.length <= 3) {
      return this.multiplyVector(a11, a12!, a13)
    } else if (arguments.length >= 6) {
      this.multiplyMatrix(a11, a12!, a13!, a21!, a22!, a23!, a31, a32, a33)
    }
    return this
  }

  multiplyScalar (s: number) {
    this.elements[0] *= s
    this.elements[1] *= s
    this.elements[2] *= s
    this.elements[3] *= s
    this.elements[4] *= s
    this.elements[5] *= s
    this.elements[6] *= s
    this.elements[7] *= s
    this.elements[8] *= s
    return this
  }

  multiplyMatrix (m: Matrix): Matrix
  multiplyMatrix (
    a11: number,
    a12: number,
    a13: number,
    a21: number,
    a22: number,
    a23: number,
    a31?: number,
    a32?: number,
    a33?: number,
  ): Matrix
  multiplyMatrix (
    a11: number | number[] | Matrix,
    a12?: number,
    a13?: number,
    a21?: number,
    a22?: number,
    a23?: number,
    a31: number = 0,
    a32: number = 0,
    a33: number = 1,
  ) {
    let B: number[] = []
    if (typeof a11 === 'number' && arguments.length >= 6) {
      B[0] = a11
      B[1] = a12!
      B[2] = a13!
      B[3] = a21!
      B[4] = a22!
      B[5] = a23!
      B[6] = a31
      B[7] = a32
      B[8] = a33
    } else if (Array.isArray(a11) && a11.length === 9) {
      B = a11.concat()
    } else if (a11 instanceof Matrix) {
      B = a11.elements
    }
    const A = this.elements
    const A0 = A[0], A1 = A[1], A2 = A[2]
    const A3 = A[3], A4 = A[4], A5 = A[5]
    const A6 = A[6], A7 = A[7], A8 = A[8]

    const B0 = B[0], B1 = B[1], B2 = B[2]
    const B3 = B[3], B4 = B[4], B5 = B[5]
    const B6 = B[6], B7 = B[7], B8 = B[8]

    this.elements[0] = A0 * B0 + A1 * B3 + A2 * B6
    this.elements[1] = A0 * B1 + A1 * B4 + A2 * B7
    this.elements[2] = A0 * B2 + A1 * B5 + A2 * B8

    this.elements[3] = A3 * B0 + A4 * B3 + A5 * B6
    this.elements[4] = A3 * B1 + A4 * B4 + A5 * B7
    this.elements[5] = A3 * B2 + A4 * B5 + A5 * B8

    this.elements[6] = A6 * B0 + A7 * B3 + A8 * B6
    this.elements[7] = A6 * B1 + A7 * B4 + A8 * B7
    this.elements[8] = A6 * B2 + A7 * B5 + A8 * B8

    return this
  }

  multiplyVector (v: Vector): Vector
  multiplyVector (x: number, y: number, z?: number): Vector
  multiplyVector (x: number | Vector, y?: number, z?: number) {
    let oldX: number = 0, oldY: number = 0, oldZ: number = 0
    const e = this.elements
    if (typeof x === 'number' && typeof y === 'number') {
      oldX = x
      oldY = y
      oldZ = z ?? 1
    } else if (x instanceof Vector) {
      oldX = x.x
      oldY = x.y
      oldZ = 1
    }
    const newX = e[0] * oldX + e[1] * oldY + e[2] * oldZ
    const newY = e[3] * oldX + e[4] * oldY + e[5] * oldZ
    // const newZ = e[6] * oldX + e[7] * oldY + e[8] * oldZ

    return new Vector(newX, newY)
  }
  /**
   * 转置矩阵
   * @param out 转置矩阵输出的对象，如果没有，则返回一个新矩阵
   */
  inverse (out?: Matrix) {
    const a = this.elements
    out = out || new Matrix()

    const a00 = a[0], a01 = a[1], a02 = a[2]
    const a10 = a[3], a11 = a[4], a12 = a[5]
    const a20 = a[6], a21 = a[7], a22 = a[8]

    const b01 = a22 * a11 - a12 * a21
    const b11 = -a22 * a10 + a12 * a20
    const b21 = a21 * a10 - a11 * a20

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21

    if (!det) {
      return null
    }

    det = 1.0 / det

    out.elements[0] = b01 * det
    out.elements[1] = (-a22 * a01 + a02 * a21) * det
    out.elements[2] = (a12 * a01 - a02 * a11) * det
    out.elements[3] = b11 * det
    out.elements[4] = (a22 * a00 - a02 * a20) * det
    out.elements[5] = (-a12 * a00 + a02 * a10) * det
    out.elements[6] = b21 * det
    out.elements[7] = (-a21 * a00 + a01 * a20) * det
    out.elements[8] = (a11 * a00 - a01 * a10) * det

    return out
  }

  scale (sx: number, sy?: number) {
    if (!sy) {
      sy = sx
    }

    return this.multiply(sx, 0, 0, 0, sy, 0)
  }

  rotate (r: number) {
    const c = cos(r)
    const s = sin(r)

    return this.multiply(c, -s, 0, s, c, 0)
  }

  translate (x: number, y: number) {
    return this.multiply(1, 0, x, 0, 1, y)
  }

  skewX (r: number) {
    const a = tan(r)
    return this.multiply(1, a, 0, 0, 1, 0)
  }

  skewY (r: number) {
    const a = tan(r)
    return this.multiply(1, 0, 0, a, 1, 0)
  }

  skew (rx: number, ry?: number) {
    if (!ry) {
      ry = rx
    }
    const ax = tan(rx)
    const ay = tan(ry)
    return this.multiply(1, ax, 0, ay, 1, 0)
  }
}

// const m = new Matrix()
// m.multiply(1)
// m.multiply(2, 1)
// m.multiply(2, 1, 3)
// m.multiply(new Vector())
// m.multiply(new Matrix())
// m.multiply(1,2,3,4,5, 6)
// m.multiply(1,2,3,4,5,6,7,8,9)