document.addEventListener('DOMContentLoaded', function() {
    const imageContainer = document.getElementById('image-container');
    const image = document.getElementById('image');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const inputField = document.getElementById('inputField');
    let rectangles = [];

    if (!imageContainer || !image || !canvas) {
        console.error('Element not found');
        return;
    }

    function resizeCanvas() {
        const containerRect = imageContainer.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();

        canvas.width = containerRect.width;
        canvas.height = containerRect.height;
        console.log(`Canvas size: ${canvas.width}x${canvas.height}`); // Debug: Log canvas size

        const scaleX = imageRect.width / image.naturalWidth;
        const scaleY = imageRect.height / image.naturalHeight;
        
        drawRectangles(scaleX, scaleY);
    }

    function drawRectangles(scaleX, scaleY) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings
        context.strokeStyle = 'red';
        context.lineWidth = 1;
        // context.

        rectangles = rectangles.map(rect => {
            const scaledRect = {
                x: rect.x * scaleX,
                y: rect.y * scaleY,
                width: rect.w * scaleX,
                height: rect.h * scaleY,
                text: rect.text
            };
            context.fillStyle = 'rgba(255, 255, 113, 0.5)';
            context.fillRect(scaledRect.x-2, scaledRect.y-2, scaledRect.width+2, scaledRect.height+2);
            // context.strokeRect(scaledRect.x, scaledRect.y, scaledRect.width, scaledRect.height);
            console.log(`Drawing rectangle with text ${scaledRect.text} at (${scaledRect.x}, ${scaledRect.y}) with width ${scaledRect.width} and height ${scaledRect.height}`); // Debug: Log rectangle details
            return scaledRect;
        });
    }

    function handleMouseClick(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        rectangles.forEach(rect => {
            if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height) {
                console.log(`Clicked rectangle with text ${rect.text}`);
                inputField.value = rect.text; // Copy text to input field
            }
        });
    }

    function handleMouseMove(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        let cursorStyle = 'default';
        rectangles.forEach(rect => {
            if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height) {
                cursorStyle = 'pointer';
            }
        });

        canvas.style.cursor = cursorStyle;
    }

    function loadRectangles() {
        fetch('/static/rectangles.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                rectangles = data;
                resizeCanvas();
            })
            .catch(error => console.error('Error loading rectangles:', error));
    }

    image.onload = () => {
        console.log('Image loaded');
        loadRectangles();
    };

    image.onerror = () => {
        console.error('Image failed to load');
    };

    canvas.addEventListener('click', handleMouseClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    console.log('Script loaded, waiting for image to load');

    // Resize the canvas whenever the window is resized
    window.addEventListener('resize', resizeCanvas);
});
