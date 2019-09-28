class Vector3D {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static Zero() {
        return new Vector3D();
    }
    static One() {
        return new Vector3D(1, 1, 1);
    }
    static X() {
        return new Vector3D(1);
    }
    static Y() {
        return new Vector3D(0, 1);
    }
    static Z() {
        return new Vector3D(0, 0, 1);
    }
    Set() {
        if (arguments.length == 1 && arguments[0] instanceof Vector3D) {
            this.x = arguments[0].x;
            this.y = arguments[0].y;
            this.z = arguments[0].z;
        }
        else if(arguments.length == 3) {
            this.x = arguments[0];
            this.y = arguments[1];
            this.z = arguments[2];
        }
        else {
            throw "Invalid arguements with Vector3D::Set()";
        }
        return this;
    }
    Angle(vector) {
        return Math.acos(this.Dot(vector) / (this.Length() * vector.Length()));
    }
    Plus(vector) {
        return new Vector3D(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }
    Minus(vector) {
        return new Vector3D(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
    Dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    Cross(vector) {
        let x = this.y * vector.z - vector.y * this.z;
        let y = this.z * vector.x - vector.z * this.x;
        let z = this.x * vector.y - vector.x * this.y;
        return new Vector3D(x, y, z);
    }
    Normalize() {
        let len = this.Length();
        return new Vector3D(this.x / len, this.y / len, this.z / len);
    }
    Length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
    }
    Clone() {
        return new Vector3D(this.x, this.y, this.z);
    }
    Scale(k) {
        return new Vector3D(this.x * k, this.y * k, this.z * k);
    }
    Distance(vector) {
        return this.Minus(vector).Length();
    }
    static OnLoad() {
        return true;
    }
    static Random(lx=-1, rx=1, ly=-1, ry=1, lz=0, rz=0) {
        let x = Math.random() * (rx - lx) + lx;
        let y = Math.random() * (ry - ly) + ly;
        let z = Math.random() * (rz - lz) + lz;
        return new Vector3D(x, y, z);
    }
}