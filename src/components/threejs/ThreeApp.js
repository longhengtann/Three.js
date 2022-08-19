import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as shader from './Shaders/Shader';

const starsTexture = './img/stars.jpg';
const sunTexture = './img/sun.jpg';
const mercuryTexture = './img/mercury.jpg';
const venusTexture = './img/venus.jpg';
const earthTexture = './img/earth.jpeg';
const marsTexture = './img/mars.jpg';
const jupiterTexture = './img/jupiter.jpg';
const saturnTexture = './img/saturn.jpg';
const saturnRingTexture = './img/saturn ring.png';
const uranusTexture = './img/uranus.jpg';
const uranusRingTexture = './img/uranus ring.png';
const neptuneTexture = './img/neptune.jpg';
const plutoTexture = './img/pluto.jpg';

export default class Sketch {
  constructor(selector) {
    this.mercury;
    this.venus;
    this.earth;
    this.mars;
    this.jupiter;
    this.saturn;
    this.uranus;
    this.neptune;
    this.pluto;

    this.container = selector;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.set(-90, 140, 140);
    this.controls.update();

    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);

    this.cubeTextureLoader = new THREE.TextureLoader();
    this.scene.background = this.cubeTextureLoader.load(starsTexture);

    this.textureLoader = new THREE.TextureLoader();

    this.createSun();
    this.allPlane();
    this.resize();
    this.render();
  }

  resize() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  createSun() {
    this.ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(this.ambientLight);

    this.sunGeo = new THREE.SphereGeometry(16, 30, 30);
    this.sunMat = new THREE.MeshBasicMaterial({
      map: this.textureLoader.load(sunTexture),
    });
    this.sun = new THREE.Mesh(this.sunGeo, this.sunMat);
    this.scene.add(this.sun);
  }

  createPlane(size, texture, position, ring) {
    this.geo = new THREE.SphereGeometry(size, 30, 30);
    this.mat = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load(texture),
    });

    this.mesh = new THREE.Mesh(this.geo, this.mat);
    this.obj = new THREE.Object3D();
    this.obj.add(this.mesh);

    if (ring) {
      this.ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
      this.ringMat = new THREE.MeshBasicMaterial({
        map: this.textureLoader.load(ring.texture),
        side: THREE.DoubleSide,
      });
      this.ringMesh = new THREE.Mesh(this.ringGeo, this.ringMat);
      this.obj.add(this.ringMesh);

      this.ringMesh.position.x = position;
      this.ringMesh.rotation.x = -0.5 * Math.PI;
    }

    this.scene.add(this.obj);
    this.mesh.position.x = position;

    return { mesh: this.mesh, obj: this.obj };
  }

  allPlane() {
    this.mercury = this.createPlane(3.2, mercuryTexture, 28);
    this.venus = this.createPlane(5.8, venusTexture, 44);
    this.earth = this.createPlane(6, earthTexture, 62);
    this.mars = this.createPlane(4, marsTexture, 78);
    this.jupiter = this.createPlane(12, jupiterTexture, 100);
    this.saturn = this.createPlane(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      texture: saturnRingTexture,
    });
    this.uranus = this.createPlane(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      texture: uranusRingTexture,
    });
    this.neptune = this.createPlane(7, neptuneTexture, 200);
    this.pluto = this.createPlane(2.8, plutoTexture, 216);

    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    this.scene.add(pointLight);
  }

  animate() {
    // self rotation
    this.sun.rotateY(0.004);
    this.mercury.mesh.rotateY(0.004);
    this.venus.mesh.rotateY(0.002);
    this.earth.mesh.rotateY(0.02);
    this.mars.mesh.rotateY(0.018);
    this.jupiter.mesh.rotateY(0.04);
    this.saturn.mesh.rotateY(0.038);
    this.pluto.mesh.rotateY(0.008);

    // Rotation around sun
    this.mercury.obj.rotateY(0.04);
    this.venus.obj.rotateY(0.015);
    this.earth.obj.rotateY(0.01);
    this.mars.obj.rotateY(0.008);
    this.jupiter.obj.rotateY(0.002);
    this.saturn.obj.rotateY(0.0009);
    this.uranus.obj.rotateY(0.0004);
    this.neptune.obj.rotateY(0.0001);
    this.pluto.obj.rotateY(0.00007);

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.setAnimationLoop(this.animate());
  }
}
