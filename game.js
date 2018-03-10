let canvas 
let canvasContext
let ballX = 50
let ballSpeedX = 15


window.onload = () => {
  console.log('hello world')

  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  const framesPerSecond = 30
  setInterval(() => { 
    moveEverything()
    drawEverything() 
  }, 1000/framesPerSecond)
}

function moveEverything() {
  ballX = ballX + ballSpeedX

  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  colorRect(0, 250, 10, 100, 'white')
  colorRect(ballX, 100, 10, 10, 'red')
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor
  canvasContext.fillRect(leftX, topY, width, height)
}