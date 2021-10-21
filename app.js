// Creating canvas
const canvas = document.createElement('canvas')
let setHeight = innerHeight
let setWidth = innerWidth

canvas.width = setWidth
canvas.height = setHeight

canvas.id = 'space-canvas'
document.body.appendChild(canvas)
let c = canvas.getContext('2d')

class Particle {
  constructor(x, y, radius, colorNum = null) {
    this.x = x
    this.y = y
    this.radius = radius
    this.colorNum = colorNum || Math.floor(Math.random() * 5)
    this.colorArray = [
      '#2185C5',
      '#7ECEFD',
      '#0096c7',
      '80ffdb',
      '#FF76FF',
      '#ff4d6d',
      '#000000'
    ]
  }
  // 7b2cbf
  createParticle() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
    c.closePath()
    c.shadowColor = this.colorArray[this.colorNum]
    c.shadowBlur = 15
    c.fillStyle = this.colorArray[this.colorNum]
    c.fill()
  }
  createBlackHole() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, Math.PI * 2, false)
    c.closePath()
    c.shadowColor = '#ffa500'
    c.shadowBlur = 15
    c.fillStyle = this.colorArray[this.colorNum]
    c.fill()
  }
  update() {
    this.createParticle()
  }
}
let particles = []


function init() {
  let info = []
  particles = []
  let maxTemp = 1000

  for (let i = 0; i < maxTemp; i++) {
    let radius = Math.floor(Math.random() * 2) // 10 - 50
    let x = -setWidth * 1.5 / 2 + Math.floor(Math.random() * setWidth * 1.5)
    let y = -setHeight * 1.5 / 2 + Math.floor(Math.random() * setHeight * 1.5)
    let key = true

    for (let i = 0; i < info.length; i++) {
      let el = info[i]
      if (Math.pow((el.y - y), 2) + Math.pow((el.x - x), 2) <= Math.pow((el.radius + radius), 2)) {
        key = false

        break
      }
    }

    if (!key) {
      maxTemp++;
      continue
    }

    info.push({ x, y, radius })
    particles.push(new Particle(x, y, radius))
  }
  // Black hole
  let radius = 0
  let x = 0
  let y = 0
  particles.push(new Particle(x, y, radius, 6))
}

let mouse = false

addEventListener('resize', (e) => {
  setHeight = innerHeight;
  setWidth = innerWidth

  canvas.width = setWidth
  canvas.height = setHeight
  init()
})
addEventListener('mousedown', () => {
  mouse = true
})

addEventListener('mouseup', () => {
  mouse = false
})

let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(10,10,10, ${alpha})`
  c.fillRect(0, 0, setWidth, setHeight)

  c.save()

  c.translate(canvas.width / 2, canvas.height / 2)

  c.rotate(radians)

  for (let i = 0; i < particles.length - 1; i++) {
    particles[i].update()
  }
  particles[particles.length - 1].createBlackHole()

  c.restore()

  if (mouse && alpha > 0.009) {
    particles[particles.length - 1].radius += 0.7
    alpha -= 0.005
    radians += 0.009
  }
  else if (!mouse && alpha < 1) {
    if (particles[particles.length - 1].radius >= 0.7) {
      particles[particles.length - 1].radius -= 0.7
    }
    alpha += 0.005
    radians -= 0.009
  }

  radians += 0.001
}
init()
animate()

