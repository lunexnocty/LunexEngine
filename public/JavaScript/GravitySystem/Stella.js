ImportJS("./JavaScript/LunexEngine/Core/ObjectManager.js")

class Stella extends MassEntity {
    constructor(id, position, mass, velocity=Vector3D.Zero()) {
        super(id, position, mass);
        this.velocity = velocity;
        this.trace = new Array();
        this.radius = Math.pow( 3 * this.mass / 4 * Math.PI, 1/3);
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
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
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