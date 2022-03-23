# Eden

Canvas 2D框架，为了更简单使用canvas

## 开始

```js
const eden = new Eden({
  el: '#app',
  width: 800,
  height: 400
})
const rect1 = eden.createRect(10, 10, 200, 100)
rect1.fillStyle = 'blue'
rect1.strokeStyle = 'green'
rect1.lineWidth = 10
const rect2 = eden.createRect(200, 100, 200, 100, 10)
rect2.stroke('rgba(100,100,100,0.5)')
rect2.noFill()

eden.update()
```