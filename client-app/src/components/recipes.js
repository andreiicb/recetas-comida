// recipes.js

// Mostrar pestañas
export  function showTab(tabNumber) {
    var tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });
    document.getElementById('tab-' + tabNumber).style.display = 'flex';

    var buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(function(button) {
        button.classList.remove('active'); // Remover clase 'active' de todos los botones
    });
    var activeButton = document.querySelector('.tab-button[data-tab="' + tabNumber + '"]');
    activeButton.classList.add('active'); // Añadir clase 'active' al botón activo
}

export function toggleTips() {
    var tipsContainer = document.querySelector('.tips');
    tipsContainer.classList.toggle('active');

    if (!document.querySelector('.tips__content')) {
        var tipsContent = document.createElement('div');
        tipsContent.className = 'tips__content active';
        tipsContent.innerHTML = `
            <h3>Tip 1: Sustituye ingredientes</h3>
            <p>Cuando te falte un ingrediente, busca alternativas en tu despensa.</p>
            <h3>Tip 2: Conserva mejor los alimentos</h3>
            <p>Usa frascos herméticos para mantener frescos tus ingredientes más tiempo.</p>
            <h3>Tip 3: Ahorra tiempo en la cocina</h3>
            <p>Prepara todos los ingredientes antes de comenzar a cocinar.</p>
            <button class="tips__button-back" onclick="toggleBack()">Regresar</button>
        `;
        tipsContainer.appendChild(tipsContent);
    } else {
        document.querySelector('.tips__content').classList.toggle('active');
    }
}

export function toggleBack() {
    var tipsContainer = document.querySelector('.tips');
    tipsContainer.classList.remove('active');
    var tipsContent = document.querySelector('.tips__content');
    if (tipsContent) {
        tipsContent.classList.remove('active');
    }
}

// Redirigir a recetas
export function goToRecipes(country) {
    // Aquí puedes redirigir a la página de recetas del país
    window.location.href = '/recetas/' + country;
}

// Ver detalles de la receta
export function viewRecipe(recipeId) {
    // Aquí puedes redirigir a la página de detalles de la receta
    window.location.href = '/receta/' + recipeId;
}
