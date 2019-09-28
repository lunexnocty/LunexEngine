ImportJS("./JavaScript/GravitySystem/Stella.js");
ImportJS("./JavaScript/LunexEngine/LunexEngine.js");

class GravitySystem extends Application {
    constructor() {
        super();
    }


}

function main() {
    let app = Application.GetInstance();
    app.Init('canvas', 40);
    app.Run();
    // let perturbation = 10;
    let s = new Stella('stella', new Vector3D(1024, 633), 5e6, 500);
    for(let i = 0; i < 1000; i++) {
        if(i < 900) {
           let s3 = new Stella('s' + i, Vector3D.Random(512, 1536, 317, 949), Math.random() * 10);
           s3.velocity = s.position.Minus(s3.position).Cross(Vector3D.Z()).Normalize().Scale(Math.sqrt(s.mass / s.position.Distance(s3.position)) /* * Math.sign(Math.random() - 0.6)).Plus(Vector3D.Random().Scale(perturbation) */ );
        } else if(i < 950) {
           let s2 = new Stella('s' + i, Vector3D.Random(512, 1536, 317, 949), Math.random() * 40 + 10);
           s2.velocity = s.position.Minus(s2.position).Cross(Vector3D.Z()).Normalize().Scale(Math.sqrt(s.mass / s.position.Distance(s2.position)) /* * Math.sign(Math.random() - 0.8)).Plus(Vector3D.Random().Scale(perturbation * 0.5) */ );
        } else if(i < 980) {
            let s1 = new Stella('s' + i, Vector3D.Random(512, 1536, 317, 949), Math.random() * 200 + 50);
            s1.velocity = s.position.Minus(s1.position).Cross(Vector3D.Z()).Normalize().Scale(Math.sqrt(s.mass / s.position.Distance(s1.position)) /* * Math.sign(Math.random() - 0.9)).Plus(Vector3D.Random().Scale(perturbation * 0.1) */ );
        } else {
            let s0 = new Stella('s' + i, Vector3D.Random(512, 1536, 317, 949), Math.random() * 1000 + 250);
            s0.velocity = s.position.Minus(s0.position).Cross(Vector3D.Z()).Normalize().Scale(Math.sqrt(s.mass / s.position.Distance(s0.position)));
        }
    }
}

window.onload = () => {
    main();
}