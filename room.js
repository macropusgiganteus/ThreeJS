import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var cube, renderer, scene, camera, orbitControls, DragControls;

init();
render();
// dragControls(renderer.domElement,dragAction,);

// animate();

// function animate(){
//     camera.position.x += 0.01
//     requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

function init() {

	// info
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.innerHTML = 'three.js - Isometric Projection<br/>drag mouse to pan camera<br/>scroll to zoom in or out';
	document.body.appendChild( info );

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();

	// camera
	var aspect = window.innerWidth / window.innerHeight;
	var d = 30;
	camera = new THREE.OrthographicCamera( - d * aspect, d * aspect, d, - d, 1, 1000 );

	// /////////////////////////////////////////////////////////////////////////

	// method 1 - use lookAt
		//camera.position.set( 20, 20, 20 );
		//camera.lookAt( scene.position );

	// method 2 - set the x-component of rotation
		camera.position.set( 30, 50, 30 );
		camera.rotation.order = 'YXZ';
		camera.rotation.y = - Math.PI / 4;
		camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );


	// /////////////////////////////////////////////////////////////////////////

	// controls
	orbitControls = new OrbitControls( camera, renderer.domElement );
    orbitControls.mouseButtons = {
        LEFT: THREE.MOUSE.RIGHT,
        MIDDLE: THREE.MOUSE.MIDDLE,
        RIGHT: THREE.MOUSE.LEFT
    };	
	orbitControls.touches = {
		ONE: THREE.TOUCH.DOLLY_PAN,
		TWO: THREE.TOUCH.ROTATE
	}
    orbitControls.addEventListener( 'change', render );
	orbitControls.enableZoom = true;
	orbitControls.enablePan = true;
    orbitControls.enableRotate = false;
    orbitControls.panSpeed = 0.2 ;
	orbitControls.maxPolarAngle = Math.PI / 2;
    

	// ambient
	scene.add( new THREE.AmbientLight( 0x444444 ) );

	// light
	var light = new THREE.PointLight( 0xffffff, 0.8 );
	light.position.set( 0, 50, 50 );
	scene.add( light );

	// axes
	// scene.add( new THREE.AxisHelper( 40 ) );

	// grid
	var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100, 10, 10 );
	var planeMaterial = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.5, transparent: true } );
	var grid = new THREE.Mesh( planeGeometry, planeMaterial );
	grid.rotation.order = 'YXZ';
	grid.rotation.y = - Math.PI / 2;
	grid.rotation.x = - Math.PI / 2;
	// scene.add( grid );

    var xDistance = 30;
    var zDistance = 30;
	// geometry
	var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );

	// material
	var cubeMaterial = new THREE.MeshNormalMaterial();

	// mesh
	// cube = new THREE.Mesh( boxGeometry, cubeMaterial );
    var xOffset = -40;

	// scene.add( cube );
    for(var i = 0; i< 3; i++){
        for(var j = 0; j< 3; j++){
            var mesh = new THREE.Mesh(boxGeometry, cubeMaterial);
            mesh.position.x = (xDistance * i ) + xOffset;
            mesh.position.z = (zDistance * j);
            scene.add(mesh);
        }
    }


}

function render() {

	renderer.render( scene, camera );

}



