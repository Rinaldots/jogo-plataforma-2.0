//load arrays
const arraylenght= 100;
const platCode = 50;
const tileSize = 64 ;
let i;


Array.prototype.parse2D = function(){
    const subArray = []
    
    for(i = 0; i<this.length;){
        subArray.push(this.slice(i , (i+=arraylenght)))
    }
    
    return subArray
}




Array.prototype.createMap = function(){
    const collisionObject =[]
    this.forEach((subArray, y) => {
        subArray.forEach((symbol, x) => {
            if(symbol > 0){
                collisionObject.push(new LimitsBlocks({
                    position:{
                        x: x * tileSize,
                        y: y * tileSize,
                    }
                }
                
                ))
            }//console.log(collisionObject.lenght)
        })
    })





    return collisionObject
}


class LimitsBlocks {
    constructor({ position }){ this.position = position
        this.width = tileSize
        this.height = tileSize
    }

    draw(){
        
        context.fillStyle = 'rgba(25,25,25,0.4)'
        context.fillRect(this.position.x,this.position.y,60,60)
        context.restore();
        
    }
}


//draw map