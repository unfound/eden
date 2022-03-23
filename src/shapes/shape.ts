import { DEFAULT_CTX, NO_COLOR } from '../constants'

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
    }

    noStroke () {
        this.strokeStyle = NO_COLOR
        this.lineWidth = 0
    }

    noFill () {
        this.fillStyle = NO_COLOR
    }

    fill (color: string = DEFAULT_CTX.fillStyle) {
        this.fillStyle = color
    }

    stroke (color: string = DEFAULT_CTX.strokeStyle) {
        this.strokeStyle = color
    }
    
}