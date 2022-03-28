import './style.css'
import Eden from './eden'
import { PI } from './constants'
import anime from 'animejs'
import Stats from 'stats.js'

const stats = new Stats()
stats.showPanel(0)
stats.dom.style.right = '0px'
stats.dom.style.left = ''
document.body.appendChild(stats.dom)
const eden = new Eden({
  el: '#app',
  width: 800,
  height: 400
})
const rect1 = eden.rect(10, 10, 20, 20)
rect1.strokeStyle = 'green'
rect1.lineWidth = 4
const rect2 = eden.rect(40, 5, 30, 30, 4)
rect2.fill()

const text = eden.text('Hello Canvas!', 260, 30)
text.size = 18
text.weight = 900
text.lineHeight = 16
text.style = 'italic'
// console.log(eden.measureText(text.value))
// console.log(eden.measureText(text.value, text))
const text2 = eden.text('Good', 260, 60)
text2.size = 22
text2.noStroke('red')

const circle = eden.circle(60, 60, 30)
circle.noFill()

const ellipse = eden.ellipse(60, 60, 60, 30)
ellipse.noFill()

const triangle = eden.path()
triangle
  .moveTo(10, 150)
  .lineTo(100, 200)
  .lineTo(50, 250)
  .moveTo(40, 210)
  .arc(40, 210, 20, 0, Math.PI * 2)
  // .fill()
  // triangle.path2d.moveTo(20, 300)
  // triangle.path2d.roundRect(20, 300, 60, 60, 10) // chrome里是有这个方法的
let rotation = 0
anime({
  autoplay: true,
  duration: Infinity,
  update () {
    if (rotation >= 1000 * PI) {
      rotation = 0
    }
    rotation += PI / 30
    rect2.rotate(rotation)
    eden.update()

    stats.update()
  }
})
