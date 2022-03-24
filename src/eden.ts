import _ from 'lodash'
import CanvasRenderer from './renderers/canvas'
import Rect from './shapes/rect'
import Text from './shapes/text'
import Shape from './shapes/shape'
import Circle from './shapes/circle'
import Ellipse from './shapes/ellipse'

export interface EdenOptions {
    el?: string | Element | null
    type?: '2d' | 'webgl'
    overdraw?: boolean
    smooting?: boolean
    width?: number
    height?: number
    radio?: number
    immediateMount?: boolean
}

export default class Eden {
    type: '2d' | 'webgl' = '2d'
    renderer?: CanvasRenderer
    scene: Shape[] = []

    constructor (options: EdenOptions) {
        this.type = options.type ?? '2d'
        if (this.type === '2d') {
            this.renderer = new CanvasRenderer(options)
        }
    }

    getContext () {
        return this.renderer?.ctx
    }

    update () {
        this.renderer?.render(this.scene)
    }

    mount (node ?: Element) {
        if (this.renderer) {
            this.renderer.mount(node)
        }
    }

    unmout () {
        if (this.renderer) {
            this.renderer.unmout()
        }
    }

    rect (x: number, y: number, width: number, height: number, radius?: number) {
        const rect = new Rect(x, y, width, height, radius)
        this.scene.push(rect)
        return rect
    }

    text (str: string, x: number, y: number, maxWidth?: number) {
        const text = new Text(str, x, y, maxWidth)
        this.scene.push(text)
        return text
    }

    measureText (str: string, text?: Text) {
        const ctx = this.getContext()
        let metrics: TextMetrics | undefined
        if (ctx) {
            ctx.save()
            text && text.updateTextContext(ctx)
            metrics = ctx.measureText(str)
            ctx.restore()
        }
        return metrics
    }

    circle (ox: number, oy: number, r: number) {
        const circle = new Circle(ox, oy, r)
        this.scene.push(circle)
        return circle
    }

    ellipse (ox: number, oy: number, rx: number, ry: number) {
        const ellipse = new Ellipse(ox, oy, rx, ry)
        this.scene.push(ellipse)
        return ellipse
    }
}