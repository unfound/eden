import Shape from "./shape"

export default class Path extends Shape {
    path2d: Path2D
    constructor (path?: string | Path2D) {
        super()
        this.path2d = new Path2D(path)
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.visable) return
        ctx.save()
        this.updateContext(ctx)
        this.isFill && ctx.fill(this.path2d)
        this.isStroke && ctx.stroke(this.path2d)
        ctx.restore()
    }

    moveTo (x: number, y: number) {
        this.path2d.moveTo(x, y)
        return this
    }

    lineTo (x: number, y: number) {
        this.path2d.lineTo(x, y)
        return this
    }

    closePath () {
        this.path2d.closePath()
        return this
    }

    ellipse (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
        this.path2d.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise)
        return this
    }

    quadraticCurveTo (cpx: number, cpy: number, x: number, y: number) {
        this.path2d.quadraticCurveTo(cpx, cpy, x, y)
        return this
    }

    bezierCurveTo (cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number) {
        this.path2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        return this
    }

    rect (x: number, y: number, w: number, h: number) {
        this.path2d.rect(x, y, w, h)
        return this
    }

    arcTo (x1: number, y1: number, x2: number, y2: number, radius: number) {
        this.path2d.arcTo(x1, y1, x2, y2, radius)
        return this
    }

    arc (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean) {
        this.path2d.arc(x, y, radius, startAngle, endAngle, counterclockwise)
        return this
    }

    addPath (path: Path2D, transform?: DOMMatrix2DInit) {
        this.path2d.addPath(path, transform)
        return this
    }
}