//NOTE setup canvas for render content
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

//NOTE setup scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x334756);
//NOTE setup camera
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);



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


//create the shape
var geometry = new THREE.BoxGeometry(1.6,1,1);
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

scene.add(cube);
camera.position.z = 4;


//update animation here
var updateAnimation = function (){
    // cube.rotation.x += .01;
    cube.rotation.y += .005;
    cube.rotation.x = .27;
    // cube.scale.x += .001;
    // cube.rotation.y += .01;

    //TODO rotate camera around the cube || scene
    // camera.position.x += 0.01;
    // camera.lookAt(scene.position);
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