import Shape from "./shape"
import { TWO_PI } from '../constants'

export default class Ellipse extends Shape {
    constructor (
        public x: number,
        public y: number,
        public radiusX: number,
        public radiusY: number,
    ) {
        super(x, y, x, y)
    }

    draw (ctx: CanvasRenderingContext2D) {
        if (!this.visable) return
        ctx.save()
        this.updateContext(ctx)
        this.drawByCtx(ctx)
        ctx.restore()
    }

    drawByCtx (ctx: CanvasRenderingContext2D) {
        // MDN上显示ctx.ellipse是实验性功能
        ctx.beginPath()
        ctx.moveTo(this.radiusX, 0)
        ctx.ellipse(0, 0, this.radiusX, this.radiusY, 0, 0, TWO_PI)
        ctx.closePath()
        this.isFill && ctx.fill()
        this.isStroke && ctx.stroke()
    }
}