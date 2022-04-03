import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer, scene, camera, orbitControls;
let minPan = new THREE.Vector3(-2, -2, 0);
let maxPan = new THREE.Vector3(0, 0, 0);

function init() {
  // info
  var info = document.createElement("div");
  info.style.position = "absolute";
  info.style.top = "30px";
  info.style.width = "100%";
  info.style.textAlign = "center";
  info.style.color = "#fff";
  info.style.fontWeight = "bold";
  info.style.backgroundColor = "transparent";
  info.style.zIndex = "1";
  info.style.fontFamily = "Monospace";
  info.innerHTML =
    "three.js - Isometric Projection<br/>drag mouse to pan camera<br/>scroll to zoom in or out";
  document.body.appendChild(info);

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // camera
  const aspect = window.innerWidth / window.innerHeight;
  const distance = 30;
  camera = new THREE.OrthographicCamera(
    -distance * aspect,
    distance * aspect,
    distance,
    -distance,
    1,
    1000
  );

  // /////////////////////////////////////////////////////////////////////////

  // method 1 - use lookAt
  //camera.position.set( 20, 20, 20 );
  //camera.lookAt( scene.position );

  // method 2 - set the x-component of rotation
  camera.position.set(30, 50, 30);
  camera.rotation.order = "YXZ";
  camera.rotation.y = -Math.PI / 4;
  camera.rotation.x = Math.atan(-1 / Math.sqrt(2));

  // /////////////////////////////////////////////////////////////////////////

  // controls
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.mouseButtons = {
    LEFT: THREE.MOUSE.RIGHT,
    MIDDLE: THREE.MOUSE.MIDDLE,
    RIGHT: THREE.MOUSE.LEFT,
  };
  orbitControls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  //   orbitControls.addEventListener("change", () => {
  //     animate();
  //   });

  orbitControls.enableZoom = false;
  orbitControls.enablePan = true;
  orbitControls.enableRotate = false;
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.04;
  orbitControls.panSpeed = 0.4;
  orbitControls.maxPolarAngle = Math.PI / 2;

  window.addEventListener(
    "resize",
    () => {
      //   //   camera.aspect = innerWidth / innerHeight;
      //   // update the camera's frustum
      //   camera.updateProjectionMatrix();
      //   // update the size of the renderer AND the canvas
      //   renderer.setSize(innerWidth, innerHeight);
      //   // set the pixel ratio (for mobile devices)
      //   renderer.setPixelRatio(window.devicePixelRatio);
    },
    false
  );

  // ambient
  scene.add(new THREE.AmbientLight(0x444444));

  // light
  let light = new THREE.PointLight(0xffffff, 0.8);
  light.position.set(0, 50, 50);
  scene.add(light);

  // axes
  // scene.add( new THREE.AxisHelper( 40 ) );

  // grid
  let planeGeometry = new THREE.PlaneBufferGeometry(100, 100, 10, 10);
  let planeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    opacity: 0.5,
    transparent: true,
  });
  let grid = new THREE.Mesh(planeGeometry, planeMaterial);
  grid.rotation.order = "YXZ";
  grid.rotation.y = -Math.PI / 2;
  grid.rotation.x = -Math.PI / 2;
  // scene.add( grid );

  const xDistance = 30;
  const zDistance = 30;
  // geometry
  let boxGeometry = new THREE.BoxGeometry(10, 10, 10);

  // material
  let cubeMaterial = new THREE.MeshNormalMaterial();

  // mesh
  // cube = new THREE.Mesh( boxGeometry, cubeMaterial );
  const xOffset = -40;

  // scene.add( cube );
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var mesh = new THREE.Mesh(boxGeometry, cubeMaterial);
      mesh.position.x = xDistance * i + xOffset;
      mesh.position.z = zDistance * j;
      scene.add(mesh);
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  orbitControls.update();
}

// function render() {
//   renderer.render(scene, camera);
// }

init();
animate();
// render();
