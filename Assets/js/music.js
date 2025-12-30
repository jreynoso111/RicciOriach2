(() => {
    function mountEmbed(container) {
        const kind = container.getAttribute('data-embed-kind');
        const src = container.getAttribute('data-embed-src');

        if (container.getAttribute('data-embed-mounted') === '1') return;

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.loading = 'lazy';
        iframe.style.width = '100%';
        iframe.style.height = '352px';
        iframe.style.border = 'none';

        if (kind === 'spotify') {
            iframe.title = 'Riccie Oriach en Spotify';
            iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        } else if (kind === 'youtube') {
            iframe.title = 'Riccie Oriach - Video en YouTube';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
        }

        container.innerHTML = '';
        container.appendChild(iframe);
        container.setAttribute('data-embed-mounted', '1');
    }

    document.querySelectorAll('.embed').forEach(embed => {
        const btn = embed.querySelector('.embed-load');
        if (btn) {
            btn.addEventListener('click', () => mountEmbed(embed));
        }
    });
})();
