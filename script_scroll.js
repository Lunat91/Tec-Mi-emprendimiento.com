function scrollHorizontally(event, carouselContainer) {
    event.preventDefault();
    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    carouselContainer.scrollLeft -= (delta * 40); // Ajusta la velocidad de desplazamiento aquí
}