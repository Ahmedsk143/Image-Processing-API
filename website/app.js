fetch('/api/names/full')
    .then((response) => response.json())
    .then((data) => updateList(data, 'full'));

fetch('/api/names/thumb')
    .then((response) => response.json())
    .then((data) => updateList(data, 'thumb'));

const fullList = document.getElementById('full');
const thumbList = document.getElementById('thumb');

function updateList(names, type) {
    const arr = JSON.parse(names);
    if (type === 'full') {
        arr.forEach((element) => {
            const li = document.createElement('li');
            li.textContent = element;
            fullList.appendChild(li);
        });
    } else {
        arr.forEach((element) => {
            const li = document.createElement('li');
            li.textContent = element;
            thumbList.appendChild(li);
        });
    }
}
