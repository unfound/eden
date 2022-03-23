import Shape from "./shape"

export default class Text extends Shape {
    font?: string  // 设置font值后其他相关参数将没有用, font具体参数见：https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
    textAlign?: 'start' | 'end' | 'left' | 'right' | 'center'
    textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
    direction?: 'ltr' | 'rtl' | 'inherit'
    size: number = 14
    family: string = 'sans-serif'
    style?: 'normal' | 'italic'
    weight?: number | string
    lineHeight: number = 16  // 这个值好像没用

    constructor (
        public value: string,
        public x: number,
        public y: number,
        public maxWidth?: number
    ) {
        super()
        document.body.style.fontStyle
    }

    draw (ctx: CanvasRenderingContext2D) {
        ctx.save()
        this.updateContext(ctx)
        this.updateTextContext(ctx)
        ctx.fillText(this.value, this.x, this.y, this.maxWidth)
        ctx.strokeText(this.value, this.x, this.y, this.maxWidth)
        console.log(ctx.measureText(this.value))
        ctx.restore()
    }

    updateTextContext (ctx: CanvasRenderingContext2D) {
        ctx.textAlign = this.textAlign ?? ctx.textAlign
        ctx.textBaseline = this.textBaseline ?? ctx.textBaseline
        ctx.direction = this.direction ?? ctx.direction

        if (this.font) {
            ctx.font = this.font
        } else {
            ctx.font = [
                this.style,
                this.weight,
                `${this.size}px/${this.lineHeight}px`,
                this.family
            ].filter(item => !!item).join(' ')
            console.log(ctx.font)
        }
    }

}