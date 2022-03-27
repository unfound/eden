export default class Vector {
    constructor (
        public x: number = 0,
        public y: number = 0
    ) {}

    static zero = new Vector()
    static up = new Vector(0, -1)
    static right = new Vector(1, 0)
    static down = new Vector(0, 1)
    static left = new Vector(-1, 0)

    static add (v1: Vector, v2: Vector) {
        return new Vector(v1.x + v2.x, v1.y + v2.y)
    }

    static sub (v1: Vector, v2: Vector) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    set (x: number, y: number) {
        this.x = x
        this.y = y
        return this
    }

    copy (v: Vector) {
        this.x = v.x
        this.y = v.y
        return this
    }

    clear () {
        this.x = 0
        this.y = 0
        return this
    }

    clone () {
        return new Vector(this.x, this.y)
    }

    add (v: Vector): Vector
    add (x: number): Vector
    add (xOrV: Vector | number, y?: number)
    {
        if (xOrV instanceof Vector) {
            this.x += xOrV.x
            this.y += xOrV.y
        } else if (!y) {
            this.x += xOrV
            this.y += xOrV
        } else {
            this.x += xOrV
            this.y += y
        }
        return this
    }

    sub (v: Vector): Vector
    sub (x: number): Vector
    sub (xOrV: Vector | number, y?: number)
    {
        if (xOrV instanceof Vector) {
            this.x -= xOrV.x
            this.y -= xOrV.y
        } else if (!y) {
            this.x -= xOrV
            this.y -= xOrV
        } else {
            this.x -= xOrV
            this.y -= y
        }
        return this
    }
    // 这里的乘法和除法不是向量的点积或叉积，仅仅是用来做数值运算的
    multiply (v: Vector): Vector
    multiply (x: number): Vector
    multiply (xOrV: Vector | number, y?: number)
    {
        if (xOrV instanceof Vector) {
            this.x *= xOrV.x
            this.y *= xOrV.y
        } else if (!y) {
            this.x *= xOrV
            this.y *= xOrV
        } else {
            this.x *= xOrV
            this.y *= y
        }
        return this
    }

    divide (v: Vector): Vector
    divide (x: number): Vector
    divide (xOrV: Vector | number, y?: number)
    {
        if (xOrV instanceof Vector) {
            this.x /= xOrV.x
            this.y /= xOrV.y
        } else if (!y) {
            this.x /= xOrV
            this.y /= xOrV
        } else {
            this.x /= xOrV
            this.y /= y
        }
        if (Number.isNaN(this.x)) {
            this.x = 0
        }
        if (Number.isNaN(this.y)) {
            this.y = 0
        }
        return this
    }
    // 点积
    dot (v: Vector) {
        return this.x * v.x + this.y * v.y
    }

    length () {
        return Math.sqrt(this.lengthSquared())
    }

    lengthSquared () {
        return this.x * this.x + this.y * this.y
    }

    normalize () {
        return this.divide(this.length())
    }
    // 这里理解成两个点之间的距离更好点
    distanceTo(v: Vector) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared (v: Vector) {
        const dx = this.x - v.x
        const dy = this.y - v.y
        return dx * dx + dy * dy
    }

    setLength (l: number) {
        return this.normalize().multiply(l)
    }
    /**
     * 判断两向量是否相等或者说重合
     * @param v 目标向量
     * @param eps 进度误差默认为0.0001
     */
    equals (v: Vector, eps: number = 0.0001) {
        return (this.distanceTo(v) < eps)
    }
    /**
     * 将一个向量线性插值到另一个向量，简单理解就是往另一个向量偏移
     * @param v 目标向量
     * @param t 偏移程度，值为0~1
     */
    lerp (v: Vector, t: number) {
        const x = (v.x - this.x) * t + this.x
        const y = (v.y - this.y) * t + this.y
        return this.set(x, y)
    }

    isZero (eps: number = 0.0001) {
        return (this.length() < eps)
    }

    toObject () {
        return { x: this.x, y: this.y };
    }
    /**
     * 旋转向量
     * @param radians 旋转角度，弧度制
     */
    rotate (radians: number) {
        const x = this.x
        const y = this.y
        const cos = Math.cos(radians)
        const sin = Math.sin(radians)
        this.x = x * cos - y * sin
        this.y = x * sin + y * cos
        return this
    }
}
