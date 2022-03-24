import Shape from "./shape"

export default class Arc extends Shape {
    constructor (
        public x: number,
        public y: number,
        public radius: number,
        public startAngle: number,
        public endAngle: number,
        public counterclockwise?: boolean
    ) {
        super()
    }

    draw (ctx: CanvasRenderingContext2D) {
        if (!this.visable) return
        ctx.save()
        this.updateContext(ctx)
        ctx.beginPath()
        ctx.moveTo(this.x + this.radius, this.y)
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterclockwise)
        this.isFill && ctx.fill()
        this.isStroke && ctx.stroke()
        ctx.restore()
    }
}