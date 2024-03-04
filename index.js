const dropdownBtn = document.getElementById("dropdown-button");
const dropdownContent = document.getElementById("dropdown-content");
const colorOptions = dropdownContent.getElementsByClassName('color-option');
const arrowSpan = document.querySelector('#dropdown-button .arrow');
const seedColorInput = document.getElementById('seed-color');
const getColorScheme = document.getElementById("get-color-scheme"); 

let currentScheme = 'monochrome'; 

dropdownBtn.addEventListener("click", function() {
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
});

window.addEventListener('click', function(event) {
    if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

seedColorInput.addEventListener('input', function() {
    const newColor = this.value;
    seedColorInput.style.backgroundColor = newColor;
});

getColorScheme.addEventListener("click", function() {
    updateColorScheme(currentScheme, seedColorInput.value);
});

function updateColorScheme(schemeMode, seedColor) {
    const count = 5;
    const colorHex = seedColor.substring(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${schemeMode}&count=${count}`)
        .then(response => response.json())
        .then(data => {
            const colors = data.colors.map(color => color.hex.value);
            colors.forEach((color, index) => {
                const colorDiv = document.querySelector(`.color-column:nth-child(${index + 1}) .color-text`);
                if (colorDiv) {
                    colorDiv.parentElement.style.backgroundColor = color;
                    colorDiv.textContent = color; 
                }
            });
        })
        .catch(error => {
            console.error('Error fetching color scheme:', error);
        });
}

Array.from(colorOptions).forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        currentScheme = this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
        dropdownBtn.textContent = this.textContent.trim();
        dropdownBtn.appendChild(arrowSpan); 
        dropdownContent.style.display = "none";
    });
});
