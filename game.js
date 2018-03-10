let canvas 
let canvasContext
let ballX = 50

window.onload = () => {
  console.log('hello world')

  canvas = document.getElementById('gameCanvas')
  canvasContext = canvas.getContext('2d')

  const framesPerSecond = 30
  setInterval(drawEverything, 1000/framesPerSecond)
}

function drawEverything() {
  ballX = ballX + 5

  canvasContext.fillStyle = 'black'
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
  canvasContext.fillStyle = 'orange'
  canvasContext.fillRect(350, 250, 100, 100)
  canvasContext.fillStyle = 'white'
  canvasContext.fillRect(ballX, 100, 10, 10)
}