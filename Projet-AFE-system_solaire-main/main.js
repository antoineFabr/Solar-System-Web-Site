import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
// Setup
//const loader = new FontLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


renderer.render(scene, camera);
camera.position.set(13,5,10);
camera.lookAt(0,0,0);
/*loader.load('fonts/helvetiker_regular.typeface.json' , function (font){
  const geometry = new TextGeometry('hello THREE.js' , {
    font: font,
    size: 80,
		depth: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
  })
})*/

const suntexture = new THREE.TextureLoader().load('./image/8k_sun.jpg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(70,32,32),
  new THREE.MeshStandardMaterial({
    map: suntexture,
  })
  
);
const mercureTexture = new THREE.TextureLoader().load('./image/8k_mercury.jpg');

const mercure = new THREE.Mesh(
  new THREE.SphereGeometry(0.06,32,32),
  new THREE.MeshStandardMaterial({
    map: mercureTexture,
  })
  
);
const venusTexture = new THREE.TextureLoader().load('./image/8k_venus_surface.jpg');

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(0.2,32,32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
  
);
const earthTexture = new THREE.TextureLoader().load('./image/8k_earth_daymap.jpg');
const earthNight = new THREE.TextureLoader().load('./image/8k_earth_nightmap.jpg')
const texture = new THREE.TextureLoader().load('./image/8k_earth_normal_map.tif');
const cloud = new THREE.TextureLoader().load('./image/8k_earth_clouds.jpg' );
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.2,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normal: texture,
    
  })
  
);
const marsTexture = new THREE.TextureLoader().load('./image/8k_mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.08,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
  
);
const jupiterTexture = new THREE.TextureLoader().load('./image/8k_jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(7,32,32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
const saturnTexture = new THREE.TextureLoader().load('./image/8k_saturn.jpg');

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(5.8,32,32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
  
);

saturn.rotation.y += 5;

const ringTexture = new THREE.TextureLoader().load('./image/8k_saturn_ring_alpha.png')
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(11,4,2,50,),
  new THREE.MeshStandardMaterial({
    map: ringTexture,
  })
);
ring.rotation.y += 0.25;

const uranusTexture = new THREE.TextureLoader().load('./image/2k_uranus.jpg');

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
  
);
const neptuneTexture = new THREE.TextureLoader().load('./image/2k_neptune.jpg');

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
  
);




// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

/*function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}*/

//Array(200).fill().forEach(addStar);

// Background

//const spaceTexture = new THREE.TextureLoader().load('space.jpg');
//scene.background = spaceTexture;
// Scroll Animation

function moveCamera() {
  

  mercure.rotation.y += 0.001;
  venus.rotation.y += 0.0007;
  earth.rotation.y += 0.001;
  mars.rotation.y += 0.001;
  jupiter.rotation.y += 0.0005;
  saturn.rotation.y += 0.002;
  ring.rotation.z -= 0.001;
  neptune.rotation.y += 0.001;
  uranus.rotation.y += 0.001;
}

//document.body.onscroll = moveCamera;

document.getElementById("right").onclick = function() {rightclique()};
document.getElementById("left").onclick = function() {leftclique()};
let page = 1;

function leftclique(){
  if(page != 1){
    page -= 1;
  }
  changeCamera(page);
}

function rightclique(){
  if(page < 9){
    page += 1;
  }
  changeCamera(page);
}
sun.position.set(-65,0,0);
mercure.position.set(12,0,0);
venus.position.set(15,0,0);
earth.position.set(18,0,0);
mars.position.set(21,0,0);
jupiter.position.set(45,0,0);
saturn.position.set(65,0,0);
ring.position.set(65,0,0);
ring.rotation.x = 1.6;
uranus.position.set(85,0,0);
neptune.position.set(90,0,-70);
scene.add(sun,mercure,venus,earth,mars,jupiter,saturn,ring,uranus,neptune);
function changeCamera(pages){
  //sun
  if (pages == 1){
    gsap.to(camera.position, {
      x: 13,
      y:5,
      z:10,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
    
    //camera.position.set(13,5,1);
    //camera.lookAt(0,0,0);
  }
  //mercure
  if(pages==2)
  {
    gsap.to(camera.position, {
      x: 12,
      y: 0,
      z: -12,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
    
    //camera.position.set(13,5,1);
    //camera.lookAt(0,0,0);
  }
  //venus
  if (pages == 3){
    gsap.to(camera.position, {
      x: 15,
      y:0,
      z:24,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
    //camera.position.set(13,5,1);
    //camera.lookAt(0,0,0);
  }
  //earth
  if(page == 4){
    gsap.to(camera.position, {
      x: -30,
      y: 0,
      z:6,
      
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
  //mars
  if(page == 5){
    gsap.to(camera.position, {
      x: 55,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
  //jupiter
  if(page == 6){
    gsap.to(camera.position, {
      x: 65,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
  //saturn
  if(page == 7){
    gsap.to(camera.position, {
      x: 75,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
  //neptune
  if(page == 8){
    gsap.to(camera.position, {
      x: 85,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
  //uranus
  if(page == 9){
    gsap.to(camera.position, {
      x: 95,
      duration: 1,
      onUpdate: function(){
        camera.lookAt(0,0,0)
      }
    })
  }
}


// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  moveCamera();
}

animate();
