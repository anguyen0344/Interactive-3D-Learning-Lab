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

/*Create the keyboard*/
const keyboard = BABYLON.MeshBuilder.CreateBox(
    "keyboard",
    {width:1.2,
        height: 0.06,
        depth:0.35
    },
    scene
);
keyboard.position = new BABYLON.Vector3(0,1.105,-0.48);
keyboard.material = frameMaterial;

/*Create the mouse*/
const mouse = BABYLON.MeshBuilder.CreateBox(
    "mouse",
    {width: 0.18,
        height: 0.1,
        depth: 0.27
    },
    scene
);
mouse.position = new BABYLON.Vector3(0.9,1.125,-0.48);
mouse.material = frameMaterial;

function createBook(name, x, color) {
    const bookHeight = 0.5;
    const book = BABYLON.MeshBuilder.CreateBox(
        name,
        {width:0.16,
            height: bookHeight,
            depth:0.28
        },
        scene
    );
    const deskTop = desk.position.y +0.15 /2 ;
    book.position = new BABYLON.Vector3(
        x,
        deskTop + bookHeight/2,
        0.28
    );
    const bookMaterial = new BABYLON.StandardMaterial(
        name + "Material",
        scene
    );
    bookMaterial.diffuseColor = color;
    book.material = bookMaterial;
    return book;
}

/*Create HTML book*/
const htmlBook = createBook(
    "HTMLBook",
    -1.26,
    new BABYLON.Color3(0.95,0.35,0.16)
);
/*Create CSS book*/
const cssBook = createBook(
    "CSSBook",
    -1.05,
    new BABYLON.Color3(0.15,0.65,0.35)
);

/*Create JavaScript book*/
const jsBook = createBook(
    "JavaScriptBook",
    -0.84,
    new BABYLON.Color3(0.55,0.35,0.85)
);

/*Display information about a programming language */
function showBookInfo(title, description){
    document.getElementById("infoTitle").textContent = title;
    document.getElementById("infoText").textContent = description;
}

/*Make a book clickable*/
function makeBookClickable(book, title, description){
book.actionManager = new BABYLON.ActionManager(scene);
book.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        () => showBookInfo(title, description)
    )
);
/*Enlarge book when mouse enters*/
book.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOverTrigger,
        () => {
            book.scaling.y = 1.1;
            canvas.style.cursor = "pointer";
        }
    )
);

/*Restore book when mouse leaves*/
book.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOutTrigger,
        () => {
            book.scaling.y = 1;
            canvas.style.cursor = "default";
        }
    )
);


}

/*HTML Book */
makeBookClickable(
    htmlBook,
    "Introduction to HTML",
    "HTML stands for HyperText Markup Languege. It defines the structure and content of a webpage."

);
/*CSS Book */
makeBookClickable(
    cssBook,
    "Introduction to CSS",
    "CSS stands for Cascading Style Sheets. It controls the appearance and layout of webpage."

);/*Javascript Book */
makeBookClickable(
    jsBook,
    "Introduction to JavaScript",
    "JavaScript is a programming language that adds logic and interactivity to websites."

);


/* Create a label for a programming book */
function addBookLabel(book, text) {

  const texture = new BABYLON.DynamicTexture(
    text + "Texture",
    { width: 512, height: 512 },
    scene,
    true
  );

  texture.hasAlpha = true;

  texture.drawText(
    text,
    null,
    310,
    "bold 110px Arial",
    "white",
    "transparent",
    true
  );

  const labelMaterial = new BABYLON.StandardMaterial(
    text + "LabelMaterial",
    scene
  );

  labelMaterial.diffuseTexture = texture;
  labelMaterial.useAlphaFromDiffuseTexture = true;
  labelMaterial.disableLighting = true;
  labelMaterial.backFaceCulling = false;

  const label = BABYLON.MeshBuilder.CreatePlane(
    text + "Label",
    { width: 0.145, height: 0.23 },
    scene
  );

  label.parent = book;
  label.position = new BABYLON.Vector3(0, 0, -0.145);
  label.material = labelMaterial;
  label.isPickable = false;

  return label;
}

/* Add labels to the programming books */
addBookLabel(htmlBook, "HTML");
addBookLabel(cssBook, "CSS");
addBookLabel(jsBook, "JS");

/*Render the scene*/
engine.runRenderLoop(() => {
    scene.render();
});
/*Handle Window Resize*/
window.addEventListener("resize", () => {
    engine.resize();
});