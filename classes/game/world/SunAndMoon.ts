import * as THREE from 'three';
import { sunFragmentShader, sunVertexShader } from './utils/shaders';



export class SunAndMoon {
  scene: THREE.Scene;
  camera: THREE.Camera;
  clock: THREE.Clock;
  resolution: THREE.Vector2;
  fov: number;
  farPlane: number;
  SPHERE_RADIUS = 20;
  STARTING_POSITION = new THREE.Vector3(0, 0, -60);
  increasingVal = 0.45;

  constructor(
    scene: THREE.Scene, 
    clock: THREE.Clock,
    camera: THREE.Camera,
    resolution: THREE.Vector2, 
    fov: number,
    farPlane: number,
  ) {
    this.scene = scene;
    this.clock = clock;
    this.resolution = resolution;
    this.fov = fov;
    this.camera = camera;
    this.farPlane = farPlane;
    this.createSun();
  }

  createSun() {
    const sunGeometry = new THREE.SphereGeometry(this.SPHERE_RADIUS, 50, 50)
    const sunMaterial = new THREE.ShaderMaterial({ 
      uniforms: {
        time: { value: this.clock.getElapsedTime() },
        resolution: { value: this.resolution },
        sphereCenter: { value: this.STARTING_POSITION },
        sphereRadius: { value: this.SPHERE_RADIUS },
        fov: { value: this.fov },
      },
      // vertexShader: sunVertexShader(),
      fragmentShader: sunFragmentShader(),
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.set(this.STARTING_POSITION.x, this.STARTING_POSITION.y, this.STARTING_POSITION.z)
    
    sun.name = 'sun'
    this.scene.add(sun)
  }

  public update() {
    const sun = this.scene.getObjectByName('sun') as THREE.Mesh
    //@ts-ignore
    sun.material.uniforms.time.value = this.clock.getElapsedTime()
    // if (sun.position.x > 55) {
    //   this.increasingVal *= -1
    // }
    // if (sun.position.x < -55) {
    //   this.increasingVal *= -1
    // }
    // sun.position.x += this.increasingVal
    // sun.position.y += this.increasingVal
    // sun.position.z += this.increasingVal
  }
}