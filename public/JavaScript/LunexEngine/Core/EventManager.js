ImportJS("./JavaScript/LunexEngine/Math/Vector3D.js");

class EventManager {
    constructor() {
        this.events = new Array();
    }
    Post(event) {
        this.events.push(event);
    }
    Execute() {
        while(this.events.length > 0) {
            this.events.shift().Execute();
        }
    }
    Update() {
        
    }
}

class GravitationSystem {
    constructor() {
        this.app = Application.GetInstance();
        // this.G = 6.67259E2 * 2;
        this.G = 1;
    }
    static GetInstance() {
        if( !this.instance ) {
            this.instance = new GravitationSystem();
        }
        return this.instance;
    }
    Update() {
        Object.values(this.app.objectManager.objects).forEach( (obj) => {
            if(obj instanceof MassEntity) {
                Object.values(this.app.objectManager.objects).forEach( (entity) => {
                    if(entity instanceof MassEntity && !(obj === entity)) {
                        if(obj.position.Distance(entity.position) <= (obj.radius + entity.radius)) {
                            obj.velocity = obj.velocity.Scale(obj.mass).Plus(entity.velocity.Scale(entity.mass)).Scale(1 / (obj.mass + entity.mass));
                            if(obj.mass > entity.mass) {
                                obj.mass += entity.mass;
                                obj.radius = Math.pow( 3 * obj.mass / 4 * Math.PI, 1/3);
                                entity.mass = 0;
                            } else {
                                entity.mass += obj.mass;
                                entity.radius = Math.pow( 3 * entity.mass / 4 * Math.PI, 1/3);
                                obj.mass = 0;
                            }
                        }
                        else {
                            let direction = entity.position.Minus(obj.position);
                            let F = this.G * obj.mass * entity.mass / (direction.Length() ** 2);
                            obj.AddForce(direction.Normalize().Scale(F));
                        }
                    }
                });
            }
        });
    }
}