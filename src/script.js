// Animate sections on scroll
const sections = document.querySelectorAll('.section');

function checkVisibleSections() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const boxTop = section.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

   document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      // Close all other cards first
      document.querySelectorAll('.project-card').forEach(c => {
        if (c !== card) c.classList.remove('open');
      });
      // Toggle the clicked one
      card.classList.toggle('open');
    });

    // Close card if mouse leaves the card area
    card.addEventListener('mouseleave', () => {
      card.classList.remove('open');
    });

    // Optional: auto-close when scrolled out of view
    window.addEventListener('scroll', () => {
      const rect = card.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        card.classList.remove('open');
      }
    });
  });


window.addEventListener('scroll', checkVisibleSections);
window.addEventListener('load', checkVisibleSections);
