// particleSystem.js
class ParticleSystem {
    constructor(container, params = {}) {
        this.container = container;
        this.params = {
            starCount: 25000,
            starSize: 1.1,
            fogDensity: 0.0001,
            starColor: 0xffffff,
            fogColor: 0x1b1b1b,
            cameraFar: 1000,
            cameraFov: 60,
            ...params
        };
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.stars = null;
        this.nebula = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
    }

    init() {
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createStarfield();
        this.createCentralNebula();
        this.addEventListeners();
        this.animate();
    }

    createScene() {
        this.scene = new THREE.Scene();
    }

    createCamera() {
        const aspect = window.innerWidth / window.innerHeight;
        this.camera = new THREE.PerspectiveCamera(
            this.params.cameraFov,
            aspect,
            0.1,
            this.params.cameraFar
        );
        this.camera.position.z = 400;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    createStarfield() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.params.starCount * 3);

        for (let i = 0; i < this.params.starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2000;
            positions[i+1] = (Math.random() - 0.5) * 2000;
            positions[i+2] = (Math.random() - 0.5) * 2000;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        this.stars = new THREE.Points(geometry, new THREE.PointsMaterial({
            color: new THREE.Color(this.params.starColor),
            size: this.params.starSize,
            transparent: true,
            opacity: 0.85,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        }));
        this.scene.add(this.stars);
    }

    createCentralNebula() {
        const nebulaGeometry = new THREE.SphereGeometry(120, 32, 32);
        const nebulaMaterial = new THREE.MeshBasicMaterial({
            color: 0x4facfe,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending
        });
        this.nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        this.scene.add(this.nebula);

        let scale = 1;
        const animateNebula = () => {
            requestAnimationFrame(animateNebula);
            scale = 0.95 + Math.sin(Date.now() * 0.001) * 0.1;
            this.nebula.scale.set(scale, scale, scale);
        };
        animateNebula();
    }

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - this.windowHalfX) * 0.5;
            this.mouseY = (e.clientY - this.windowHalfY) * 0.5;
        });

        window.addEventListener('resize', () => {
            this.windowHalfX = window.innerWidth / 2;
            this.windowHalfY = window.innerHeight / 2;
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.01;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.01;
        this.camera.lookAt(this.scene.position);
        this.stars.rotation.x += 0.0005;
        this.stars.rotation.y += 0.001;
        this.renderer.render(this.scene, this.camera);
    }
}

// 初始化函数
const initParticleSystem = (container, params = {}) => {
    const particleSystem = new ParticleSystem(container, params);
    particleSystem.init();
    return particleSystem;
};

// 暴露到全局作用域
window.initParticleSystem = initParticleSystem;