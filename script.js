/* Get the HTML Canvas */
const canvas = document.getElementById("renderCanvas");
/*Create the Babylon Engine */
const engine = new BABYLON.Engine(canvas, true);
/*Create a scene*/
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.05, 0.08, 0.15, 1);
/* Create a camera*/
const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI /2,
    Math.PI / 2.6,
    7, 
    new BABYLON.Vector3(0, 1, 0),
    scene
);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 4;
camera.upperRadiusLimit = 12;
/*Create a light*/
const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0,1,0),
    scene
);
light.intensity = 1;
/*Create the Ground*/
const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    {width: 12, height:12},
    scene
);
/*Create the desk*/
const desk = BABYLON.MeshBuilder.CreateBox(
    "desk",
    {width: 3, height: 0.15, depth: 1.6},
    scene
);
desk.position.y = 1;

/*Create a ground material*/
const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
groundMaterial.diffuseColor = new BABYLON.Color3(0.12, 0.18, 0.27);
ground.material = groundMaterial;
/*Create a desk material*/
const deskMaterial = new BABYLON.StandardMaterial("deskMat", scene);
deskMaterial.diffuseColor = new BABYLON.Color3(0.58, 0.34, 0.20);
desk.material = deskMaterial;

/*Create four desk legs */
for (const x of [-1.3, 1.3]) {
    for (const z of [-0.65, 0.65]){
        const leg = BABYLON.MeshBuilder.CreateBox("leg",
            {
                width: 0.12,
                height: 0.9,
                depth: 0.12
            },
            scene
        );
        leg.position = new BABYLON.Vector3(x, 0.475, z);
        leg.material = deskMaterial;
    }
}


/*Create the monitor stand*/
const stand = BABYLON.MeshBuilder.CreateBox(
    "stand",
    {width: 0.12, height:0.45, depth:0.12},
    scene
);
stand.position.y =1.26;
/*Create the monitor frame*/
const frame = BABYLON.MeshBuilder.CreateBox(
    "frame",
    {width: 1.5, height: 0.9, depth:0.12},
    scene
);
frame.position.y = 1.75;

/*Create a dark material for the frame*/
const frameMaterial = new BABYLON.StandardMaterial("frameMat", scene);
frameMaterial.diffuseColor = new BABYLON.Color3(0.05, 0.07, 0.12);
frame.material = frameMaterial;
stand.material = frameMaterial;
/*Create the computer screen*/
const monitor = BABYLON.MeshBuilder.CreateBox(
"monitor",
{width: 1.3, height: 0.72, depth:0.02},
scene
);
monitor.position = new BABYLON.Vector3(0, 1.75, -0.07);
/* Create the screen material*/
const screenMaterial = new BABYLON.StandardMaterial(
    "screenMat",
    scene
);
screenMaterial.diffuseColor = new BABYLON.Color3(0.02, 0.28, 0.4);
screenMaterial.emissiveColor = new BABYLON.Color3(0.02, 0.35, 0.55);
monitor.material = screenMaterial;

/*Function to display monitor information*/
function showMonitorInfo(){
    document.getElementById("infoTitle").textContent = "Computer Science Workstation";
    document.getElementById("infoText").textContent = "This workstation is where we write code, solve problems, and build software.";

}
/*Make the 3D monitor clickable*/
monitor.actionManager = new BABYLON.ActionManager(scene);
monitor.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        showMonitorInfo
    )
);

/*Connect the Explore Monitor button*/
document.getElementById("exploreMonitor").addEventListener("click",
    showMonitorInfo
);

/*Reset Camera Button*/
document.getElementById("resetView").addEventListener(
    "click",
    () => {
        camera.alpha = -Math.PI /2;
        camera.beta = Math.PI / 2.6;
        camera.radius = 7;
        camera.setTarget(new BABYLON.Vector3(0,1,0));
    }
);





/*Render the scene*/
engine.runRenderLoop(() => {
    scene.render();
});
/*Handle Window Resize*/
window.addEventListener("resize", () => {
    engine.resize();
});