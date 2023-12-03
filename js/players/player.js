var gravity = 1;
var border = 0.5;
var maxSpeed = 20;
const enemyLifeBarX= 100;
const enemyLifeBarY= 20;
const lifebarSizeX= 500;
const lifebarSizeY= 50;
const defaultObjectSpritePath = "./data/player/idle.png"
class Player {
    constructor({
        collisionlimitsBlock = [],
        position,
        facing,
        size,
        debugColor,
        lifeTotal,
        sprites,
        scale,
        source,
        offset,
        sound,
        attackDamange,
    }) {
        this.position = position
        
        this.size = size
        this.velocity = {
            x:0,
            y:0,
        }
        this.base= {
            velocity: 3,
            jump: 3,
        }
        this.attackBox={
            position: this.position,
            size:{
                width:60,
                height:100
            }
        }
        
        //colisão
        this.hit={
            botton:false,
            top:false,
            right:false,
            left:false,
        }
        this.camerabox = {
            position: {
                x:0,
                y:0
            },
            size:{
                width:canvasWidth,
                height:canvasHeight,
            },
            velocity: 3.2,
        }
        //debug color
        this.debugColor = debugColor
        //colisão
        this.collisionlimitsBlock = collisionlimitsBlock
        //controles
        //registra ultima tecla
        this.lastKeyPressed
        //posição do movimento
        this.facing = facing
        //ataque
        this.lifeTotal = lifeTotal
        this.atualLife = lifeTotal
        this.isAttacking = false
        this.attackCooldown = 1000
        this.hitting = false
        this.onAttackCooldown
        this.attackDamange = attackDamange
        //sprites
        this.image = new Image() 
        this.image.src = source || defaultObjectSpritePath
        this.sprites = sprites || {
            idle: {
                src: this.image.src,
                totalSpriteFrames: 1,
                framesPerSpriteFrame: 1
            }
        }
        this.scale = scale || 1
        this.currentSprite = this.sprites.idle
        this.currentSpriteFrame = 1
        this.elapsedTime = 0
        this.totalSpriteFrames = this.sprites.idle.totalSpriteFrames
        this.framesPerSpriteFrame = this.sprites.idle.framesPerSpriteFrame
        this.offset = offset || {
            left: 0,
            right: 0,
            y: 0
        }

        this.audio = new Audio("./data/player/sound/idle.mp3")
        
        //music effects
        this.sound = sound || {
            idle: {
                src: "./data/player/sound/idle.mp3"
                
            }
        }
        this.currentSound = this.sound.idle

    }

    //debug draws
    debugDraw(){
        if(this.atualLife>0){
        context.fillStyle = this.debugColor;
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        //fix position of attack box
        if(!this.isAttacking){
        if(this.facing == 'left'){
        context.fillStyle ='rgba(255,0,0,0.5)';
        context.fillRect(this.attackBox.position.x,this.attackBox.position.y,-this.attackBox.size.width,this.attackBox.size.height)
        }

        if(this.facing == 'right'){
        context.fillStyle ='rgba(255,0,0,0.5)';
        context.fillRect(this.attackBox.position.x+this.size.width,this.attackBox.position.y,this.attackBox.size.width,this.attackBox.size.height)
        }
        }
        context.restore()
        this.lifeBar()
    }
    }
    debugCamera(){
        if(this == mainPlayer){
        context.fillStyle= 'rgba(125,125,255,0.5)'
        
        context.fillRect(this.camerabox.position.x+this.camerabox.size.width/8,this.camerabox.position.y,this.camerabox.size.width*6/8,this.camerabox.size.height)

        context.restore()}
    }

    
    
    draw() {     
        this.loadSprite()
        
        this.animateSprite()

        if(this.atualLife !== 'dead'){
            this.lifeBar()
        }  
        
        context.imageSmoothingEnabled = false;
        
        const sizeY = this.image.height*this.scale
        const sizeX = this.image.width*this.scale
        var side;
        
        if(this.facing == 'left' ){
            side = this.offset.left
        }else{
            side = this.offset.right
        }
        
        const xScale = this.facing === "left" ? -1 : 1;

        context.save();
        context.translate(this.position.x, this.position.y);
        
        context.scale(xScale, 1); // Flip the image horizontally if facing left)
        context.drawImage(
            this.image,
            (this.currentSpriteFrame * this.image.width / this.totalSpriteFrames),
            this.offset.y,
            this.image.width / this.totalSpriteFrames,
            this.image.height,
            side,
            0,
            sizeX / this.totalSpriteFrames, // Adjust the width with x-scale
            sizeY
        );
        
        context.restore();
        
    }
    //audio     
    setAudio(type) {
        if(type!="idle"){

        let previousSound = this.currentSound

        if(previousSound!=type){
        this.audio.pause() 


        this.currentSound = type 
        
        

        this.audio.src = this.sound[this.currentSound].src

        
        this.audio.play()

        this.audio.volume = 1;
        console.log(type)
        }

       
        }else{
            this.currentSound = type 
        }
       
        
    }

