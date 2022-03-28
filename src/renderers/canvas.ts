import { getRatio } from '../utils/device-pixel-ratio'
import type { EdenOptions } from '../eden'
import Shape from '../shapes/shape'

export default class Renderer {
    el: HTMLCanvasElement
    parent: Element
    overdraw: boolean
    smooting: boolean
    ctx: CanvasRenderingContext2D
    width: number
    height: number
    radio: number

    constructor (options: EdenOptions) {
        this.parent = document.body
        this.width = options.width || 300
        this.height = options.height || 150
        this.radio = options.radio || 1

        let el = options.el
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            el = document.createElement('canvas')
        } else if (!(el instanceof HTMLCanvasElement)) {
            this.parent = el
            el = document.createElement('canvas')
        }
        this.el = el as HTMLCanvasElement
        this.overdraw = options.overdraw || false
        this.smooting = options.smooting !== false
        this.ctx = this.el.getContext('2d')!

        this.ctx.imageSmoothingEnabled = this.smooting

        this.setSize(this.width, this.height, this.radio)
        if (options.immediateMount !== false) {
            this.mount()
        }
    }

    setSize (width: number, height: number, ratio?: number) {
        this.width = width
        this.height = height
        this.radio = ratio ?? getRatio(this.ctx)
        this.el.width = width * this.radio
        this.el.height = height * this.radio
        Object.assign(this.el.style, {
            width: width + 'px',
            height: height + 'px'
        })
        return this
    }

    render (scene: Shape[]) {
        const isOne = this.radio === 1
        // 这边的save和restore一定要同时执行，要不chrome会被撑爆
        if (!isOne) {
            this.ctx.save()
            this.ctx.scale(this.radio, this.radio)
        }

        if (!this.overdraw) {
            this.ctx.clearRect(0, 0, this.width, this.height)
        }

        scene.forEach(item => {
            item.draw(this.ctx)
        })

        if (!isOne) {
            this.ctx.restore()
        }

        return this
    }

    mount (node ?: Element) {
        if (node) {
            this.parent = node
        }
        this.parent.appendChild(this.el)
    }

    unmout () {
        this.parent.removeChild(this.el)
    }
}
