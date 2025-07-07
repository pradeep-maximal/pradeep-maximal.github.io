window.addEventListener('DOMContentLoaded', function () {
    const isMobileOrTablet = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const spline = document.querySelector('.spline-3d');
    const fallbackImage = document.querySelector('.hero-image');

    if (isMobileOrTablet) {
      if (spline) spline.style.display = 'none';
      if (fallbackImage) fallbackImage.style.display = 'block';
    } else {
      if (spline) spline.style.display = 'block';
      if (fallbackImage) fallbackImage.style.display = 'none';
    }
  });