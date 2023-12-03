class Enemys extends Player {
    constructor({
        collisionlimitsBlock = [],
        position,
        velocity,
        scale,
        sprites,
        offset,
        size,
        lifeTotal,
        attackDamange,
        exist
    }) {
        super({
            collisionlimitsBlock,
            position,
            velocity,
            scale,
            sprites,
            offset,
            lifeTotal,
            attackDamange,
            exist
        })
        this.position = position
        this.size = size
        this.exist = exist
        this.velocity = {
            x:0,
            y:0,
        }
        this.base= {
            velocity: 1,
            jump: 1,
        }

        this.attackBox={
            position: this.position,
            size: this.attackBox.size
        }
        this.hitting = false

        this.sprites

        this.lifeTotal = lifeTotal

        this.isAttacking = false
        this.attackCooldown = 5000
        this.onAttackCooldown
        this.attackDamange = attackDamange

    }

    chase(){
        if(((mainPlayer.position.y+1.5*mainPlayer.size.height)>(this.position.y))&&(mainPlayer.position.y<(this.position.y+2*this.size.height))){
        if((this.position.x < mainPlayer.position.x)&&((mainPlayer.position.y+mainPlayer.size.height)>this.position.y)&&!this.isAttacking){
            this.velocity.x = this.base.velocity;
            this.facing = 'right'
            this.setSprite("running")
        }else if((this.position.x > mainPlayer.position.x)&&((mainPlayer.position.y+mainPlayer.size.height)>this.position.y)&&!this.isAttacking){
            this.velocity.x = -this.base.velocity;
            this.facing = 'left'
            this.setSprite("running")
        }}
        else if(!this.isAttacking){this.velocity.x = 0
            this.setSprite("idle")}
        
        
        if(((Math.abs(this.position.x - mainPlayer.position.x))<this.attackBox.size.width)&&((mainPlayer.position.y+mainPlayer.size.height)>this.position.y)){
            this.velocity.x = 0  
            this.AttackcheckHit(this,mainPlayer)
            this.attack()
            
        }
    }
    live(){
    this.animate() 
        
    if(this.atualLife > 0){
        this.chase()
    
    }else{
        if(this.atualLife != 'dead'){
            itemDrop(Math.ceil(Math.random()*10),this.position.x,this.position.y)
        }
        
        this.velocity.x = 0;
        this.setSprite("dead")
        
    }

    }
}


class Zombie extends Enemys {
    constructor({
        collisionlimitsBlock = [],
        position,
        lifeTotal,
        attackDamange,
        exist
    }) {
        super({
            collisionlimitsBlock,
            position,
            lifeTotal,
            attackDamange,
            exist
        })
        this.position = position
        this.size = {
            width:60,
            height:130
        }

        this.velocity = {
            x:0,
            y:0,
        }

        this.base= {
            velocity: 1,
            jump: 1,
        }

        this.attackBox={
            position: this.position,
            size:{
                width:50,
                height:100
            }
        }
        this.debugColor ='rgba(255,0,255,0.5)'
        this.scale = 1.8
        this.sprites = {
            idle: {
                src: "./data/npc/zombie/Idle.png",
                totalSpriteFrames: 8,
                framesPerSpriteFrame: 10
            },
            running: {
                src: "./data/npc/zombie/Run.png",
                totalSpriteFrames: 7,
                framesPerSpriteFrame: 12
            },
            jumping: {
                src: "./data/player/jump.png",
                totalSpriteFrames: 19,
                framesPerSpriteFrame: 8
            },
            attacking: {
                src: "./data/npc/zombie/Attack_1.png",
                totalSpriteFrames: 5,
                framesPerSpriteFrame: 30
            },
            dead:{
                src: "./data/npc/zombie/Dead.png",
                totalSpriteFrames: 5,
                framesPerSpriteFrame: 3 
            }
        }

        this.offset={
            left: -115,
            right: -55,
            y: 23
        }    

        this.lifeTotal = lifeTotal

        this.isAttacking
        this.attackCooldown = 500
        this.onAttackCooldown
        this.attackDamange = attackDamange

    }
}

function spawnEnemy(type,PositionX,PositionY){
    
    enemy[enemy.length] = new type({
        collisionlimitsBlock,
        position:{
            x:PositionX,
            y:PositionY,
        },
        facing: 'left',
        lifeTotal:100,
        attackDamange:10
    })
    console.log(enemy)
    }


    