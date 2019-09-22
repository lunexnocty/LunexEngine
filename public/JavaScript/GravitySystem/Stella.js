ImportJS("./JavaScript/LunexEngine/Core/ObjectManager.js")

class Stella extends MassEntity {
    constructor(id, position, mass) {
        super(id, position, mass);
        this.velocity = new Vector3D();
        this.trace = new Array();
    }
    Render() {
        this.RenderSelf();
        this.RenderTrace();
    }
    Update() {
        super.Update();
        this.Trace(this.position.Clone())
    }
    Trace(pos) {
        if(this.trace.length < 20) {
            this.trace.push(pos);
        } else {
            this.trace.shift();
            this.trace.push(pos);
        }
    }
    RenderSelf() {
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
        this.context.fillStyle = 'blue';
        this.context.closePath();
        this.context.fill();
    }
    RenderTrace() {
        let id = 0;
        for(id = 0; id < this.trace.length - 1; id++) {
            this.context.moveTo(this.trace[id].x, this.trace[id].y);
            this.context.lineTo(this.trace[id + 1].x, this.trace[id + 1].y);
            this.context.stroke();
        }
        this.context.moveTo(this.trace[id].x, this.trace[id].y);
        this.context.lineTo(this.position.x, this.position.y);
        this.context.stroke();
    }
    Reset() {
        super.Reset();
    }
}