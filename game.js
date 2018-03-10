let canvas 
let canvasContext
let ballX = 50
let ballSpeedX = 15
let ballY = 50
let ballSpeedY = 15

let paddleOneY = 250
const PADDLE_HEIGHT = 100

function calculateMousePosition(evt) {
  let rect = canvas.getBoundingClientRect()
  let root = document.documentElement
  let mouseX = evt.clientX - rect.left - root.scrollLeft
  let mouseY = evt.clientY - rect.top - root.scrollTop
  return {
    x: mouseX,
    y: mouseY
  }
}

window.onload = () => {
  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  const framesPerSecond = 30
  setInterval(() => { 
    moveEverything()
    drawEverything() 
  }, 1000/framesPerSecond)

  canvas.addEventListener('mousemove', (evt) => {
    let mousePosition = calculateMousePosition(evt) 
    paddleOneY = mousePosition.y
  })
}

function moveEverything() {
  ballX = ballX + ballSpeedX
  ballY = ballY + ballSpeedY

  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY
  }
}

function drawEverything() {
  // Game Background
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  // Player One Paddle
  colorRect(0, paddleOneY, 10, 100, 'white')
  // Game Ball
  colorCircle(ballX, ballY, 10, 'white')
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.fillRect(leftX, topY, width, height)
}

function colorCircle(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.beginPath()
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
  canvasContext.fill()
}