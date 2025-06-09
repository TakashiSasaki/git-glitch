function createGrid(rows, cols) {
    var gridContainer = document.getElementById('grid-container');
    // Set the grid dimensions
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    for (var i = 0; i < rows * cols; i++) {
        var cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.addEventListener('click', function(event) {
            // Handle the click event here
            var x = event.clientX - event.target.offsetLeft; // x position within the element.
            var y = event.clientY - event.target.offsetTop;  // y position within the element.
            console.log('x:', x, 'y:', y);

            // Create a circle at the clicked position
            var circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            event.target.appendChild(circle);
        });
        gridContainer.appendChild(cell);
    }
}

window.onload = function() {
    createGrid(5, 5); // Change these numbers to your desired grid size
};
