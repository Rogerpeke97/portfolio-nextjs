import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class WavesClass {
  renderer: THREE.WebGLRenderer
  resolution: THREE.Vector2
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene = new THREE.Scene()
  clock: THREE.Clock = new THREE.Clock()
  observerOfCanvasContainer: ResizeObserver
  particlesInScene: number = 0
  particleWaveTime = 0
  controls: OrbitControls
  animationFrameId: number = 0
  currentColorMode: string = localStorage.getItem('chakra-ui-color-mode') || "light"
  canvasContainer = {
    width: 0,
    height: 0
  }
  CAMERA_POSITION = {
    x: 0,
    y: 1,
    z: 5
  }
  CAMERA_ROTATION = {
    x: -0.7,
    y: 0, 
    z: 0 
  }
  RGB_PARTICLES_PROPERTIES = {
    r: {
      max: 1,
      min: 0.27
    },
    g: {
      max: 1,
      min: 0.15
    },
    b: {
      max: 1,
      min: 0.74
    }
  }
  increasingRGB: boolean = true
  constructor(canvas: HTMLCanvasElement) {
    this.resolution = new THREE.Vector2(canvas.clientWidth, canvas.clientHeight)
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas })
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.setupIllumination()
    this.setUpRenderer()
    this.setCameraPositionAndAspect()
    // this.setCameraControls()
    this.setupParticleSystem()
    this.renderScene()
    this.updateRendererAndCamera()
    this.updateRGBValuesOfParticlesAndSceneBg()
    this.trackWindowAndContainerResize()
    this.setupListeners()
    this.checkIfCanvasIsInDOM()
  }
  private setupListeners(){
    window.addEventListener('storage', this.updateRGBValuesOfParticlesAndSceneBg.bind(this))
  }
  private updateRGBValuesOfParticlesAndSceneBg() {
    const currentColorMode = localStorage.getItem('chakra-ui-color-mode')
    this.currentColorMode = currentColorMode || "light"
    this.scene.background = new THREE.Color(this.currentColorMode === "dark" ? "#0e0e0e" : "#8594b3")
  }
  private moveAndChangeColorOfParticles () {
    const particleSystem = this.scene.getObjectByName('particleSystem')
    const PARTICLE_WAVE_PERIOD = 1000;
    let particleMaxPositionWave;
    let star = particleSystem.geometry.attributes.position.array;
    let particleColor = particleSystem.material.color;
    Object.keys(particleColor).forEach(rgbColor => {
      if(rgbColor === "isColor") return
      const particleColorAtMaxRGBValue = Object.values(particleColor).every((currentRgb, index) =>
        [true, this.RGB_PARTICLES_PROPERTIES.r.max, this.RGB_PARTICLES_PROPERTIES.g.max, this.RGB_PARTICLES_PROPERTIES.b.max].filter((rgbMax, indexFilter) => {
          return rgbMax === currentRgb && index === indexFilter
        }).length)

      const particleColorAtMinRGBValue = Object.values(particleColor).every((currentRgb, index) =>
        [true, this.RGB_PARTICLES_PROPERTIES.r.min, this.RGB_PARTICLES_PROPERTIES.g.min, this.RGB_PARTICLES_PROPERTIES.b.min].filter((rgbMin, indexFilter) => {
          return rgbMin === currentRgb && index === indexFilter
        }).length)

      if (particleColorAtMaxRGBValue && this.increasingRGB) {
        this.increasingRGB = false
      }
      if (particleColorAtMinRGBValue && !this.increasingRGB) {
        this.increasingRGB = true
      }
      const particleColorBelowMaxRGB = particleColor[rgbColor] + 0.001 <= this.RGB_PARTICLES_PROPERTIES[rgbColor].max
      const particleColorAboveMinRGB = particleColor[rgbColor] - 0.001 >= this.RGB_PARTICLES_PROPERTIES[rgbColor].min

      if(this.increasingRGB){
        particleColor[rgbColor] = parseFloat((particleColorBelowMaxRGB ? particleColor[rgbColor] += 0.001 : particleColor[rgbColor]).toFixed(3))
        return
      }
      particleColor[rgbColor] = parseFloat((particleColorAboveMinRGB ? particleColor[rgbColor] -= 0.001 : particleColor[rgbColor]).toFixed(3))
    })
    for (let i = 1; i < this.particlesInScene * 3; i += 3) {
      particleMaxPositionWave = 0.5 * Math.sin(((2 * Math.PI) / 2.5) * star[i + 1] - ((2 * Math.PI) / PARTICLE_WAVE_PERIOD * this.particleWaveTime));
      star[i] += (particleMaxPositionWave / 100);
      particleSystem.geometry.attributes.position.needsUpdate = true;
      this.particleWaveTime += 0.001;
    }
    this.renderer.render(this.scene, this.camera);
  }
  private trackWindowAndContainerResize() {
    this.observerOfCanvasContainer = new ResizeObserver(this.updateRendererAndCamera.bind(this))
    this.observerOfCanvasContainer.observe(document.getElementById('wavesSceneContainer') as HTMLElement)
  }
  private setCameraPositionAndAspect() {
    this.camera.position.set(this.CAMERA_POSITION.x, this.CAMERA_POSITION.y, this.CAMERA_POSITION.z)
    this.camera.rotation.set(this.CAMERA_ROTATION.x, this.CAMERA_ROTATION.y, this.CAMERA_ROTATION.z)
    this.camera.aspect = this.canvasContainer.width / this.canvasContainer.height
    this.camera.updateProjectionMatrix()
  }
  private setCameraControls(){
    this.controls.target.set(0, 0, 0)
  }
  private updateRendererAndCamera() {
    const wavesContainer = document.getElementById('wavesSceneContainer') as HTMLElement
    this.canvasContainer.width = wavesContainer.clientWidth
    this.canvasContainer.height = wavesContainer.clientHeight
    this.renderer.setSize(this.canvasContainer.width, this.canvasContainer.height)
    this.camera.aspect = this.canvasContainer.width / this.canvasContainer.height
    this.camera.updateProjectionMatrix()
    // this.controls.update()
  }
  private setupIllumination() {
    const directionalLight = new THREE.DirectionalLight(0xBC2732, 1)
    directionalLight.position.set(10, 3, -10)
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
    window.addEventListener('storage', this.updateRGBValuesOfParticlesAndSceneBg.bind(this))
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
  private renderScene() {
    this.moveAndChangeColorOfParticles()
    this.renderer.render(this.scene, this.camera)
    this.animationFrameId = requestAnimationFrame(this.renderScene.bind(this))
  }
  private setupParticleSystem () {
    const manager = new THREE.LoadingManager()
    const particles = new THREE.BufferGeometry()
    const texture = new THREE.TextureLoader(manager).load('textures/flare.png')
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4528BD, size: 0.04, map: texture, alphaTest: 0.1, // removes black squares
      blending: THREE.CustomBlending,
      transparent: true
    })
    const positions = [];
    for (let row = 5; row > 1; row -= 0.1) {
      let rowParticleCount = -5;
      for (let j = 0; j < 10; j += 0.1) {
        const posX = rowParticleCount;
        const posY = 0;
        const posZ = row;
        positions.push(posX, posY, posZ);
        rowParticleCount += 0.1;
      }
    }
    this.particlesInScene = positions.length / 3
    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const particleSystem = new THREE.Points(particles, particleMaterial);
    particleSystem.receiveShadow = true;
    particleSystem.castShadow = true;
    particleSystem.name = 'particleSystem';
    this.scene.add(particleSystem)
  }
  setCanvasElement(canvas: HTMLCanvasElement) {
    this.renderer.domElement = canvas
  }
  setDirectionalLightTarget(target: THREE.Object3D<THREE.Event>){
    const directionalLight = this.scene.getObjectByName('directionalLight') as THREE.DirectionalLight
    directionalLight.target = target
  }
}
