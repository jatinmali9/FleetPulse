async function loadFarmers() {
  try {
    const res = await fetch('/api/farmer/all');
    if (!res.ok) throw new Error(`Failed to load farmers: ${res.status}`);
    const data = await res.json();
    const table = document.getElementById('farmerTable');
    if(table) table.innerHTML = '';
    let total = data.length;
    let perishable = 0;
    let nonPerishable = 0;
    data.forEach(f => {
      if (f.category === 'Perishable') perishable++; else nonPerishable++;
      const row = `\n        <tr class="border-b">\n          <td class="p-3">${f.name}</td>\n          <td class="p-3">${f.contact}</td>\n          <td class="p-3">${f.location}</td>\n          <td class="p-3">${f.product}</td>\n          <td class="p-3">${f.category}</td>\n        </tr>\n      `;
      if(table) table.innerHTML += row;
    });
    if(document.getElementById('totalFarmers')) document.getElementById('totalFarmers').innerText = total;
    if(document.getElementById('perishable')) document.getElementById('perishable').innerText = perishable;
    if(document.getElementById('nonPerishable')) document.getElementById('nonPerishable').innerText = nonPerishable;
  } catch (err) {
    console.error('Error:', err);
  }
}

window.onload = loadFarmers;
