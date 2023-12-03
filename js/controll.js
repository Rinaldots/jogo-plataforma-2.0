const keys = {
    a: {
        pressed: false,
        hold: false
    },
    d: {
        pressed: false,
        hold: false
    },
    w: {
        pressed: false,
        hold: false
    },
    s: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false
    },
    enter: {
        pressed: false,
        hold: false
    },
    i: {
        pressed: false,
        hold: false
    },
    e: {
        pressed:false,
        hold: false
    },
    q: {
        pressed:false,
        hold:false
    }

}

window.addEventListener("keydown", e => {
    let key = e.key

    switch(key) {
        case "ArrowLeft":
        case "a":
            keys.a.pressed = true
            mainPlayer.lastKeyPressed = key
            break
        case "ArrowRight":
        case "d":
            keys.d.pressed = true
            mainPlayer.lastKeyPressed = key
            break
        case "s":
            keys.s.pressed = true
            break
        case "ArrowUp":
        case "w":
            keys.w.pressed = true
            break
        case "z":
        case " ":
            keys.space.pressed = true
            break
        case "Enter":
            keys.enter.pressed = true
            break
        case "i":
            keys.i.pressed = true
            break
        case "e":
            keys.e.pressed = true
            break
        case "q":
            keys.q.pressed = true
            break
    }
})

window.addEventListener("keyup", e => {
    let key = e.key

    switch(key) {
        case "ArrowLeft":
        case "a":
            keys.a.pressed = false
            keys.a.hold = false
            break
        case "ArrowRight":
        case "d":
            keys.d.pressed = false
            keys.d.hold = false
            break
        case "s":
            keys.s.pressed = false
            keys.s.hold = false
            break
        case "ArrowUp":
        case "w":
            keys.w.pressed = false
            keys.w.hold = false
            break
        case "z":
        case " ":
            keys.space.pressed = false
            keys.space.hold = false
            break
        case "Enter":
            keys.enter.pressed = false
            keys.enter.hold = false
            break
        case "i":
            keys.i.pressed = false
            keys.i.hold = false
            break
        case "e":
            keys.e.pressed = false
            keys.e.hold = false
            break
        case "q":
            keys.q.pressed = false
            keys.q.hold = false
            break
        
    }
})

function handleControls() {
    mainPlayer.velocity.x = 0
    movement()
    if((mainPlayer.velocity.x == 0)&&(!mainPlayer.isAttacking)){
        mainPlayer.setSprite("idle")
        if(mainPlayer.hit.botton){
            mainPlayer.setAudio("idle")
        }
        }
    

    if (!mainPlayer.hit.botton) mainPlayer.setSprite("jumping")

    function movement() {
        
        if (keys.a.pressed && ["a", "ArrowLeft"].includes(mainPlayer.lastKeyPressed)&&(!mainPlayer.isAttacking)) {
        if(paused == false){
            mainPlayer.velocity.x=-mainPlayer.base.velocity;
            mainPlayer.facing = 'left'
            mainPlayer.setSprite("running")
            mainPlayer.setAudio("running")
        }

        if(inventoryOpen == true&&!keys.a.hold){
            if(inventorySelection[0] > 0){
               inventorySelection[0]-- 
            }else{
                inventorySelection[0] = 5
            }
            playUiAudio("open_inventory",0.5)
            keys.a.hold = true
        }
        }
      
        if (keys.d.pressed&& ["d", "ArrowRight"].includes(mainPlayer.lastKeyPressed)&&(!mainPlayer.isAttacking)) {
        if(paused == false){
            mainPlayer.velocity.x=mainPlayer.base.velocity;
            mainPlayer.facing = 'right'
            mainPlayer.setSprite("running")
            mainPlayer.setAudio("running")
        }
        if(inventoryOpen&&!keys.d.hold){
            if(inventorySelection[0] < 5){
               inventorySelection[0]++ 
            }else{
            inventorySelection[0] = 0
            }
            playUiAudio("open_inventory",0.5)
            keys.d.hold = true
        }
        }

        if (keys.w.pressed&&!keys.w.hold) {
        if(paused == false){
            mainPlayer.setAudio("jumping")
            mainPlayer.jump()
            keys.w.hold = true
        }
        if(inventoryOpen == true&&!keys.w.hold){
            if(inventorySelection[1] > 0){
            inventorySelection[1]-- 
            }else{
            inventorySelection[1] = 2  
            }
            playUiAudio("open_inventory",0.5)
            keys.w.hold = true
        }
        }

        if (keys.s.pressed&&!keys.s.hold) {
            if(inventoryOpen&&!keys.s.hold){
                if(inventorySelection[1] < 2){
                inventorySelection[1]++
                }else{
                inventorySelection[1] = 0  
                }
                playUiAudio("open_inventory",0.5)
                keys.s.hold = true
            }
        }

        if (keys.space.pressed&&!keys.space.hold) {
        if(paused == false){
            mainPlayer.attack()
            keys.space.hold = true
            
        }
        }
    
        if (keys.enter.pressed && !keys.enter.hold) {
            if(paused == false){
                playUiAudio("pause")
               paused = true 
            }else if(!inventoryOpen){paused = false }
            
            keys.enter.hold = true
        }
        if (keys.i.pressed && !keys.i.hold) {
            if(inventoryOpen == false){
                playUiAudio("open_inventory")
                inventoryOpen = true
                paused = true
                
            }else{
                playUiAudio("open_inventory")
                inventoryOpen = false
                paused = false
            }
            keys.i.hold = true
        }


        if(keys.e.pressed && !keys.e.hold){
            for(let i2 = 0; i2<itens.length;i2++){
                if(itens[i2].canPick){
                    
                    inventoryLoad(itens[i2].code)
                    itens.splice(i2,1)
                }
            }
            keys.e.hold = true
        }
        if(keys.q.pressed && !keys.q.hold && inventoryOpen){
            inventoryDrop()
            keys.q.hold = true
        }
    }

}
function debugMode(displayName,text,line){
    context.save()
    context.font = "15px serif";
    context.fillStyle = "black"
    context.fillText(displayName,20-camera.position.x,line*30-camera.position.y)
    context.fillText(text,220-camera.position.x,line*30-camera.position.y)
    context.restore()
}
function debugRect(x,y,size,text){
    context.save()
    context.fillStyle= 'black'
    context.fillRect(x,y,4*size,4*size)
    context.fillStyle= 'red'
    context.fillText(text,x,y)
    context.restore()
}