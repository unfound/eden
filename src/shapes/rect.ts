import Shape from "./shape"

export default class Rect extends Shape {
    constructor (
        public x: number = 0,
        public y: number = 0,
        public width: number = 1,
        public height: number = 1,
        public radius: number = 0
    ) {
        super()
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.save()
        this.updateContext(ctx)
        this.drawByPath(ctx, this.x, this.y, this.width, this.height, this.radius)
        ctx.restore()
    }
    // 不知道怎么设置圆弧
    drawByCtx (
        ctx: CanvasRenderingContext2D,
        x: number = 0,
        y: number = 0,
        width: number = 1,
        height: number = 1
    ) {
        ctx.fillRect(x, y, width, height)
        ctx.strokeRect(x, y, width, height)
    }

    drawByPath (
        ctx: CanvasRenderingContext2D,
        x: number = 0,
        y: number = 0,
        width: number = 1,
        height: number = 1,
        radius: number = 0
    ) {
        ctx.beginPath()
        ctx.moveTo(x, y + radius)
        ctx.lineTo(x, y + height - radius)
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
        ctx.lineTo(x + width - radius, y + height)
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
        ctx.lineTo(x + width, y + radius)
        ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
        ctx.lineTo(x + radius, y)
        ctx.quadraticCurveTo(x, y, x, y + radius)
        // 虽然fill会自动闭合路径，但是这边没有先闭合的话stroke会有问题
        // 如果没有闭合，左上角会有个缺口lineWidth比较大的情况下很明显
        ctx.closePath()
        // 先fill在stroke，不然部分stroke会被覆盖
        ctx.fill()
        ctx.stroke()
    }
    // 不知道怎么设置圆弧
    drawByPath2D (
        ctx: CanvasRenderingContext2D,
        x: number = 0,
        y: number = 0,
        width: number = 1,
        height: number = 1
    ) {
        const p = new Path2D()
        p.rect(x, y, width, height)
        ctx.stroke(p)
    }
}
