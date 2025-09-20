/**
 * Song Details Page JavaScript
 * Handles filtering for Pop, K-Pop, and R&B genres and lyrics toggle functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Filter functionality ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const songCards = document.querySelectorAll('.song-detail-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const genre = btn.getAttribute('data-genre');

            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter songs based on selected genre
            songCards.forEach(card => {
                // The 'show' class is toggled based on whether the genre matches or 'all' is selected.
                card.classList.toggle('show', genre === 'all' || card.getAttribute('data-genre') === genre);
            });
        });
    });

    // --- Lyrics toggle functionality for all song cards ---
    document.querySelectorAll('.toggle-lyrics-btn').forEach(btn => {
        // More robust way to find the lyrics content by traversing up to the parent song card
        // and then querying within that card. This makes it less dependent on direct siblings.
        const songCard = btn.closest('.song-detail-card');
        const lyricsContent = songCard ? songCard.querySelector('.lyrics-content') : null;

        if (lyricsContent) {
            // Initialize as collapsed
            lyricsContent.classList.add('collapsed');
            btn.setAttribute('aria-expanded', 'false'); // ARIA attribute for accessibility

            // Toggle lyrics visibility on click
            btn.addEventListener('click', () => {
                if (lyricsContent.classList.contains('collapsed')) {
                    lyricsContent.classList.remove('collapsed');
                    lyricsContent.classList.add('expanded');
                    btn.textContent = 'Show Less'; // Update button text
                    btn.setAttribute('aria-expanded', 'true');
                } else {
                    lyricsContent.classList.remove('expanded');
                    lyricsContent.classList.add('collapsed');
                    btn.textContent = 'Show More'; // Update button text
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});