ImportJS("./JavaScript/LunexEngine/Core/ObjectManager.js")

class Stella extends MassEntity {
    constructor(id, position, mass, density=5) {
        super(id, position, mass);
        this.velocity = new Vector3D();
        this.trace = new Array();
        this.density = density;
        this.radius = Math.pow( 3 * this.mass / (4 * this.density * Math.PI), 1/3);
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
        if(this.trace.length < this.velocity.Length() / 10 && this.trace.length < 60) {
            this.trace.push(pos);
        } else {
            this.trace.shift();
            this.trace.push(pos);
        }
    }
    RenderSelf() {
        this.context.fillStyle = 'brown';
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        if(this.id == 'stella') {
            this.context.fillStyle = 'black';
        }
        this.context.closePath();
        this.context.fill();
    }
    RenderTrace() {
        let id = 0;
        this.context.strokeStyle = 'yellow';
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

    Devour(entity) {
        this.velocity = this.velocity.Scale(this.mass).Plus(entity.velocity.Scale(entity.mass)).Scale(1 / (this.mass + entity.mass));
        this.mass += entity.mass;
        this.radius = Math.pow( 3 * this.mass / (4 * this.density * Math.PI), 1/3);
        entity.Destory();
    }
}