const _PI = Math.PI

export const PI = _PI
export const TWO_PI = 2 * _PI

export const NO_COLOR = 'rgba(0, 0, 0, 0)'
export const TRANSPARENT = NO_COLOR

export const DEFAULT_CTX = {
    fillStyle: '#000000',
    strokeStyle: '#000000',
    globalAlpha: 1,
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    lineDash: [4, 2], //非原始值
    lineDashOffset: 0, //非原始值
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: NO_COLOR,
    fillRule: 'nonzero',
}