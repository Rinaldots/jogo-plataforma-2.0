var inventory = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var inventoryscr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var inventorySelection = [0,0];
var inventorySize = 18;
const inventoryfistX = (82/203)
const inventoryfisty = (6/70)
const inventorysrc = "./data/menu/Inventory.png"
const inventorySelectionsrc = "./data/menu/InventorySelection.png"


function inventoryDraw(){


var positionInvX = (canvas.width/2+mainPlayer.camerabox.position.x)-canvas.width*0.4
var positionInvY = (canvas.height/2.5+mainPlayer.camerabox.position.y)-canvas.height*0.2

const inventoryBack = new Image()
inventoryBack.src = inventorysrc

var sizeInvX = canvas.width*0.8
var sizeInvY = sizeInvX*(inventoryBack.height/inventoryBack.width)


context.drawImage(inventoryBack,positionInvX,positionInvY,sizeInvX,sizeInvY)
context.restore()

//selection position and draw
const inventoryBackSelection = new Image()
inventoryBackSelection.src = inventorySelectionsrc

var sizeInvSelection = sizeInvY*(inventoryBackSelection.height/inventoryBack.height)

context.drawImage(
inventoryBackSelection
,(positionInvX+sizeInvX*inventoryfistX)+inventorySelection[0]*(sizeInvSelection-sizeInvSelection/20) 
,(positionInvY+sizeInvY*inventoryfisty)+inventorySelection[1]*(sizeInvSelection-sizeInvSelection/20),
sizeInvSelection,
sizeInvSelection)
context.restore()
//itens draw
for(let i = 0;i<inventorySize;i++){
    const inventoryItem = new Image()
    if(inventoryscr[i] !== 0 ){
        inventoryItem.src = inventoryscr[i] 
    if(i<6){
            context.drawImage(
            inventoryItem
            ,(positionInvX+sizeInvX*inventoryfistX)+sizeInvSelection*0.1+i*(sizeInvSelection-sizeInvSelection/20) 
            ,(positionInvY+sizeInvY*inventoryfisty)+sizeInvSelection*0.1+0*(sizeInvSelection-sizeInvSelection/20),
            sizeInvSelection*0.8,
            sizeInvSelection*0.8)
            context.restore()
    }else if(i<12){        
            context.drawImage(
            inventoryItem
            ,(positionInvX+sizeInvX*inventoryfistX)+sizeInvSelection*0.1+(i-6)*(sizeInvSelection-sizeInvSelection/20) 
            ,(positionInvY+sizeInvY*inventoryfisty)+sizeInvSelection*0.1+1*(sizeInvSelection-sizeInvSelection/20),
            sizeInvSelection*0.8,
            sizeInvSelection*0.8)
            context.restore()     
    }else{
            context.drawImage(
            inventoryItem
            ,(positionInvX+sizeInvX*inventoryfistX)+sizeInvSelection*0.1+(i-12)*(sizeInvSelection-sizeInvSelection/20) 
            ,(positionInvY+sizeInvY*inventoryfisty)+sizeInvSelection*0.1+2*(sizeInvSelection-sizeInvSelection/20),
            sizeInvSelection*0.8,
            sizeInvSelection*0.8)
            context.restore()    
    }
    }
}
}

function inventoryLoad(item){
    for(let i = 0;i<inventorySize;i++){
        if(inventory[i] !== 0 ){             
        } else{
            inventory[i] = item;
            inventoryscr[i] = itemscr[item];
            break;
        }
       
    }
}


function inventoryDrop(){
    if(inventory[(Number(inventorySelection[0])+6*Number(inventorySelection[1]))]!= 0){
    itemDrop(inventory[(Number(inventorySelection[0])+6*Number(inventorySelection[1]))],mainPlayer.position.x,mainPlayer.position.y)
    inventory[(inventorySelection[0]+6*inventorySelection[1])] = 0
    inventoryscr[(inventorySelection[0]+6*inventorySelection[1])] = 0
    }
    
    
}




function pausedText(text){
    context.font = "100px serif";
        context.textAlign = 'center'
        context.fillStyle = "red"
        context.fillText(text, canvas.width/2+mainPlayer.camerabox.position.x,canvas.height/5+mainPlayer.camerabox.position.y,2000)
        context.restore()
}



