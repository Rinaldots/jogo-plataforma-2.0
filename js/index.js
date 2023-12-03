const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var enemy = []
var object = []
const canvasWidth = window.innerWidth*0.8
const canvasHeight = window.innerHeight*0.8

const parse2dCollisions = collisionsMap.parse2D()
const collisionlimitsBlock = parse2dCollisions.createMap()

var paused = true;
var inventoryOpen = false;


const camera = {
    position:{
        x:0,
        y:0
    },
}

const mainPlayer = new Player({
    collisionlimitsBlock,
    position:{
        x:100,
        y:1200,
    },
    size: {
        width: 100,
        height: 110,           
    },
    debugColor:'rgba(0,125,255,0.5)',
    lifeTotal:100,
    scale: 3,
    sprites: {
        idle: {
            src: "./data/player/idle.png",
            totalSpriteFrames: 18,
            framesPerSpriteFrame: 10
        },
        running: {
            src: "./data/player/run.png",
            totalSpriteFrames: 24,
            framesPerSpriteFrame: 3
        },
        jumping: {
            src: "./data/player/jump.png",
            totalSpriteFrames: 19,
            framesPerSpriteFrame: 8
        },
        attacking: {
            src: "./data/player/attack.png",
            totalSpriteFrames: 26,
            framesPerSpriteFrame: 5
        }
    },
    offset: {
        left: -130,
        right: -30,
        y: 22
    },  
    sound: {
        idle: {
            src: "./data/player/sound/idle.mp3", 
        },
        running: {
            src: "./data/player/sound/running.mp3",
        },
        jumping: {
            src: "./data/player/sound/jump.mp3",
        },
        attacking: {
            src: "./data/player/sound/attack.mp3"
        }
    },
    attackDamange: 25 
})
enemy[0] = new Zombie({
    collisionlimitsBlock,
    position:{
        x:600,
        y:1200,
    },
    facing: 'left',
    lifeTotal:100,
    attackDamange:10
})
enemy[1] = new Zombie({
    collisionlimitsBlock,
    position:{
        x:1210,
        y:800,
    },
    facing: 'left',
    lifeTotal:100,
    attackDamange:10
})   


//resize canvas to windon lenght and height
function resizeCanvas(){
canvas.width = window.innerWidth*0.8
canvas.height = window.innerHeight*0.8
mainPlayer.camerabox.size.width = window.innerWidth*0.8
mainPlayer.camerabox.size.height = window.innerHeight*0.8
}

window.addEventListener('resize', resizeCanvas)

animate()
function animate() {
    
    resizeCanvas()
    context.save()
    context.fillStyle = "#122636";
    context.fillRect(0,0,canvas.width, canvas.height);
    context.restore()
         
    context.translate(camera.position.x,camera.position.y)
    background1.draw()
    
    /*collisionlimitsBlock.forEach((collisionBlock) => {
        collisionBlock.draw()
    })*/
    for(let i3 = 0; i3<enemy.length; i3++){
        enemy[i3].live()
    }
    
    for(arroz = 0; arroz<itens.length; arroz++){
        itens[arroz].animate()
    }
    
    debugMode("mainPlayer.position.x",mainPlayer.position.x,1)
    debugMode("mainPlayer.position.y",mainPlayer.position.y,2)
    debugMode("mainPlayer.currentSprite",mainPlayer.currentSprite.src,3)
    
    mainPlayer.animate() 
    window.requestAnimationFrame(animate); 
    
    //paused actions
    if(paused){
        pausedText("PAUSED")
    }
    if(inventoryOpen){
           inventoryDraw() 
    }
    
    
   handleControls()
    
}