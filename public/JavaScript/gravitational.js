ImportJS("./JavaScript/GravitySystem/Stella.js");
ImportJS("./JavaScript/LunexEngine/LunexEngine.js");

function main() {
    let app = Application.GetInstance();
    app.Init('canvas', 40);
    app.Run();
    // new Stella('s1', new Vector3D(300, 300), 10, new Vector3D(0, 10));
    // new Stella('s2', new Vector3D(500, 300), 10, new Vector3D(0, -10));
    for(let i = 0; i < 50; i++) {
        new Stella('s' + i, Vector3D.Random(450, 550, 350, 450, 0, 0), 0.01);
    }
}

window.onload = () => {
    main();
}