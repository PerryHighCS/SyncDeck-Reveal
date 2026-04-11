(function (global) {
  'use strict';

  var MODAL_ID = 'img-modal';
  var MODAL_IMG_ID = 'img-modal-img';
  var MODAL_CLOSE_ID = 'img-modal-close';
  var CONTROLLER_GLOBAL_KEY = '__syncdeckImageLightboxController';

  function closestZoomableImage(target) {
    var node = target;
    while (node && node !== document) {
      if (
        node.tagName &&
        node.tagName.toLowerCase() === 'img' &&
        node.classList &&
        node.classList.contains('img-zoomable')
      ) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  }

  function ensureModal() {
    var modal = document.getElementById(MODAL_ID);
    var image = document.getElementById(MODAL_IMG_ID);
    var closeButton = document.getElementById(MODAL_CLOSE_ID);

    if (!modal) {
      modal = document.createElement('div');
      modal.id = MODAL_ID;
      modal.className = 'syncdeck-image-lightbox';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Image preview');
      document.body.appendChild(modal);
    } else {
      modal.classList.add('syncdeck-image-lightbox');
      if (!modal.getAttribute('role')) modal.setAttribute('role', 'dialog');
      if (!modal.getAttribute('aria-modal')) modal.setAttribute('aria-modal', 'true');
      if (!modal.getAttribute('aria-label')) modal.setAttribute('aria-label', 'Image preview');
    }

    if (!closeButton) {
      closeButton = document.createElement('button');
      closeButton.id = MODAL_CLOSE_ID;
      closeButton.type = 'button';
      closeButton.className = 'syncdeck-image-lightbox__close';
      closeButton.setAttribute('aria-label', 'Close');
      closeButton.textContent = '\u00d7';
      modal.appendChild(closeButton);
    } else {
      closeButton.classList.add('syncdeck-image-lightbox__close');
      closeButton.type = 'button';
      if (!closeButton.getAttribute('aria-label')) closeButton.setAttribute('aria-label', 'Close');
    }

    if (!image) {
      image = document.createElement('img');
      image.id = MODAL_IMG_ID;
      image.className = 'syncdeck-image-lightbox__image';
      image.alt = '';
      modal.appendChild(image);
    } else {
      image.classList.add('syncdeck-image-lightbox__image');
    }

    return {
      modal: modal,
      image: image,
      closeButton: closeButton,
    };
  }

  function createController() {
    var elements = ensureModal();
    var modal = elements.modal;
    var image = elements.image;
    var closeButton = elements.closeButton;
    var active = true;
    var previouslyFocusedElement = null;

    function focusElement(element) {
      if (!element || typeof element.focus !== 'function') return;
      try {
        element.focus({ preventScroll: true });
      } catch {
        element.focus();
      }
    }

    function open(src, alt) {
      if (!active || !src) return;
      if (!modal.classList.contains('open')) {
        previouslyFocusedElement = document.activeElement;
      }
      image.src = src;
      image.alt = alt || '';
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.addEventListener('keydown', onKeydown);
      focusElement(closeButton);
    }

    function openImage(img) {
      if (!img) return;
      open(img.currentSrc || img.src, img.alt || '');
    }

    function close() {
      if (!active) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', onKeydown);
      if (previouslyFocusedElement && document.contains(previouslyFocusedElement)) {
        focusElement(previouslyFocusedElement);
      }
      previouslyFocusedElement = null;
    }

    function resetModal() {
      close();
      image.removeAttribute('src');
      image.alt = '';
    }

    function onDocumentClick(event) {
      var imageTarget = closestZoomableImage(event.target);
      if (!imageTarget) return;
      openImage(imageTarget);
    }

    function onModalClick(event) {
      if (event.target === modal || event.target === image) close();
    }

    function onKeydown(event) {
      if (event.key === 'Escape') close();
    }

    closeButton.addEventListener('click', close);
    modal.addEventListener('click', onModalClick);
    document.addEventListener('click', onDocumentClick);

    var isInitiallyOpen = modal.classList.contains('open');
    modal.setAttribute('aria-hidden', isInitiallyOpen ? 'false' : 'true');
    if (isInitiallyOpen) {
      document.addEventListener('keydown', onKeydown);
    } else {
      document.removeEventListener('keydown', onKeydown);
    }

    var controller = {
      open: open,
      openImage: openImage,
      close: close,
      destroy: function () {
        resetModal();
        active = false;
        document.removeEventListener('click', onDocumentClick);
        document.removeEventListener('keydown', onKeydown);
        modal.removeEventListener('click', onModalClick);
        closeButton.removeEventListener('click', close);
        if (global[CONTROLLER_GLOBAL_KEY] === controller) {
          global[CONTROLLER_GLOBAL_KEY] = null;
        }
      },
      getElement: function () {
        return modal;
      },
    };

    return controller;
  }

  function initSyncDeckImageLightbox() {
    if (typeof document === 'undefined') return null;
    if (
      global[CONTROLLER_GLOBAL_KEY] &&
      typeof global[CONTROLLER_GLOBAL_KEY].destroy === 'function'
    ) {
      global[CONTROLLER_GLOBAL_KEY].destroy();
    }

    var controller = createController();
    global[CONTROLLER_GLOBAL_KEY] = controller;
    return controller;
  }

  global.initSyncDeckImageLightbox = initSyncDeckImageLightbox;
  global.openImgModal = function (src, alt) {
    var controller = global[CONTROLLER_GLOBAL_KEY] || initSyncDeckImageLightbox();
    if (controller) controller.open(src, alt);
  };
  global.closeImgModal = function () {
    var controller = global[CONTROLLER_GLOBAL_KEY] || initSyncDeckImageLightbox();
    if (controller) controller.close();
  };
}(window));
