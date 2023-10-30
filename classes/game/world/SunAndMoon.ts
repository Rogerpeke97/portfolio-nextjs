import * as THREE from 'three';
import { sunFragmentShader } from './utils/shaders';



export class SunAndMoon {
  scene: THREE.Scene;
  clock: THREE.Clock;
  resolution: THREE.Vector2;
  SPHERE_RADIUS = 20;
  STARTING_POSITION = new THREE.Vector3(30, 4, 60);

  constructor(scene: THREE.Scene, clock: THREE.Clock, resolution: THREE.Vector2) {
    this.scene = scene;
    this.clock = clock;
    this.resolution = resolution;
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
        fov: { value: 45 },
      },
      fragmentShader: sunFragmentShader(),
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.set(this.STARTING_POSITION.x, this.STARTING_POSITION.y, this.STARTING_POSITION.z)
    
    sun.name = 'sun'
    this.scene.add(sun)
  }

  public update() {
    const sun = this.scene.getObjectByName('sun') as THREE.Mesh
    console.log()
    // console.log("sun", sun)
    //@ts-ignore
    sun.material.uniforms.time.value = this.clock.getElapsedTime()
  }
}