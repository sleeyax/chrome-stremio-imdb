console.log('OIS: Extension loaded');
let stremioButtonAdded = false;

// Function to insert a new button before the IMDb watchlist button
function insertStremioButtonIMDB() {
    if (stremioButtonAdded) return;
    console.log('OIS: Run IMDB function');

    // Select the IMDb watchlist button
    const imdbButton = document.querySelector('[data-testid="tm-box-wl-button"]');
    if (imdbButton) {
        // Create the new Stremio button
        const stremioButton = document.createElement('button');
        stremioButton.innerHTML = '<img title="Open in Stremio" style="width: 50px;height: 50px;" src="https://www.stremio.com/website/stremio-logo-small.png"/>';
        stremioButton.classList.add('ipc-split-button__btn');
        stremioButton.setAttribute('role', 'button');
        stremioButton.setAttribute('style', 'width: 50px;background-color: transparent;');
        stremioButton.setAttribute('tabindex', '0');
        stremioButton.setAttribute('aria-disabled', 'false');
        stremioButton.style.marginRight = '10px';  // Adjust margin as needed

        // Add click event listener to open Stremio link
        stremioButton.addEventListener('click', function() {
            const imdbIdMatch = window.location.pathname.match(/\/title\/(tt\d+)/);
            if (imdbIdMatch) {
                const imdbId = imdbIdMatch[1];
                let stremioLink = `stremio:///detail/movie/${imdbId}`;

                // Check if it's a TV Series
                const ipcInlineListItems = document.querySelectorAll('.ipc-inline-list__item');
                ipcInlineListItems.forEach(item => {
                    if (item.textContent.includes('TV Series')) {
                        stremioLink = `stremio:///detail/series/${imdbId}`;
                    }
                });

                // Open the link using a temporary anchor element
                const tempLink = document.createElement('a');
                tempLink.href = stremioLink;
                tempLink.target = '_self';
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            }
        });

        // Insert the Stremio button before the IMDb button
        imdbButton.parentNode.insertBefore(stremioButton, imdbButton);
        stremioButtonAdded = true;
    }
}

function insertStremioButtonTrakt() {
    if (stremioButtonAdded) return;
    console.log('OIS: Run Trakt function');

    const episodeMatch = window.location.href.match(/\/seasons\/(\d+)\/episodes\/(\d+)/);
    if (episodeMatch) {
        return false;
    }

    // Check if the current URL contains '/shows/' (for TV shows) or '/movies/' (for movies)
    if (window.location.href.includes('/shows/') || window.location.href.includes('/movies/')) {
        console.log('OIS: Detected page');
        // Get the IMDb ID from the external link on Trakt.tv
        const imdbLinkElement = document.getElementById('external-link-imdb');
        if (imdbLinkElement) {
            console.log('OIS: Detected imdb');
            const imdbId = imdbLinkElement.getAttribute('href').split('/').pop(); // Extract IMDb ID from the href attribute

            // Create the new Stremio button
            const stremioButton = document.createElement('button');
            stremioButton.innerHTML = '<img title="Open in Stremio" style="float: left;width: 30px;height: 30px;" src="https://www.stremio.com/website/stremio-logo-small.png"/><span style="font-weight: bold;font-size: 16px;margin-left: 10px;padding: 4px;float: left;color: #5c58ee;">Open in Stremio';
            stremioButton.classList.add('ipc-split-button__btn');
            stremioButton.setAttribute('role', 'button');
            stremioButton.setAttribute('style', 'width: 100%;border-color: #5c58ee;height:54px;margin-right: 10px;text-align: left;margin-bottom: 5px;background-color: white;');
            stremioButton.setAttribute('tabindex', '0');
            stremioButton.setAttribute('aria-disabled', 'false');
            stremioButton.style.marginRight = '10px';  // Adjust margin as needed

            // Add click event listener to open Stremio link
            stremioButton.addEventListener('click', function() {
                let stremioLink = `stremio:///detail/movie/${imdbId}`;

                if (window.location.href.includes('/shows/')) {
                    stremioLink = `stremio:///detail/series/${imdbId}`;
                }

                // Open the link using a temporary anchor element
                const tempLink = document.createElement('a');
                tempLink.href = stremioLink;
                tempLink.target = '_self';
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            });

            // Find the action-buttons element on the page
            const actionButtons = document.querySelector('.action-buttons');
            if (actionButtons) {
                // Insert the Stremio button before the first child of action-buttons
                actionButtons.insertBefore(stremioButton, actionButtons.firstChild);
                stremioButtonAdded = true;
            }
        }
    }
}

function insertStremioButtonLetterboxd() {
    
    if (stremioButtonAdded) return;
    console.log('OIS: Run letterboxd function');
    
    // Check if the current URL contains '/film/' (for movies)
    if (window.location.href.includes('/film/')) {
        // Get the IMDb ID from the external link on Letterboxd
        const imdbLinkElement = document.querySelector('a[data-track-action="IMDb"]');
        if (imdbLinkElement) {
            const imdbHref = imdbLinkElement.getAttribute('href');
            const imdbId = imdbHref.split('/')[imdbHref.split('/').length - 2]; // Extract IMDb ID from the href attribute

            // Create the new Stremio button
            const stremioButton = document.createElement('button');
            stremioButton.innerHTML = '<img title="Open in Stremio" style="float: left;width: 30px;height: 30px;" src="https://www.stremio.com/website/stremio-logo-small.png"/><span style="font-weight: bold;font-size: 16px;margin-left: 10px;padding: 5px;float: left;color: #5c58ee;">Open in Stremio</span>';
            stremioButton.classList.add('ipc-split-button__btn');
            stremioButton.setAttribute('role', 'button');
            stremioButton.setAttribute('style', 'width: 100%;cursor:pointer;border-color: #5c58ee;height:54px;border-radius: 3px;margin-right: 10px;text-align: left;margin-bottom: 5px;background-color: white;');
            stremioButton.setAttribute('tabindex', '0');
            stremioButton.setAttribute('aria-disabled', 'false');
            stremioButton.style.marginRight = '10px';  // Adjust margin as needed

            // Add click event listener to open Stremio link
            stremioButton.addEventListener('click', function() {
                let stremioLink = `stremio:///detail/movie/${imdbId}`;

                // Open the link using a temporary anchor element
                const tempLink = document.createElement('a');
                tempLink.href = stremioLink;
                tempLink.target = '_self';
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
            });

            // Find the 'watch' element on the page
            const watchElement = document.querySelector('.js-actions-panel');
            if (watchElement) {
                // Insert the Stremio button inside the 'watch' element
                watchElement.insertBefore(stremioButton, watchElement.firstChild);
                stremioButtonAdded = true;
            }
        }
    }
}

function runStremioButtons() {
    console.log('OIS: Functions run');
    if (window.location.hostname === 'www.imdb.com') {
        insertStremioButtonIMDB();
    }

    if (window.location.hostname === 'trakt.tv') {
        insertStremioButtonTrakt();
    }

    if (window.location.hostname === 'letterboxd.com') {
        insertStremioButtonLetterboxd();
    }
}

document.addEventListener('DOMContentLoaded', runStremioButtons);

// Try running the functions after the entire page has loaded
window.addEventListener('load', runStremioButtons);

// Set a fallback to run the functions after 3 seconds
setTimeout(runStremioButtons, 1500);