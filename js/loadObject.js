//NOTE setup canvas for render content
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

//NOTE setup scene
var scene = new THREE.Scene();

// ENV MAPS
const  sceneTextureLoader = new THREE.TextureLoader()

sceneTextureLoader.load('../img/Vangvieng.jpeg',(img)=>{
    scene.background = img
})

// scene.background = new THREE.Color(0x334756);

//NOTE setup camera
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);



camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 10;


//setup resizing window
window.addEventListener('resize', ()=> {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})



//NOTE setup control
controls = new THREE.OrbitControls(camera, renderer.domElement)


hlight = new THREE.AmbientLight (0x404040,8);
scene.add(hlight);


var material = new THREE.MeshFaceMaterial();
var model;
let loader = new THREE.GLTFLoader();
loader.load('models/Tiger_Head_Bottle.gltf', function(gltf){
    
  gltf.scene.position.x = -2.5;
  gltf.scene.position.y = 0.3;
  model = gltf.scene;
  scene.add(model);
});


//create the shape
var geometry = new THREE.BoxGeometry(6,3.5,3.5);
var cubeMaterials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/dark_beer_side_HD.png"), side: THREE.DoubleSide }), // x axis left
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/dark_beer_side_HD.png"), side: THREE.DoubleSide }), // x axis right
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/dark_beer_top_HD.png"), side: THREE.DoubleSide }), // y top
    new THREE.MeshBasicMaterial({ color: 0xebbb70, side: THREE.DoubleSide }), // y bottom
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/dark_beer_front_HD.png"), side: THREE.DoubleSide }), // z axis front
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("img/dark_beer_front_HD.png"), side: THREE.DoubleSide }), // z axis back
]
//create material, color or image texture
// var material = new THREE.MeshBasicMaterial({color: 0xF0A500, wireframe: true});
var material = new THREE.MeshFaceMaterial(cubeMaterials);
var cube = new THREE.Mesh( geometry, material);
cube.position.x = 2
cube.position.z = -1.5

scene.add(cube);



//update animation here
var updateAnimation = function (){
    // cube.rotation.x += .01;
    cube.rotation.y += .005;
    model.rotation.y += .005;
}



//draw scene
var render = function(){
    renderer.render(scene, camera);
};

//run animation loop(update, render and repeat)
var animate = function(){
    requestAnimationFrame(animate);

    updateAnimation();
    render();
}

animate();