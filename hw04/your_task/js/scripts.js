const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once...
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    fetch(baseURL + `?type=track&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                alert(`No tracks found matching the search term ${term}.`)
                return
            }
            document.getElementById('tracks').innerHTML = ""
            for (i = 0; i < Math.min(5, data.length); i++) {
                if (data[i].preview_url == undefined) {
                    var name = `${data[i].artist.name} (no preview available)` 
                } 
                else {
                    var name = data[i].artist.name
                }
                document.getElementById('tracks').innerHTML += `
                    <section id="${data[i].id}" class="track-item preview" data-preview-track="${data[i].preview_url}" data-id="${data[i].id}">
                        <img src="${data[i].album.image_url}" data-id="${data[i].id}">
                        <i class="fas play-track fa-play" aria-hidden="true" data-id="${data[i].id}"></i>
                        <div class="label" data-id="${data[i].id}">
                            <h3 data-id="${data[i].id}">${data[i].name}</h3>
                            <p data-id="${data[i].id}">
                                ${name}
                            </p>
                        </div>
                    </section>`
            }
        })
        .then(() => {
            trackArray = document.querySelectorAll('.track-item.preview')
            for (i = 0; i < Math.min(5, trackArray.length); i++) {
                trackArray[i].onclick = (ev) => {
                    var currID = ev.target.dataset.id
                    var main = document.getElementById(currID)
                    preview_url = main.dataset.previewTrack
                    document.querySelector('footer div.track-item').dataset.previewTrack = preview_url
                    document.querySelector('footer div.track-item').innerHTML = main.innerHTML
                    audioPlayer.setAudioFile(preview_url)
                    audioPlayer.play()
                }
            }
        })
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    fetch(baseURL + `?type=album&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                alert(`No albums found matching the search term ${term}`)
                return
            }
            document.getElementById('albums').innerHTML = ""
            data.forEach(elem => {
                document.getElementById('albums').innerHTML += `
                    <section class="album-card" id="${elem.id}">
                        <div>
                            <img src="${elem.image_url}">
                            <h3>${elem.name}</h3>
                            <div class="footer">
                                <a href="${elem.spotify_url}" target="_blank">
                                    view on spotify
                                </a>
                            </div>
                        </div>
                    </section>`
            })
        })
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
    fetch(baseURL + `?type=artist&q=${term}`)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                alert(`No artist found matching the search term ${term}.`)
                return
            }
            document.getElementById('artist').innerHTML = `
                <section class="artist-card" id="${data[0].id}">
                    <div>
                        <img src="${data[0].image_url}">
                        <h3>${data[0].name}</h3>
                        <div class="footer">
                            <a href="${data[0].spotify_url}" target="_blank">
                                view on spotify
                            </a>
                        </div>
                    </div>
                </section>`
        })
};


document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};