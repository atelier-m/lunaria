const fadeItems = document.querySelectorAll('.fade-up');

if (fadeItems.length) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  fadeItems.forEach((item) => {
    observer.observe(item);
  });
}

const header = document.querySelector('.site-header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* =========================
   INDEX用モーダル
========================= */

const galleryLinks = document.querySelectorAll(
  '.gallery-card__link, .gallery-mini__link, .popular-modal__link'
);

const galleryModal = document.getElementById('galleryModal');

if (galleryLinks.length && galleryModal) {
  const galleryModalImage = galleryModal.querySelector('.gallery-modal__image');
  const galleryModalClose = galleryModal.querySelector('.gallery-modal__close');

  if (galleryModalImage && galleryModalClose) {
    galleryLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();

        const image = link.querySelector('img');
        const href = link.getAttribute('href');

        if (!href || !image) return;

        galleryModalImage.src = href;
        galleryModalImage.alt = image.alt || '';
        galleryModal.classList.add('is-open');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeGalleryModal = () => {
      galleryModal.classList.remove('is-open');
      galleryModal.setAttribute('aria-hidden', 'true');
      galleryModalImage.src = '';
      galleryModalImage.alt = '';
      document.body.style.overflow = '';
    };

    galleryModalClose.addEventListener('click', closeGalleryModal);

    galleryModal.addEventListener('click', (event) => {
      if (event.target === galleryModal) {
        closeGalleryModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) {
        closeGalleryModal();
      }
    });
  }
}

/* =========================
   gallery.html専用モーダル（← →）
========================= */

const galleryPageLinks = document.querySelectorAll('.gallery-page__link');

if (galleryPageLinks.length && galleryModal) {
  const galleryModalImage = galleryModal.querySelector('.gallery-modal__image');
  const galleryModalClose = galleryModal.querySelector('.gallery-modal__close');
  const galleryModalPrev = galleryModal.querySelector('.gallery-modal__prev');
  const galleryModalNext = galleryModal.querySelector('.gallery-modal__next');

  if (galleryModalImage && galleryModalClose && galleryModalPrev && galleryModalNext) {
    const galleryPageImages = Array.from(galleryPageLinks).map((link) => {
      const image = link.querySelector('img');

      return {
        src: link.getAttribute('href'),
        alt: image ? image.alt : ''
      };
    });

    let currentGalleryPageIndex = 0;

    const openGalleryPageModal = (index) => {
      currentGalleryPageIndex = index;
      galleryModalImage.src = galleryPageImages[index].src;
      galleryModalImage.alt = galleryPageImages[index].alt;
      galleryModal.classList.add('is-open');
      galleryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeGalleryPageModal = () => {
      galleryModal.classList.remove('is-open');
      galleryModal.setAttribute('aria-hidden', 'true');
      galleryModalImage.src = '';
      galleryModalImage.alt = '';
      document.body.style.overflow = '';
    };

    const showPrevImage = () => {
      currentGalleryPageIndex =
        (currentGalleryPageIndex - 1 + galleryPageImages.length) % galleryPageImages.length;
      openGalleryPageModal(currentGalleryPageIndex);
    };

    const showNextImage = () => {
      currentGalleryPageIndex =
        (currentGalleryPageIndex + 1) % galleryPageImages.length;
      openGalleryPageModal(currentGalleryPageIndex);
    };

    galleryPageLinks.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        openGalleryPageModal(index);
      });
    });

    galleryModalClose.addEventListener('click', closeGalleryPageModal);

    galleryModal.addEventListener('click', (event) => {
      if (event.target === galleryModal) {
        closeGalleryPageModal();
      }
    });

    galleryModalPrev.addEventListener('click', (event) => {
      event.stopPropagation();
      showPrevImage();
    });

    galleryModalNext.addEventListener('click', (event) => {
      event.stopPropagation();
      showNextImage();
    });

    document.addEventListener('keydown', (event) => {
      if (!galleryModal.classList.contains('is-open')) return;
      if (!galleryPageLinks.length) return;

      if (event.key === 'Escape') {
        closeGalleryPageModal();
      }

      if (event.key === 'ArrowLeft') {
        showPrevImage();
      }

      if (event.key === 'ArrowRight') {
        showNextImage();
      }
    });
  }
}

/* =========================
   MENUBUTTON
========================= */

const headerMenuButton = document.querySelector('.header__menu');
const headerDrawer = document.querySelector('.header-drawer');

if (headerMenuButton && headerDrawer) {
  const closeHeaderDrawer = () => {
    headerMenuButton.classList.remove('is-open');
    headerDrawer.classList.remove('is-open');
    headerMenuButton.setAttribute('aria-expanded', 'false');
    headerDrawer.setAttribute('aria-hidden', 'true');
  };

  const openHeaderDrawer = () => {
    headerMenuButton.classList.add('is-open');
    headerDrawer.classList.add('is-open');
    headerMenuButton.setAttribute('aria-expanded', 'true');
    headerDrawer.setAttribute('aria-hidden', 'false');
  };

  headerMenuButton.addEventListener('click', () => {
    const isOpen = headerMenuButton.classList.contains('is-open');

    if (isOpen) {
      closeHeaderDrawer();
    } else {
      openHeaderDrawer();
    }
  });

  headerDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeHeaderDrawer();
    });
  });

  document.addEventListener('click', (event) => {
    const clickedInsideMenu = headerDrawer.contains(event.target);
    const clickedButton = headerMenuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      closeHeaderDrawer();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeHeaderDrawer();
    }
  });
}