let lots = [];

function addLot() {
    const name = document.getElementById('lot-name').value;
    const price = parseFloat(document.getElementById('lot-price').value);
    const img = document.getElementById('lot-img').value || 'images/placeholder.png';

    if (!name || isNaN(price) || price <= 0) {
        alert('Введите корректные данные');
        return;
    }

    const lot = { id: Date.now(), name, price, img };
    lots.push(lot);

    document.getElementById('lot-name').value = '';
    document.getElementById('lot-price').value = '';
    document.getElementById('lot-img').value = '';

    renderLots();
}

function bid(id) {
    const lot = lots.find(l => l.id === id);
    const newPrice = parseFloat(prompt(`Ставка для ${lot.name}:`, lot.price));
    if (!isNaN(newPrice) && newPrice > lot.price) {
        lot.price = newPrice;
        renderLots();
    } else {
        alert('Ставка должна быть больше текущей');
    }
}

function renderLots() {
    const list = document.getElementById('lot-list');
    list.innerHTML = '';
    lots.forEach(lot => {
        const card = document.createElement('div');
        card.className = 'lot-card';
        card.innerHTML = `
            <img src="${lot.img}" alt="${lot.name}">
            <h3>${lot.name}</h3>
            <p>Текущая цена: $${lot.price.toFixed(2)}</p>
            <button onclick="bid(${lot.id})">Сделать ставку</button>
        `;
        list.appendChild(card);
    });
}
