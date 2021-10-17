//setup canvas for render content
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

//setup scene
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x334756);
//setup camera
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

//setup resizing window
window.addEventListener('resize', ()=> {
    var width = window.innerWidth;
    var height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//create the shape
var geometry = new THREE.BoxGeometry(1,1,1);

//create material, color or image texture
var material = new THREE.MeshBasicMaterial({color: 0xF0A500, wireframe: true});
var cube = new THREE.Mesh( geometry, material);

scene.add(cube);
camera.position.z = 3;

//update animation here
var updateAnimation = function (){
    cube.rotation.x += .001;
    cube.rotation.y += .001;
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