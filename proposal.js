document.querySelectorAll('[data-player]').forEach((row) => {
  const button = row.querySelector('[data-toggle]');
  const audio = row.querySelector('audio');
  const progress = row.querySelector('[data-progress]');
  const time = row.querySelector('[data-time]');

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  button.addEventListener('click', () => {
    document.querySelectorAll('audio[data-theme-player]').forEach((track) => {
      if (track !== audio) track.pause();
    });

    if (audio.paused) {
      audio.play().catch(() => {});
      button.textContent = '❚❚';
    } else {
      audio.pause();
      button.textContent = '▶';
    }
  });

  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    progress.style.width = `${pct}%`;
    time.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
  });

  audio.addEventListener('play', () => {
    button.textContent = '❚❚';
  });

  audio.addEventListener('pause', () => {
    button.textContent = '▶';
  });

  audio.addEventListener('ended', () => {
    progress.style.width = '0%';
    time.textContent = '0:00 / 0:00';
    button.textContent = '▶';
  });
});
