import _ from 'lodash'
import CanvasRenderer from './renderers/canvas'
import Rect from './shapes/rect'
import Shape from './shapes/shape'

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

    createRect (x: number, y: number, width: number, height: number, radius?: number) {
        const rect = new Rect(x, y, width, height, radius)
        this.scene.push(rect)
        return rect
    }
}