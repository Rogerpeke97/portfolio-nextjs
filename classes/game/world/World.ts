import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { fragmentShaderParticle, vertexShaderParticle } from './utils/shaders';
import { SunAndMoon } from './SunAndMoon';

export class World {
  renderer: THREE.WebGLRenderer
  resolution: THREE.Vector2
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene = new THREE.Scene()
  clock: THREE.Clock = new THREE.Clock()
  particles = new THREE.BufferGeometry()
  sunAndMoon: SunAndMoon;
  trackedStillParticles: Array<{ index: number, position: THREE.Vector3, wasSetAt: number, angleOfRotation: number }> = []
  animationFrameId: number = 0
  observerOfCanvasContainer!: ResizeObserver
  controls: OrbitControls
  canvasContainer = {
    width: 0,
    height: 0
  }
  trackedKeys = {
    ArrowRight: false,
    ArrowLeft: false,
  }
  PLANET_RADIUS = 10
  PARTICLES_COUNT = 1800
  PARTICLES_DISTANCE = 53
  ALLOWED_KEYS = [' ', 'ArrowLeft', 'ArrowRight']
  PLANET_CENTER = {
    x: 0,
    y: 0,
    z: 0
  }
  CENTER_OBJECT_RADIUS = 10
  FOV = 45
  FAR_PLANE = 1000
  CAMERA_POSITION = new THREE.Vector3(0, 0, 0)
  constructor(canvas: HTMLCanvasElement) {
    this.resolution = new THREE.Vector2(canvas.clientWidth, canvas.clientHeight)
    this.camera = new THREE.PerspectiveCamera(this.FOV, canvas.clientWidth / canvas.clientHeight);
    this.renderer = new THREE.WebGLRenderer({ canvas })
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.addPlanet()
    this.setupIllumination()
    this.setUpRenderer()
    this.setKeyListeners()
    this.setCameraPositionAndAspect()
    this.setCameraControls()
    // this.addAmbientParticles()
    this.renderScene()
    this.updateRendererAndCamera()
    this.trackWindowAndContainerResize()
    this.checkIfCanvasIsInDOM()
    this.sunAndMoon = new SunAndMoon(this.scene, this.clock, this.camera, this.resolution, this.FOV, this.FAR_PLANE)
  }
  private addPlanet() {
    const planetTexture = new THREE
      .TextureLoader()
      .load('/game/textures/rock.jpg', () => {
        planetTexture.wrapS = THREE.RepeatWrapping
        planetTexture.wrapT = THREE.RepeatWrapping
        planetTexture
          .repeat
          .set(2, 2)
      })
    const planetGeometry = new THREE.SphereBufferGeometry(this.PLANET_RADIUS, 50, 50)
    const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture, color: 0x55505a })
    const planet = new THREE.Mesh(planetGeometry, planetMaterial)
    planet.position.set(this.PLANET_CENTER.x, this.PLANET_CENTER.y, this.PLANET_CENTER.z)
    planet.rotation.z = Math.PI / 2
    planet.receiveShadow = true
    planet.name = 'planet'
    // this.scene.add(planet)
  }
  private hasCollidedWithPlanet (vector: THREE.Vector3) {
    const planet = this.scene.getObjectByName('planet') as THREE.Mesh
    const distance = planet.position.distanceTo(vector)
    return distance <= this.PLANET_RADIUS
  }
  private calculateParticleRotation = (vector: THREE.Vector3, indexInArray: number, particlePositions: (THREE.BufferAttribute | THREE.InterleavedBufferAttribute), rotationAngle: number) => {
    const rotationAngleInRadians = rotationAngle * Math.PI / 180
    const particleAfterRotationZ = Math.cos(rotationAngleInRadians) * (vector.z - this.PLANET_CENTER.z) - Math.sin(rotationAngleInRadians) * (vector.y - this.PLANET_CENTER.y) + this.PLANET_CENTER.z
    const particleAfterRotationY = Math.sin(rotationAngleInRadians) * (vector.z - this.PLANET_CENTER.z) + Math.cos(rotationAngleInRadians) * (vector.y - this.PLANET_CENTER.y) + this.PLANET_CENTER.y
    const particleAfterRotationX = vector.x
    particlePositions.setXYZ(indexInArray, particleAfterRotationX, particleAfterRotationY, particleAfterRotationZ)
  }
  private moveParticles () {
    const particlesSystem = this.scene.getObjectByName('particlesSystem') as THREE.Points
    //@ts-ignore
    if (particlesSystem.material?.uniforms) {
      //@ts-ignore
      particlesSystem.material.uniforms.time.value = this.clock.getElapsedTime()
    }
    const particlesPosition = this.particles.getAttribute('position')
    const vectorCollision = new THREE.Vector3()
    let trackedParticle
    for (let i = 0; i < this.PARTICLES_COUNT; i++) {
      if (particlesPosition.getY(i) < -10) {
        particlesPosition.setY(i, particlesPosition.getY(i) + 30)
      }
      vectorCollision.set(particlesPosition.getX(i), particlesPosition.getY(i), particlesPosition.getZ(i))
      if (this.hasCollidedWithPlanet(vectorCollision)) {
        trackedParticle = this.trackedStillParticles.find(particle => particle.index === i)
        if (trackedParticle) {
          if (this.clock.getElapsedTime() - trackedParticle.wasSetAt > 2) {
            this.trackedStillParticles.splice(this.trackedStillParticles.indexOf(trackedParticle), 1)
            particlesPosition.setY(trackedParticle.index, particlesPosition.getY(trackedParticle.index) + 30)
            continue
          }
          this.calculateParticleRotation(vectorCollision, i, particlesPosition, trackedParticle.angleOfRotation)
          if (trackedParticle.angleOfRotation <= 0) {
            trackedParticle.angleOfRotation = 360
            continue
          }
          trackedParticle.angleOfRotation -= 0.01
          continue
        }
        this.trackedStillParticles.push({ index: i, position: vectorCollision, wasSetAt: this.clock.getElapsedTime(), angleOfRotation: 0 })
        continue
      }
      particlesPosition
        .setY(i, particlesPosition.getY(i) - 0.01)
      particlesSystem.geometry.attributes.position.needsUpdate = true
    }
  }
  private trackWindowAndContainerResize() {
    // window.addEventListener('resize', this.updateRendererAndCamera.bind(this))
    this.observerOfCanvasContainer = new ResizeObserver(this.updateRendererAndCamera.bind(this))
    this.observerOfCanvasContainer.observe(document.getElementById('gameSceneContainer') as HTMLElement)
  }
  private setCameraPositionAndAspect() {
    // const ROTATION = {
    //   x: -0.7,
    //   y: 0, 
    //   z: 0 
    // }
    this.camera.position.set(this.CAMERA_POSITION.x, this.CAMERA_POSITION.y, this.CAMERA_POSITION.z)
    // this.camera.rotation.set(ROTATION.x, ROTATION.y, ROTATION.z)
    this.camera.aspect = this.canvasContainer.width / this.canvasContainer.height
    this.camera.updateProjectionMatrix()
  }
  private setCameraControls(){
    this.controls.target.set(0, 0, -2)
  }
  private updateRendererAndCamera() {
    const gameSceneContainer = document.getElementById('gameSceneContainer') as HTMLElement
    this.canvasContainer.width = gameSceneContainer.clientWidth
    this.canvasContainer.height = gameSceneContainer.clientHeight
    this.renderer.setSize(this.canvasContainer.width, this.canvasContainer.height)
    this.camera.aspect = this.canvasContainer.width / this.canvasContainer.height
    this.camera.updateProjectionMatrix()
    this.controls.update()
  }
  private setupIllumination() {
    const directionalLight = new THREE.DirectionalLight(0xBC2732, 1)
    directionalLight.position.set(this.PLANET_CENTER.x, this.PLANET_CENTER.y + this.CENTER_OBJECT_RADIUS * 2, this.PLANET_CENTER.z - 8)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.intensity = 3
    directionalLight.target = this.scene
    const helper = new THREE.DirectionalLightHelper(directionalLight)
    this.scene.add(directionalLight)
    const ambientLight = new THREE.AmbientLight(0xffffff)
    ambientLight.intensity = 0.2
    this.scene.add(ambientLight)
  }
  private setUpRenderer() {
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
  }
  private removeListeners() {
    window.removeEventListener('keydown', this.afterKeyPress.bind(this))
    window.removeEventListener('keyup', this.afterKeyPress.bind(this))
    window.removeEventListener('resize', this.updateRendererAndCamera.bind(this))
  }
  private checkIfCanvasIsInDOM() {
    // while(true){
    //   const canvas = document.getElementById('canvas')
    //   if(!canvas){
    //     this.removeListeners()
    //   }
    // }
  }
  private afterKeyPress (event: KeyboardEvent) {
    console.log(this.ALLOWED_KEYS)
    const isAnAllowedKey = this.ALLOWED_KEYS.includes(event.key)
    if (isAnAllowedKey) {
      this.trackedKeys = { ...this.trackedKeys, [event.key]: false }
    }  
  }
  private setKeyListeners() {
    window.addEventListener('keydown', this.afterKeyPress.bind(this))
    window.addEventListener('keyup', this.afterKeyPress.bind(this))
  }
  private renderScene() {
    this.renderer.render(this.scene, this.camera)
    // this.moveParticles()
    if(this.sunAndMoon?.update) {
      this.sunAndMoon.update()
    }
    this.animationFrameId = requestAnimationFrame(this.renderScene.bind(this))
  }
  private addAmbientParticles () {
    const particleTexture = new THREE.TextureLoader().load('/game/textures/particle.png')
    const positions: Array<number> = []
    const colors: Array<number> = []
    let color = new THREE.Vector3()
    const NORMALIZED_VEC_MAX = 1.0
    let particlePositionX, particlePositionY, particlePositionZ
    for (let i = 0; i < this.PARTICLES_COUNT; i++) {
      particlePositionX = (Math.random() * this.PARTICLES_DISTANCE) - this.PLANET_RADIUS * 2.5
      particlePositionY = (Math.random() * this.PARTICLES_DISTANCE) - this.PLANET_RADIUS * 2.5
      particlePositionZ = Math.random() * this.PARTICLES_DISTANCE - this.PLANET_RADIUS * 2.5
      positions.push(particlePositionX, particlePositionY, particlePositionZ)
      color.set(Math.random() * NORMALIZED_VEC_MAX, Math.random() * NORMALIZED_VEC_MAX, Math.random() * NORMALIZED_VEC_MAX)
      colors.push(color.x, color.y, color.z)
    }
    this.particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    this.particles.setAttribute('customParticleColor', new THREE.Float32BufferAttribute(colors, 3))
    const particleShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: this.clock.getElapsedTime() },
        resolution: { value: this.resolution },
        particleTexture: { value: particleTexture },
        hasToExplode: { value: false }
      },
      vertexShader: vertexShaderParticle(),
      fragmentShader: fragmentShaderParticle(),
      blending: THREE.AdditiveBlending,
      depthTest: true,
      depthWrite: false,
      transparent: true,
    })
    const particlesSystem = new THREE.Points(this.particles, particleShaderMaterial)
    particlesSystem.name = 'particlesSystem'
    particlesSystem.castShadow = true
    this.scene.add(particlesSystem)
  }
  setCanvasElement(canvas: HTMLCanvasElement) {
    this.renderer.domElement = canvas
  }
  setDirectionalLightTarget(target: THREE.Object3D<THREE.Event>){
    const directionalLight = this.scene.getObjectByName('directionalLight') as THREE.DirectionalLight
    directionalLight.target = target
  }
}
