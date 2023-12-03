var itemMap = []
var itemMapPositionX = []
var itemMapPositionY = []
class backGround{
    constructor({position, source,map}){
    this.position= position
    this.map = map
    this.image = new Image() 
    this.image.src = source
    
    }

    draw() {        
        context.imageSmoothingEnabled = false;
        context.drawImage(
            this.image,
            this.position.x,
            0,
            this.map.width,
            this.map.height
        );
        context.restore();
        
    }

}

const background1 = new backGround ({
    position: {
        x: 0,
        y: 0
    },
    map: {
        width:6400,
        height:1920,
    },
    source: "data/background/mapa.png"         
    
})
function playUiAudio(type,vol){
    let volume = vol || 1 
    let uiAudio = new Audio
    uiAudio.src = "./data/menu/sound/"+type+".mp3"
    uiAudio.volume = volume;
    uiAudio.load()

    uiAudio.play() 
}