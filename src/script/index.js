const searchButton = document.querySelector('#search-button');
const searchTermInput = document.querySelector('#search-term');
const resultsDiv = document.querySelector('#results');

searchButton.addEventListener('click', () => {
  const searchTerm = searchTermInput.value;
  const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;

  axios
    .get(url)
    .then((response) => {
      const results = response.data.collection.items;

      resultsDiv.innerHTML = '';

      if (results.length > 0) {
        results.forEach((result) => {
          const title = result.data[0].title;
          const description = result.data[0].description;
          const href = result.links[0].href;
          const highlightedDescription = description.replace(
            new RegExp(searchTerm, 'gi'),
            `<b>${searchTerm}</b>`
          );

          const img = document.createElement('img');
          img.className = 'img-thumbnail';
          img.setAttribute('src', href);
          img.style.display = 'none';
          img.style.margin = '1vh 0 0 0px';

          const h2 = document.createElement('h2');
          h2.className = 'h4';
          h2.textContent = title;

          const p = document.createElement('p');
          p.innerHTML = highlightedDescription;

          const button = document.createElement('button');
          button.className = 'btn btn-secondary';
          button.textContent = 'Ver imagem';

          button.addEventListener('click', () => {
            if (img.style.display === 'none') {
              img.style.display = 'block';
              button.textContent = 'Fechar Imagem';
            } else {
              img.style.display = 'none';
              button.textContent = 'Ver Imagem';
            }
          });

          const div = document.createElement('div');
          div.className = 'mb-4';
          div.appendChild(h2);
          div.appendChild(p);
          div.appendChild(button);
          div.appendChild(img);

          resultsDiv.appendChild(div);
        });
      } else {
        resultsDiv.innerHTML =
          '<p class="text-muted">Nenhum resultado encontrado.</p>';
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

var btn = document.querySelector('#back-to-top');
btn.addEventListener('click', function () {
  window.scrollTo(0, 0);
});
