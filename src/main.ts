import './style.css'
import Eden from './eden'

const eden = new Eden({
  el: '#app',
  width: 800,
  height: 400
})
const rect1 = eden.rect(10, 10, 200, 100)
rect1.fillStyle = 'blue'
rect1.strokeStyle = 'green'
rect1.lineWidth = 10
const rect2 = eden.rect(200, 100, 200, 100, 10)
rect2.stroke('rgba(100,100,100,0.5)')
rect2.noFill()

const text = eden.text('Hello Canvas!', 260, 30)
text.size = 18
text.weight = 900
text.lineHeight = 16
text.style = 'italic'
console.log(eden.measureText(text.value))
console.log(eden.measureText(text.value, text))
const text2 = eden.text('Good', 260, 60)
text2.size = 22
text2.fillStyle = 'red'
text2.noStroke()

eden.update()
