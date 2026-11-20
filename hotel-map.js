function createHotelMap(hotels) {
  const panel = document.querySelector('#hotel-map');
  const chooser = document.querySelector('#map-hotel-select');
  const overview = document.querySelector('#map-overview');
  const status = document.querySelector('#map-status');
  const mapUnavailable = document.querySelector('#map-unavailable');
  const locations = new Map(hotels.map((hotel, index) => [hotel.image, { hotel, number: index + 1 }]));
  const markers = new Map();
  let map;
  let pins;
  let visible = [];
  let previousKeys = '';
  const hotelNames = { one: 'отель', few: 'отеля', many: 'отелей' };
  const plurals = new Intl.PluralRules('ru-RU');
  const directions = hotel => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel.coordinates.join(','));

  function popupFor(hotel) {
    const content = document.createElement('div');
    content.className = 'map-popup';
    const name = document.createElement('strong');
    name.textContent = hotel.name;
    const area = document.createElement('span');
    area.textContent = hotel.area;
    const links = document.createElement('div');
    const card = document.createElement('a');
    card.href = '#hotel-' + hotel.image;
    card.textContent = 'К карточке отеля';
    const external = document.createElement('a');
    external.href = directions(hotel);
    external.target = '_blank';
    external.rel = 'noopener noreferrer';
    external.textContent = 'Google Maps';
    links.append(card, external);
    content.append(name, area, links);
    return content;
  }

  if (window.L?.map && window.L?.markerClusterGroup) {
    map = L.map(panel, { scrollWheelZoom: false, minZoom: 9, maxZoom: 19 });
    map.setView([25.205, 55.287], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19
    }).addTo(map);

    pins = L.markerClusterGroup({
      maxClusterRadius: 25,
      spiderfyDistanceMultiplier: 1.25,
      showCoverageOnHover: false,
      iconCreateFunction(cluster) {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: '<span>' + count + '</span><span class="sr-only"> отелей рядом</span>',
          className: 'hotel-map-cluster',
          iconSize: [29, 29]
        });
      }
    }).addTo(map);

    for (const [key, { hotel, number }] of locations) {
      const marker = L.marker(hotel.coordinates, {
        title: hotel.name,
        alt: hotel.name,
        icon: L.divIcon({
          className: 'hotel-map-pin',
          iconSize: [23, 23],
          html: '<span aria-hidden="true">' + number + '</span>'
        })
      }).bindPopup(popupFor(hotel), { maxWidth: 240 });
      markers.set(key, marker);
      marker.on('popupopen', () => { chooser.value = key; });
    }
  } else {
    panel.hidden = true;
    overview.hidden = true;
    mapUnavailable.hidden = false;
  }

  function fit() {
    if (!map || !visible.length) return;
    map.closePopup();
    map.fitBounds(visible.map(key => markers.get(key).getLatLng()), {
      padding: [30, 24], maxZoom: 14, animate: false
    });
  }

  chooser.addEventListener('change', () => {
    const key = chooser.value;
    if (!key) {
      fit();
      return;
    }
    if (!map) {
      window.location.hash = 'hotel-' + key;
      return;
    }
    const marker = markers.get(key);
    pins.zoomToShowLayer(marker, () => {
      if (visible.includes(key) && chooser.value === key) marker.openPopup();
    });
  });

  overview.addEventListener('click', () => {
    chooser.value = '';
    fit();
  });

  return {
    update(filtered) {
      const keys = filtered.map(hotel => hotel.image).sort();
      const signature = JSON.stringify(keys);
      if (signature === previousKeys) return;
      previousKeys = signature;
      visible = keys;
      const placeholder = new Option('Выбрать отель', '');
      chooser.replaceChildren(placeholder, ...hotels.filter(hotel => keys.includes(hotel.image)).map(hotel =>
        new Option(locations.get(hotel.image).number + ' · ' + hotel.name, hotel.image)
      ));
      chooser.disabled = keys.length === 0;
      overview.disabled = keys.length === 0;
      status.textContent = keys.length + ' ' + hotelNames[plurals.select(keys.length)];
      if (!map) return;
      map.closePopup();
      pins.clearLayers();
      pins.addLayers(keys.map(key => markers.get(key)));
      fit();
    }
  };
}
