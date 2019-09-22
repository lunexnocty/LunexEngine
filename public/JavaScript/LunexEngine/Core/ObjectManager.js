ImportJS("./JavaScript/LunexEngine/Math/Vector3D.js");

class ObjectManager {
    constructor() {
        this.objects = new Object();
        this.index = 0;
    }
    
    Append(controllableobject) {
        this.objects[controllableobject.id] = controllableobject;
    }
    
    GetObjectById(id) {
        return this.objects[id];
    }
}

class ControllableObject {
    constructor(id) {
        this.app = Application.GetInstance();
        this.id = id || this.app.objectManager.index ++;
        this.position = Vector3D.Zero();
        this.layer = 0;
        this.context = this.app.context;
        this.app.objectManager.Append(this);
    }
    Update() {
        
    }
    Render() {
        
    }
    Destory() {
        delete this.app.objectManager.objects[this.id];
    }
    Reset() {

    }
}

class MassEntity extends ControllableObject {
    constructor(id, position, mass) {
        super(id);
        this.position = position;
        this.mass = mass;
        this.velocity  = Vector3D.Zero();
        this.force = Vector3D.Zero();
    }
    Update() {
        super.Update();
        if(this.mass == 0) {
            this.Destory();
        }
        this.UpdateMotion();
    }
    UpdateMotion() {
        let acceleration = this.force.Scale(1 / this.mass);
        this.velocity = this.velocity.Plus(acceleration.Scale(this.app.deltaTime / 1000));
        this.position = this.position.Plus(this.velocity.Scale(this.app.deltaTime / 1000));
    }
    AddForce(force) {
        this.force = this.force.Plus(force);
    }
    Reset() {
        this.force = Vector3D.Zero();
    }
}