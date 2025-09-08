(() => {
  const fileInput = document.getElementById('fileInput');
  const audio = document.getElementById('audio');
  const playlistEl = document.getElementById('playlist');
  const nowPlaying = document.getElementById('nowPlaying');
  const skipInput = document.getElementById('skipInput');

  let tracks = JSON.parse(localStorage.getItem("tracks") || "[]");
  let index = -1;

  function saveTracks() {
    localStorage.setItem("tracks", JSON.stringify(tracks));
  }

  function render() {
    playlistEl.innerHTML = '';
    tracks.forEach((t, i) => {
      const row = document.createElement('div');
      row.className = 'track' + (i === index ? ' active' : '');
      row.innerHTML = `
        <div>${t.name}</div>
        <div>
          ${Math.round((t.size||0)/1024)} KB 
          <button class="del-btn">🗑️</button>
        </div>
      `;

      row.querySelector('.del-btn').onclick = (ev) => {
        ev.stopPropagation();
        tracks.splice(i,1);
        saveTracks();
        if(index === i){ 
          index = -1;
          audio.src = '';
          nowPlaying.textContent = 'Sin pista';
        }
        render();
      };

      row.onclick = () => { load(i); play(); };
      playlistEl.appendChild(row);
    });
  }

  function load(i) {
    index = i;
    const t = tracks[i];
    audio.src = t.url;
    nowPlaying.textContent = `Reproduciendo: ${t.name}`;
    render();
  }

  function play() {
    audio.play().catch(()=>{});
  }

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files||[]);
    const mapped = files.map(f => ({
      name: f.name, 
      size: f.size, 
      url: URL.createObjectURL(f)
    }));
    tracks = tracks.concat(mapped);
    saveTracks();
    if (index === -1 && tracks.length) load(0);
    render();
    e.target.value = '';
  });

  document.addEventListener('dragover', (e)=>{ e.preventDefault(); });
  document.addEventListener('drop', (e)=>{
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files||[]).filter(f => f.type.startsWith('audio/'));
    const mapped = files.map(f => ({
      name: f.name, 
      size: f.size, 
      url: URL.createObjectURL(f)
    }));
    tracks = tracks.concat(mapped);
    saveTracks();
    if (index === -1 && tracks.length) load(0);
    render();
  });

  document.addEventListener('keydown', (e)=>{
    if(e.code === 'Space'){
      e.preventDefault();
      if(audio.paused){ audio.play(); } else { audio.pause(); }
    }
    if(e.code === 'ArrowRight'){  // Adelantar
      e.preventDefault();
      const skip = parseInt(skipInput.value) || 5;
      audio.currentTime = Math.min(audio.currentTime + skip, audio.duration || audio.currentTime);
    }
    if(e.code === 'ArrowLeft'){  // Retroceder
      e.preventDefault();
      const skip = parseInt(skipInput.value) || 5;
      audio.currentTime = Math.max(audio.currentTime - skip, 0);
    }
  });

  if(tracks.length){
    index = 0;
    load(0);
  } else {
    render();
  }
})();