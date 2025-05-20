document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const photoGallery = document.getElementById('photoGallery');
    
    // Cargar fotos al iniciar
    loadPhotos();
    
    // Escuchar cambios en el input de archivo
    fileInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            
            // Verificar que sea una imagen
            if (!file.type.match('image.*')) {
                alert('Por favor, selecciona un archivo de imagen (JPEG, PNG, etc.)');
                return;
            }
            
            // Leer la imagen como URL
            const reader = new FileReader();
            reader.onload = function(event) {
                savePhotoToLocalStorage(event.target.result, file.name);
                loadPhotos();
            };
            reader.readAsDataURL(file);
            
            // Resetear el input para permitir subir la misma imagen otra vez
            fileInput.value = '';
        }
    });
    
    // Función para guardar la foto en localStorage
    function savePhotoToLocalStorage(imageData, filename) {
        let photos = JSON.parse(localStorage.getItem('galleryPhotos')) || [];
        
        // Crear un objeto para la nueva foto
        const newPhoto = {
            id: Date.now(), // Usamos la marca de tiempo como ID único
            src: imageData,
            filename: filename,
            date: new Date().toLocaleDateString()
        };
        
        photos.push(newPhoto);
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
    }
    
    // Función para cargar las fotos desde localStorage
    function loadPhotos() {
        const photos = JSON.parse(localStorage.getItem('galleryPhotos')) || [];
        photoGallery.innerHTML = '';
        
        if (photos.length === 0) {
            photoGallery.innerHTML = '<div class="no-photos">No hay fotos en la galería. Sube la primera!</div>';
            return;
        }
        
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.dataset.id = photo.id;
            
            photoCard.innerHTML = `
                <img src="${photo.src}" alt="${photo.filename}" class="photo-img">
                <div class="photo-info">
                    <h3 class="photo-title">${photo.filename}</h3>
                    <p>Subido: ${photo.date}</p>
                    <button class="delete-btn" onclick="deletePhoto(${photo.id})">Eliminar</button>
                </div>
            `;
            
            photoGallery.appendChild(photoCard);
        });
    }
});

// Función para eliminar una foto (definida en el ámbito global)
window.deletePhoto = function(id) {
    let photos = JSON.parse(localStorage.getItem('galleryPhotos')) || [];
    photos = photos.filter(photo => photo.id !== id);
    localStorage.setItem('galleryPhotos', JSON.stringify(photos));
    
    // Recargar la galería
    document.getElementById('photoGallery').innerHTML = '';
    const loadPhotos = () => {
        const photos = JSON.parse(localStorage.getItem('galleryPhotos')) || [];
        const photoGallery = document.getElementById('photoGallery');
        
        if (photos.length === 0) {
            photoGallery.innerHTML = '<div class="no-photos">No hay fotos en la galería. Sube la primera!</div>';
            return;
        }
        
        photos.forEach(photo => {
            const photoCard = document.createElement('div');
            photoCard.className = 'photo-card';
            photoCard.dataset.id = photo.id;
            
            photoCard.innerHTML = `
                <img src="${photo.src}" alt="${photo.filename}" class="photo-img">
                <div class="photo-info">
                    <h3 class="photo-title">${photo.filename}</h3>
                    <p>Subido: ${photo.date}</p>
                    <button class="delete-btn" onclick="deletePhoto(${photo.id})">Eliminar</button>
                </div>
            `;
            
            photoGallery.appendChild(photoCard);
        });
    };
    
    loadPhotos();
};

