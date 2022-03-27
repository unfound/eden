import { DEFAULT_CTX } from '../constants'
import { Matrix } from '../math/matrix'
import Vector from '../math/vector'

export default class Shape {
    fillStyle?: string
    strokeStyle?: string
    opcity?: number
    lineWidth?: number
    lineType?: 'solid' | 'dashed'
    lineCap?: 'butt' | 'round' | 'square'
    lineJoin?: 'round' | 'bevel' | 'miter'
    miterLimit?: number // 大于1
    lineDash?: [number, number]
    lineDashOffset?: number
    shadowOffsetX?: number
    shadowOffsetY?: number
    shadowBlur?: number
    shadowColor?: string
    fillRule?: 'nonzero' | 'evenodd'
    isStroke: Boolean = true
    isFill: Boolean = false
    visable: Boolean = true
    _matrix: Matrix = new Matrix()
    _position: Vector = new Vector()
    _origin: Vector = new Vector()
    _rotation: number = 0
    _scale: number | [number, number] = 1
    _skewX: number = 0
    _skewY: number = 0

    constructor (x?:number, y?:number, ox?: number, oy?: number) {
        if (x && y) {
            this._position.set(x, y)
        }
        if (ox && oy) {
            this._origin.set(ox, oy)
        }
    }

    // 参数使用下划线后不使用也不会有警告
    draw (_ctx: CanvasRenderingContext2D): unknown {
        throw new Error('Must have draw method')
    }

    updateContext (ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillStyle ?? ctx.fillStyle
        ctx.strokeStyle = this.strokeStyle ?? ctx.strokeStyle
        ctx.lineWidth = this.lineWidth ?? ctx.lineWidth
        ctx.lineCap = this.lineCap ?? ctx.lineCap
        ctx.lineJoin = this.lineJoin ?? ctx.lineJoin
        ctx.miterLimit = this.miterLimit ?? ctx.miterLimit
        ctx.shadowOffsetX = this.shadowOffsetX ?? ctx.shadowOffsetX
        ctx.shadowOffsetY = this.shadowOffsetY ?? ctx.shadowOffsetY
        ctx.shadowBlur = this.shadowBlur ?? ctx.shadowBlur
        ctx.shadowColor = this.shadowColor ?? ctx.shadowColor
        if (this.lineType === 'dashed') {
            ctx.setLineDash(this.lineDash ?? DEFAULT_CTX.lineDash)
            ctx.lineDashOffset = this.lineDashOffset ?? ctx.lineDashOffset
        }
        this.updateMatrix()
        const matrix = this._matrix.elements
        ctx.transform(matrix[0], matrix[3], matrix[1],
            matrix[4], matrix[2], matrix[5])
    }

    updateMatrix () {
        // TODO: 这里更新矩阵有问题
        // 应该是按照用户意愿来决定旋转、平移或者缩放
        // 这里的顺序是平移、缩放、旋转、倾斜
        this._matrix
                .identity()
                .translate(this._position.x, this._position.y)
        if (this._scale !== 1) {
            if (Array.isArray(this._scale)) {
                this._matrix.scale(this._scale[0], this._scale[1])
            } else {
                this._matrix.scale(this._scale)
            }
        }

        if (this._rotation !== 0) {
            this._matrix
                    .translate(this._origin.x, this._origin.y)
                    .rotate(this._rotation)
                    .translate(-this._origin.x, -this._origin.y)
        }

        if (this._skewX !== 0) {
            this._matrix.skewX(this._skewX)
        }

        if (this._skewY !== 0) {
            this._matrix.skewY(this._skewY)
        }
    }

    rotate (r: number) {
        this._rotation = r
        return this
    }
    setOrigin (x: number, y: number) {
        this._origin.set(x, y)
    }

    translate (x: number, y: number) {
        this._position.add(x, y)
        return this
    }

    scale (s: number | [number, number]) {
        this._scale = s
        return this
    }

    skewX (s: number) {
        this._skewX = s
        return this
    }

    skewY (s: number) {
        this._skewY = s
        return this
    }

    noStroke (fillColor?: string) {
        this.isStroke = false
        if (fillColor) {
            this.fill(fillColor)
        }
    }

    noFill (strokeColor?: string) {
        this.isFill = false
        if (strokeColor) {
            this.stroke(strokeColor)
        }
    }

    fill (color: string = DEFAULT_CTX.fillStyle) {
        this.fillStyle = color
        this.isFill = true
    }

    stroke (color: string = DEFAULT_CTX.strokeStyle) {
        this.strokeStyle = color
        this.isStroke = true
    }
    
}