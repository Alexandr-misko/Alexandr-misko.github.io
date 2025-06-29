class StarfieldEffect {
  constructor(container, options = {}) {
    this.config = {
      starCount: 45000,
      starSize: 1.1,
      starColor: 0xffffff,
      starOpacity: 0.8,
      cameraFov: 40,
      cameraNear: 1,
      cameraFar: 800,
      ...options
    };

    this.container = container;
    this.initThree();
    this.initStarfield();
    this.initEvents();
    this.animate();

    // 初始化容器
    this.container = container;
    
    // 初始化Three.js核心
    this.initThree();
    
    // 初始化星场
    this.initStarfield();
    console.log('Stars object:', this.stars);
    console.log('Scene children:', this.scene.children);
    
    // 初始化事件监听
    this.initEvents();
    
    // 初始渲染
    this.animate();
  }

 initThree() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);

    this.camera = new THREE.PerspectiveCamera(
      this.config.cameraFov,
      window.innerWidth / window.innerHeight,
      this.config.cameraNear,
      this.config.cameraFar
    );
    this.camera.position.z = this.config.cameraFar / 2;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0.0);
    this.container.appendChild(this.renderer.domElement);
  }

  initStarfield() {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(this.config.starCount * 3);
    
    for (let i = 0; i < this.config.starCount; i++) {
      vertices[i * 3] = (Math.random() - 0.5) * 2000;
      vertices[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      vertices[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({
      color: this.config.starColor,
      size: this.config.starSize,
      transparent: true,
      opacity: this.config.starOpacity
    });

    this.stars = new THREE.Points(geometry, material);
    console.log('Stars object:', this.stars); // 调试
    this.scene.add(this.stars);
    console.log('Scene children:', this.scene.children); // 调试
    
  }

  initEvents() {
    // 鼠标移动事件
    this.onMouseMove = (e) => {
      this.mouseX = e.clientX - window.innerWidth / 2;
      this.mouseY = e.clientY - window.innerHeight / 2;
    };
    window.addEventListener('mousemove', this.onMouseMove);

    // 窗口调整事件
    this.onWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', this.onWindowResize);
  }

  animate() {
    this.frame = requestAnimationFrame(() => this.animate());
    
    // 鼠标跟随效果
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.005;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.005;
    this.camera.lookAt(this.scene.position);
    // 渲染场景
    this.renderer.render(this.scene, this.camera);

    console.log('Animating...');
  }

  destroy() {
    // 移除事件监听
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onWindowResize);
    
    // 移除渲染器DOM元素
    this.container.removeChild(this.renderer.domElement);
    
    // 释放资源（需根据实际场景补充）
    // this.stars.geometry.dispose();
    // this.stars.material.dispose();
    
    // 清除动画帧
    cancelAnimationFrame(this.frame);
    
    // 清空引用
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.stars = null;
  }
}