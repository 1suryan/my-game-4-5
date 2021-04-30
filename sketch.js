var PLAY = 1
var END = 0
var gameState = PLAY
var Score = 0


function preload() {

  groundI = loadImage("images/ground2.png")
   marioI = loadAnimation("images/mario00.png","images/mario01.png","images/mario02.png","images/mario03.png")
bgI = loadImage("images/bg.png")
obsI = loadAnimation("images/obstacle1.png","images/obstacle2.png","images/obstacle3.png","images/obstacle4.png")
coinI = loadImage("images/coin.png")
marioStopI = loadAnimation("images/collided.png")
restartI = loadImage("images/restart.png")
gameOverI = loadImage("images/gameOver.png")


}


function setup() {

  createCanvas(600,350)



  ground = createSprite(300,310,600,20)
  ground.addImage(groundI)
console.log(ground.width)
ground.x = ground.width/2
mario = createSprite(50,255)
mario.addAnimation("marioruns",marioI)
mario.addAnimation("marioStops",marioStopI)
mario.scale = 1.5
coinGroup = new Group()
obsGroup = new Group()
restart = createSprite(300,120)
restart.addImage("reset",restartI)
restart.scale = 0.7
gameOver = createSprite(300,80)
gameOver.addImage("over",gameOverI)
restart.visible = false
gameOver.visible = false
}



function draw() {

  background(bgI)

  if (gameState == PLAY) {

    ground.velocityX = -2

    if(ground.x<0) {
      ground.x = ground.width/2
   
    }

    if(keyDown("space") && mario.y>=241.5) {
      mario.velocityY = -10
    }

    mario.velocityY = mario.velocityY + 0.5

    spawnEnemies()

    spawnCoins()

    for(var i = 0; i<coinGroup.length; i++) {
      console.log("hi")
      if(coinGroup.get(i).isTouching(mario)) {
      coinGroup.get(i).destroy()
      
      Score = Score + 1
      
    }
    }

    if (mario.isTouching(obsGroup)){

      gameState = END

    }




  }

  if (gameState == END) {

    ground.velocityX = 0

    obsGroup.setVelocityXEach(0)

    coinGroup.setVelocityXEach(0)

    mario.changeAnimation("marioStops",marioStopI)

    mario.velocityY = 0
    
    obsGroup.setLifetimeEach(-1)

    coinGroup.setLifetimeEach(-1)
 
    restart.visible = true
    
    gameOver.visible = true

    if(mousePressedOver(restart)) {

      reset()


    }
 
    

  }
  fill("white")
  textSize(25)
  text("Score:"+Score,350,50)
  



  mario.collide(ground)

  console.log(mario.y)

  drawSprites()

  

}

  function spawnEnemies() {
    
    if(frameCount % 60 === 0) {

      obstacles = createSprite(600,250)
      obstacles.addAnimation("obsAn",obsI)
      obstacles.velocityX = -3
      obstacles.scale = .7
      obstacles.lifetime = 210
      obsGroup.add(obstacles)
    }    

  }

  function spawnCoins() {
    
    if(frameCount % 60 === 0) {

      coins = createSprite(600,random(130,180))
      coins.addImage("coinIM",coinI)
      coins.scale = .07
      coins.velocityX = -3
      coins.lifetime = 210
      coinGroup.add(coins)

      
      
    }

  }


  function reset() {

    gameState = PLAY

    obsGroup.destroyEach()
    coinGroup.destroyEach()
    restart.visible = false
    gameOver.visible = false
    mario.changeAnimation("marioruns",marioI) 
    Score = 0

  }


