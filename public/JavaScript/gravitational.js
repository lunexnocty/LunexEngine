ImportJS("./JavaScript/GravitySystem/Stella.js");
ImportJS("./JavaScript/LunexEngine/LunexEngine.js");

function main() {
    let app = Application.GetInstance();
    app.Init('canvas', 40);
    app.Run();
    new Stella('stella', new Vector3D(540, 360), 10000);
    for(let i = 0; i < 500; i++) {
        new Stella('s' + i, Vector3D.Random(0, 1080, 0, 720, 0, 0), Math.random() * 40 + 10, Vector3D.Random());
    }
}

window.onload = () => {
    main();
}