let canvas 
let canvasContext
let ballX = 50
let ballSpeedX = 15
let ballY = 50
let ballSpeedY = 15

let playerOneScore = 0
let playerTwoScore = 0

let paddleOneY = 250
let paddleTwoY = 250
const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 10

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
    paddleOneY = mousePosition.y - (PADDLE_HEIGHT / 2)
    // paddleTwoY = mousePosition.y - (PADDLE_HEIGHT / 2)
  })
}

function ballReset() {
  ballSpeedX = -ballSpeedX
  // (Math.random() < 0.5 ? -1 : 1)
  ballX = canvas.height / 2
  ballY = canvas.width / 2
}

function computerMovement() {
  const paddleTwoYCenter = paddleTwoY + (PADDLE_HEIGHT / 2)

  if (paddleTwoYCenter < ballY - 35) {
    paddleTwoY += 14
  } else if (paddleTwoYCenter > ballY + 35) {
    paddleTwoY -= 14
  }
}

function moveEverything() {
  computerMovement()

  ballX += ballSpeedX
  ballY += ballSpeedY

  if (ballX < 0) {
    if (ballY > paddleOneY && ballY < paddleOneY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX

      let deltaY = ballY - (paddleOneY + PADDLE_HEIGHT / 2)
      ballSpeedY = deltaY * 0.35
      
    } else {
      ballReset()
      playerTwoScore ++
    }
  }
  if (ballX > canvas.width) {
    // ballSpeedX = -ballSpeedX
    if (ballY > paddleTwoY && ballY < paddleTwoY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX
    } else {
      ballReset()
      playerOneScore ++
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY
  }
}

function drawEverything() {
  // Game Background
  colorRect(0, 0, canvas.width, canvas.height, 'black')

  // Player One Paddle
  colorRect(0, paddleOneY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white')

  // Player Two Paddle (Computer)
  colorRect(canvas.width - PADDLE_WIDTH, paddleTwoY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white')

  // Game Ball
  colorCircle(ballX, ballY, 10, 'white')

  canvasContext.fillText(playerOneScore, 100, 100)
  canvasContext.fillText(playerTwoScore, canvas.width - 100, 100)
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