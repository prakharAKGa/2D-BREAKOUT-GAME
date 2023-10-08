/*const grid = document.querySelector('.grid') 

const block = document.createElement('div')
block.classList.add('block')
block.style.left='100px';
block.style.bottom='50px';
grid.appendChild(block)*/

const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const ballDiameter = 20
const boardWidth = 1895
const boardHeight = 940
let xDirection = -5
let yDirection = 5





const userStart = [800, 50]
let currentPosition = userStart

const ballStart = [850, 80]
let ballCurrentPosition = ballStart

let timerId
let score = 0

//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    this.topLeft = [xAxis, yAxis + blockHeight]
  }
}

//all my blocks
const blocks = [
  new Block(1200, 500),
  new Block(1400, 500),
  new Block(600, 500),
  new Block(800, 500),
  new Block(1000, 500),
  new Block(400, 500),
  new Block(1200, 600),
  new Block(1400, 600),
  new Block(1000, 600),
  new Block(800, 600),
  new Block(600, 600),
  new Block(400, 600),
  new Block(1200, 700),
  new Block(1400, 700),
  new Block(600, 700),
  new Block(800, 700),
  new Block(1000, 700),
  new Block(400, 700),
  new Block(200, 700),
  new Block(1600, 700),
  new Block(200, 600),
  new Block(1600, 600),
  new Block(1600, 500),
  new Block(200, 500),
]

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'  
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'  
    grid.appendChild(block)
    console.log(blocks[i].bottomLeft)
  }
}
addBlocks()

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 20
        console.log(currentPosition[0] > 0)
        drawUser()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - blockWidth)) {
        currentPosition[0] += 20
        console.log(currentPosition[0])
        drawUser()   
      }
      break
  }
}
document.addEventListener('keydown', moveUser)

//draw User
function drawUser() {
  user.style.left = currentPosition[0] + 'px'
  user.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px'
  ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//move ball
function moveBall() {
    ballCurrentPosition[0] += (xDirection)
    ballCurrentPosition[1] += (yDirection)
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      BRICK_HIT.play();
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score

      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win!'
        WIN.play();
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser)
      }
    }
  }
  // check for wall hits
  if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[0] <= 0 || ballCurrentPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
    WALL_HIT.play();
  }

  //check for user collision
  if
  (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight ) 
  )
  {
    USER_HIT.play();
    changeDirection()
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    LOSE.play();
    document.removeEventListener('keydown', moveUser)
  }
}


function changeDirection() {
  if (xDirection === 5 && yDirection === 5) {
    yDirection = -5
    return
  }
  if (xDirection === 5 && yDirection === -5) {
    xDirection = -5
    return
  }
  if (xDirection === -5 && yDirection === -5) {
    yDirection = 5
    return
  }
  if (xDirection === -5 && yDirection === 5) {
    xDirection = 5
    return
  }
}

const WALL_HIT = new Audio();
WALL_HIT.src = "sounds/wall.mp3";

const WIN = new Audio();
WIN.src = "sounds/win.mp3";

const BRICK_HIT = new Audio();
BRICK_HIT.src = "sounds/brick_hit.mp3";

const USER_HIT = new Audio();
USER_HIT.src = "sounds/paddle_hit.mp3";

const LOSE= new Audio();
LOSE.src = "sounds/lose.mp3";

const restart = document.getElementById("restart");

restart.addEventListener("click" , function(){
  location.reload();
})

