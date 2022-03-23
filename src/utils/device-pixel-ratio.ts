// @ts-nocheck
import global from './global'

const devicePixelRatio = global.devicePixelRatio || 1

function getBackingStoreRatio(ctx: CanvasRenderingContext2D): number {
    // backingStorePixelRatio已经不支持该参数了
    return ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1
}

export function getRatio (ctx: CanvasRenderingContext2D): number {
    return devicePixelRatio / getBackingStoreRatio(ctx)
}
