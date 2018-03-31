let canvas 
let canvasContext
let ballX = 50
let ballSpeedX = 15
let ballY = 50
let ballSpeedY = 15

let playerOneScore = 0
let playerTwoScore = 0
const WINNING_SCORE = 3

let showWinScreen = false

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

// Restarts game on click
function handleMouseClick() {
  if (showWinScreen) {
    playerOneScore = 0
    playerTwoScore = 0
    showWinScreen = false
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

  canvas.addEventListener('mousedown', handleMouseClick)

  canvas.addEventListener('mousemove', (evt) => {
    let mousePosition = calculateMousePosition(evt) 
    paddleOneY = mousePosition.y - (PADDLE_HEIGHT / 2)
    // paddleTwoY = mousePosition.y - (PADDLE_HEIGHT / 2) // Allows mouse to move both paddles
  })
}

function ballReset() {
  if (playerOneScore >= WINNING_SCORE || playerTwoScore >= WINNING_SCORE) {
    // playerOneScore = 0
    // playerTwoScore = 0
    showWinScreen = true
  }

  ballSpeedX = -ballSpeedX
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
  if (showWinScreen) {
    return
  }

  computerMovement()

  ballX += ballSpeedX
  ballY += ballSpeedY

  if (ballX < 0) {
    if (ballY > paddleOneY && ballY < paddleOneY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX

      let deltaY = ballY - (paddleOneY + PADDLE_HEIGHT / 2)
      ballSpeedY = deltaY * 0.35
      
    } else {
      playerTwoScore ++
      ballReset()
    }
  }

  if (ballX > canvas.width) {
    if (ballY > paddleTwoY && ballY < paddleTwoY + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX

      let deltaY = ballY - (paddleTwoY + PADDLE_HEIGHT / 2)
      ballSpeedY = deltaY * 0.35

    } else {
      playerOneScore ++
      ballReset() 
    }
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY
  }

  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY
  }
}

function drawNet() {
  for(let i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white')
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, 'black')
  
  if (showWinScreen) {
    canvasContext.fillStyle = 'white'
    canvasContext.fillText('Click to Continue', 350, 500)

    if (playerOneScore >= WINNING_SCORE) {
      canvasContext.fillText('Left Player Won', 350, 200)
    } else if (playerTwoScore >= WINNING_SCORE) {
      canvasContext.fillText('Right Player Won', 350, 200)
    }
    return
  }

  // Game Background
  colorRect(0, 0, canvas.width, canvas.height, 'black')

  // Player One Paddle
  colorRect(0, paddleOneY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white')

  // Player Two Paddle (Computer)
  colorRect(canvas.width - PADDLE_WIDTH, paddleTwoY, PADDLE_WIDTH, PADDLE_HEIGHT, 'white')

  // Game Ball
  colorCircle(ballX, ballY, 10, 'white')

  drawNet()

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