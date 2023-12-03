const itemscr = []
for(let intensLoad = 0; intensLoad < 72; intensLoad++){
    if(intensLoad<10){
        intensLoad = "0"+intensLoad;
    }
    itemscr.push('./data/item/Item__'+intensLoad+'.png')
}

var itens = []
class Item{
    constructor({
        collisionlimitsBlock = [],
        position,
        size,
        code
    })
    {
        this.position = position
        this.collisionlimitsBlock = collisionlimitsBlock
        this.size = size
        this.code = code
        this.hitbotton = false
        this.canPick = false
        this.image = new Image() 
        this.image.src = itemscr[code]
        this.velocity = {
            x:0,
            y:0
        }
        this.audio = new Audio("./data/menu/sound/object_drop.mp3")
        
        //music effects
        this.sound = {
            drop: {
                src: "./data/menu/sound/object_drop.mp3"
            },
        }
        this.currentSound = this.sound.idle
    }

    
    draw(){
        context.imageSmoothingEnabled = false;
        context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
        context.restore();    
    }
    gravity(){      
    if(!(this.hitbotton)){
        this.colision(this.position.x,this.position.y)
        this.velocity.y+=gravity
        this.position.y+=this.velocity.y
    }
     }
    
    CheckPick(){
        
        const x1Botton=mainPlayer.position.y+mainPlayer.size.height
        const x1Top=mainPlayer.position.y
        var x1Left;
        var x1Right;
        const x2Botton=this.position.y+this.size;
        const x2Top=this.position.y;
        const x2Left=this.position.x;
        const x2Right=this.position.x+this.size;
      
        
        x1Left=mainPlayer.position.x;
        x1Right=mainPlayer.position.x+mainPlayer.size.width;
        
        

        /*debugRect(x1Left,x1Top,1,'1')
        debugRect(x1Left,x1Botton,1,'2')
        debugRect(x1Right,x1Botton,1,'3')
        debugRect(x1Right,x1Top,1,'4')

        
        debugRect(x2Left,x2Top,1,'1')
        debugRect(x2Left,x2Botton,1,'2')
        debugRect(x2Right,x2Botton,1,'3')
        debugRect(x2Right,x2Top,1,'4')*/


        if(
        (x1Right>x2Right&&x1Left<x2Left)&&(x1Botton<=x2Botton)&&(x1Botton>=x2Top)){
            context.font = "10px serif";
            context.textAlign = 'center'
            context.fillStyle = "red"
            context.fillText('press E to pick', mainPlayer.position.x+enemyLifeBarX/2,mainPlayer.position.y-enemyLifeBarY+20)
            context.restore()
            this.canPick = true
        }else{
            this.canPick = false
        }

        
        }

    colision(x,y){
        
        this.hitbotton = false
      
        for(let k = 0;k < this.collisionlimitsBlock.length ; k++){
            const collisionBlock = this.collisionlimitsBlock[k]

            var x1Left= x;
            var x1Right= x + this.size
            
            var x2Left= collisionBlock.position.x
            var x2Right= collisionBlock.position.x+collisionBlock.width

            var x1Botton= y+this.size

            var x2Top= collisionBlock.position.y;
            var x2Bottom= collisionBlock.position.y+collisionBlock.height

            var borderHit = this.velocity.y+1

            if((((x1Left+borderHit>= x2Left)&&(x1Left+borderHit<= x2Right))
            ||((x1Right-borderHit <= x2Right)&&(x1Right-borderHit >= x2Left))
             ||((x1Left<x2Left)&&(x1Right>x2Right)))&&(x1Botton<=x2Bottom)&&(x1Botton>=x2Top))
            
            {
                this.hitbotton = true
                this.playAudio("drop")
                this.velocity.y=0;
                this.position.y = x2Top-this.size;
            }
           
        }
        
    }


    playAudio(type){
     
        this.audio.src = this.sound[type].src

        this.audio.load()

        this.audio.play() 

     
    }
    animate(){
        if(this != 0 ){
        this.gravity()
        this.CheckPick()
        this.draw()  
        }
        
        
    }
}
    
function itemDrop(item,PositionX,PositionY){
    
    itens[itens.length] = new Item({
        collisionlimitsBlock,
        position:{
            x:PositionX,
            y:PositionY,
        },
        size: 32,
        code: item
    })
    console.log(itens)
    }
