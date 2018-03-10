let canvas 
let canvasContext
let ballX = 50
let ballSpeedX = 5


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
  if (ballX > 800) {
    ballSpeedX = -5
  }
}

function drawEverything() {
  canvasContext.fillStyle = 'black'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  canvasContext.fillStyle = 'white'
  canvasContext.fillRect(0, 250, 10, 100)
  canvasContext.fillStyle = 'red'
  canvasContext.fillRect(ballX, 100, 10, 10)
}