    playAudio(){
     if(this.audio.paused&&this.currentSound!="idle"){
        this.audio.load()
        this.audio.play()
        
     }else if((this.currentSound == 'idle')&&(this.audio.duration<1)){
        this.audio.pause()
     }
    }
    //sprites load and animate
    animateSprite() {
    if(!paused){
    if(this.atualLife == 'dead'){
            this.currentSpriteFrame = this.totalSpriteFrames-1
        }else{
            this.elapsedTime += 1
            if ((this.elapsedTime >= this.framesPerSpriteFrame)){
        
            this.currentSpriteFrame += 1
              if (this.currentSpriteFrame >= this.totalSpriteFrames) {
           
               this.currentSpriteFrame = 0 
            
        }
        
        this.elapsedTime = 0
        }
    
    
    }
    }
    else{
        this.currentSpriteFrame = this.currentSpriteFrame
    }
}

    setSprite(sprite) {
        this.currentSprite = this.sprites[sprite]
        if (!this.currentSprite) {
            this.currentSprite = this.sprites.idle
        }
    }

    loadSprite() {
        let previousSprite = this.image.src

        this.image = new Image()
        this.image.src = this.currentSprite.src


        this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
        this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame

        let newSprite = this.image.src

        if (previousSprite !== newSprite) {
            
            let previousSpriteImage = new Image()
            previousSpriteImage.src = previousSprite
            
        }
    }

    lifeBar(){
        if(this.atualLife>=0){
            context.fillStyle='white'
            context.fillRect(this.position.x-(enemyLifeBarX-this.size.width)/2,this.position.y-enemyLifeBarY-10,enemyLifeBarX,enemyLifeBarY)
            context.fillStyle='red'
            context.fillRect(this.position.x-(enemyLifeBarX-this.size.width)/2,this.position.y-enemyLifeBarY-10,((enemyLifeBarX*this.atualLife)/this.lifeTotal),enemyLifeBarY)
            context.restore()
        }
    }

    gravity(){      
       if(this.velocity.y<maxSpeed)this.velocity.y+=gravity
    }

    nextStep(){
        
        this.position.x+=this.velocity.x
        
        this.position.y+=this.velocity.y
        
        this.colision(this.position.x,this.position.y)

        if(!(this.hit.botton)){
            this.gravity()
        }
        

        

    }

    colision(x,y){
        
        this.hit.botton = false
        this.hit.top = false
        this.hit.left = false
        this.hit.right = false
        //vertical colision
        for(let k = 0;k < this.collisionlimitsBlock.length ; k++){
            const collisionBlock = this.collisionlimitsBlock[k]

            var x1Left= x;
            var x1Right= x + this.size.width
            
            var x2Left= collisionBlock.position.x
            var x2Right= collisionBlock.position.x+collisionBlock.width

            var x1Top= y;
            var x1Botton= y+this.size.height

            var x2Top= collisionBlock.position.y;
            var x2Botton= collisionBlock.position.y+collisionBlock.height

            var borderHit = this.base.velocity+1

            /*debugRect(x1Left,x1Top,1,'1')
            debugRect(x1Left,x1Botton,1,'2')
            debugRect(x1Right,x1Botton,1,'3')
            debugRect(x1Right,x1Top,1,'4')
            debugRect(x2Left,x2Top,1,'1')
            debugRect(x2Left,x2Botton,1,'2')
            debugRect(x2Right,x2Botton,1,'3')
            debugRect(x2Right,x2Top,1,'4')*/

            //baixo
            if((((x1Left+borderHit>= x2Left)&&(x1Left+borderHit<= x2Right))||((x1Right-borderHit <= x2Right)
            &&(x1Right-borderHit >= x2Left))||((x1Left<x2Left)&&(x1Right>x2Right)))
            &&(x1Botton<=x2Botton)&&(x1Botton>=x2Top))
            
            {
                this.hit.botton = true
                this.velocity.y=0;
                this.position.y = x2Top-this.size.height;
            }
            //cima
            if(((x1Left+borderHit >= x2Left&&x1Left+borderHit <= x2Right)||((x1Right-borderHit <= x2Right)&&(x1Right-borderHit >= x2Left))||((x1Left<x2Left)&&(x1Right>x2Right)))&&
                (x1Top>=x2Top)&&(x1Top<=x2Botton))
            {
                this.hit.top = true
                this.velocity.y = 0;
                this.position.y = x2Botton
            }
            //esquerda
            if(((x1Botton-borderHit<=x2Botton)&&(x1Botton-borderHit>=x2Top)&&(x1Left>=x2Left)&&(x1Left<=x2Right))
            ||(x1Botton-borderHit>=x2Botton)&&(x1Top+borderHit<=x2Top)&&(x1Left>=x2Left)&&(x1Left<=x2Right)){
                
                this.hit.left = true;
                if(this.velocity.x < 0){this.position.x = x2Right}              
                this.velocity.x = 0;
            }
            //direita
            if(((x1Botton-borderHit<=x2Botton)&&(x1Botton-borderHit>=x2Top)&&(x1Right>=x2Left)&&(x1Right<=x2Right))
            ||(x1Botton-borderHit>=x2Botton)&&(x1Top+borderHit<=x2Top)&&(x1Right>=x2Left)&&(x1Right<=x2Right)){
            
                this.hit.right = true;
                if(this.velocity.x > 0){this.position.x = x2Left-this.size.width}
                this.velocity.x = 0;
            }
        }
    }

