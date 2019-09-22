ImportJS("./JavaScript/LunexEngine/Core/ObjectManager.js");
ImportJS("./JavaScript/LunexEngine/Core/EventManager.js");

class Application {
    constructor() {
        this.frameNumber = null;
        this.canvas = null;
        this.context = null;
        this.deltaTime = 10;
        this.objectManager = null;
        this.eventManager = null;
        this.useGravitation = true;
    }

    Init(canvasId, deltaTime) {
        this.canvas = document.getElementById(canvasId);
        this.objectManager = new ObjectManager();
        this.eventManager = new EventManager();
        this.context = this.canvas.getContext('2d');
        this.frameNumber = 0;
        this.deltaTime = deltaTime;
    }

    static GetInstance() {
        if( !this.instance ) {
            this.instance = new Application();
        }
        return this.instance;
    }
    Run() {
        let self = this;
        this.timer = setInterval( () => {
            self.Reset();
            self.frameNumber += 1;
            self.ShowFrameInfo(self.frameNumber);
            self.eventManager.Execute();
            self.Update();
        }, this.deltaTime);
    }
    Reset() {
        this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        Object.values(this.objectManager.objects).forEach( (obj) => {
            obj.Reset();
        });
    }
    ShowFrameInfo(message) {
        this.context.font = '14px Consolas';
        this.context.textAlign = 'left';
        this.context.fillStyle = 'black'
        this.context.fillText(message, 30, 30);
    }
    Update() {
        if(this.useGravitation) {
            GravitationSystem.GetInstance().Update();
        }
        Object.values(this.objectManager.objects).forEach( (obj) => {
            obj.Update();
            obj.Render();
        });
    }
}