import * as THREE from 'three'

const scene = new THREE.Scene();
const camera = new THREE.
OrthographicCamera(75, innerWidth/ innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

const boxGeometry = new THREE.BoxGeometry(
  1, 1, 1
)
const material = new THREE.MeshBasicMaterial({color : 0xFF00FF})
const cube = new THREE.Mesh(boxGeometry, material);

scene.add(cube)
camera.position.set(5,5,5)
camera.lookAt(0,0,0)

const light = new THREE.DirectionalLight(
  0xFF0000, 1
)
light.position.set(5,5,-5)
scene.add(light)

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
 

}
animate()






