import Shape from "./shape"
import { TWO_PI } from '../constants'

export default class Circle extends Shape {
    constructor (
        public x: number,
        public y: number,
        public radius: number
    ) {
        super()
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.save()
        this.updateContext(ctx)
        ctx.beginPath()
        ctx.moveTo(this.x + this.radius, this.y)
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()
    }
}