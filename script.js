document.addEventListener('DOMContentLoaded', () => {
    const plantNameInput = document.getElementById('plant-name-input');
    const modelContainer = document.getElementById('model-container');
    const plantInfoDiv = document.getElementById('plant-info');
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, modelContainer.offsetWidth / modelContainer.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
    renderer.setClearColor('#FFF8E1');
    modelContainer.innerHTML = '';
    modelContainer.appendChild(renderer.domElement);
  
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  
    camera.position.z = 3;
  
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
  
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  
    fetch('plants.json')
      .then(response => response.json())
      .then(plants => {
        setupPlantSelection(plants);
      });
  
    function setupPlantSelection(plants) {
      plantNameInput.addEventListener('change', () => {
        const selectedPlantName = plantNameInput.value.trim();
        const selectedPlant = plants.find(plant => plant.common_name.toLowerCase() === selectedPlantName.toLowerCase());
  
        if (selectedPlant) {
          load3DModel(selectedPlant.model_path);
          displayPlantInfo(selectedPlant);
        } else {
          modelContainer.innerHTML = '<p>3D model not available for this plant.</p>';
          plantInfoDiv.textContent = 'Plant not found.';
        }
      });
    }
  
    const modelLoader = new THREE.GLTFLoader();
  
    function load3DModel(modelPath) {
      console.log('Loading model:', modelPath); // Added console log
      modelLoader.load(
        modelPath,
        function (gltf) {
          console.log('Model loaded successfully:', gltf); // Added console log
          scene.remove(scene.getObjectByName('plant-model'));
          const model = gltf.scene;
          model.name = 'plant-model';
          scene.add(model);
  
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);
          // Try different scale values
          // model.scale.set(10, 10, 10);
          // model.scale.set(0.1, 0.1, 0.1);
          // try different positions.
          // model.position.set(0,2,0)
          // try a rotation
          // model.rotation.y = Math.PI / 2;
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
          console.error('An error happened loading the model:', error);
          modelContainer.innerHTML = '<p>Error loading 3D model.</p>';
        }
      );
    }
  
    function displayPlantInfo(plant) {
      let infoHtml = `<h2>${plant.common_name}</h2>`;
      infoHtml += `<p>Scientific Name: ${plant.scientific_name}</p>`;
      infoHtml += `<p>Medicinal Uses: ${plant.medicinal_uses}</p>`;
      infoHtml += `<p>Parts Used: ${plant.parts_used}</p>`;
      infoHtml += `<p>Precautions: ${plant.precautions}</p>`;
  
      plantInfoDiv.innerHTML = infoHtml;
    }
  
    window.addEventListener('resize', () => {
      camera.aspect = modelContainer.offsetWidth / modelContainer.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(modelContainer.offsetWidth, modelContainer.offsetHeight);
      renderer.render(scene, camera);
    });
  });