    jump(){
        
        if(this.hit.botton){
        this.base.jump = 1
        }
        if(this.base.jump>0){
            console.log(this.base.jump)
        this.base.jump -= 1
        this.velocity.y=-25;
        this.setSprite("jumping")
         }

    }
    //attack
    AttackcheckHit(attacker,target){

        
        const x1Botton=attacker.attackBox.position.y+attacker.attackBox.size.height
        const x1Top=attacker.attackBox.position.y
        var x1Left;
        var x1Right;
        const x2Botton=target.position.y+target.size.height;
        const x2Top=target.position.y;
        const x2Left=target.position.x;
        const x2Right=target.position.x+target.size.width;
      
        if(attacker.facing == 'right'){
        x1Left=attacker.attackBox.position.x+attacker.size.width+attacker.attackBox.size.width;
        x1Right=attacker.attackBox.position.x+attacker.size.width;
        }
        if(attacker.facing == 'left'){
        x1Left=attacker.attackBox.position.x-attacker.attackBox.size.width;
        x1Right=attacker.attackBox.position.x    
        }
       
        /*debugRect(x1Left,x1Top,1,'x1Top')
        debugRect(x1Left,x1Botton,1,'x1Left')
        debugRect(x1Right,x1Botton,1,'x1Botton')
        debugRect(x1Right,x1Top,1,'x1Right')

        
        debugRect(x2Left,x2Top,1,'x2Top')
        debugRect(x2Left,x2Botton,1,'x2Left')
        debugRect(x2Right,x2Botton,1,'x2Botton')
        debugRect(x2Right,x2Top,1,'x2Right')*/


        if(((x1Left<=x2Right&&x1Left>=x2Left)||(x1Right>=x2Left&&x1Right<=x2Right)||(x1Left>=x2Left&&x1Right<=x2Right))&&
        ((x1Botton<=x2Botton&&x1Botton>=x2Top)||(x1Top<=x2Botton&&x1Top>=x2Top))
        &&attacker.onAttackCooldown&&!attacker.isAttacking&&!attacker.hitting){
            if(target.atualLife>0){target.atualLife -= attacker.attackDamange;}
            attacker.hitting = true
            }else if(target.atualLife<=0){
                target.atualLife = 'dead'
            }
        }
    attack(){
        
        if (this.onAttackCooldown) return
        this.onAttackCooldown = true
        this.isAttacking = true
        
        if((this.currentSprite !== this.sprites.attacking)){
                this.setSprite("attacking")
                mainPlayer.setAudio("attacking")
        }

        setTimeout(() => {
            this.hitting = false
            this.isAttacking = false
        }, this.attackCooldown/2)

        setTimeout(() => {
            this.onAttackCooldown = false
        }, this.attackCooldown)
    }
    
    //camera code
    updateCamera(){
        //horizontal Move
        if(this.position.x <  this.camerabox.position.x+(this.camerabox.size.width/8))
        {
            this.camerabox.position.x -= this.camerabox.velocity
            camera.position.x += this.camerabox.velocity
        }

        if(this.position.x >  this.camerabox.position.x-this.size.width+(this.camerabox.size.width*7/8))
        {
            this.camerabox.position.x += this.camerabox.velocity
            camera.position.x -= this.camerabox.velocity
        }
        
        //vertical Move
        if(this.position.y > (this.camerabox.position.y+(this.camerabox.size.height)*6/8)){
            
            this.camerabox.position.y += maxSpeed+1
            camera.position.y -= maxSpeed+1
            
        }
        if(this.position.y < this.camerabox.position.y+(this.camerabox.size.height*2/8)){
            this.camerabox.position.y -= this.camerabox.velocity
            camera.position.y += this.camerabox.velocity
        }
        
    }

    animate(){
        //mainPlayer only

        if(this==mainPlayer){
        //this.debugCamera()
        this.updateCamera()

        for(let i4 = 0;i4<enemy.length;i4++){
            this.AttackcheckHit(this,enemy[i4]) 
        }
        
        
        
        }   
        if(!paused){
            this.nextStep()
            this.playAudio()} 
        

        //this.debugDraw()
        
        this.draw() 
        
        
        handleControls()
        
    }
}
