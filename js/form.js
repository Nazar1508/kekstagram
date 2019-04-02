'use strict';

(function () {
  // Загрузка зображення і показ форми редагування
  var uploadFile = document.getElementById('upload-file');
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var cancelButton = document.querySelector('.img-upload__cancel');
  var imgUploaudScale = document.querySelector('.img-upload__scale');

  var onImgOverlayEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeImgOverlay();
    }
  };

  var onImgOverlayClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('img-upload__overlay')) {
      closeImgOverlay();
    }
  };

  var openImgOverlay = function () {
    imgOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onImgOverlayEscPress);
    imgOverlay.addEventListener('click', onImgOverlayClick);
    effectsList.addEventListener('click', onEffectsItemClick);
  };

  var closeImgOverlay = function () {
    imgOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onImgOverlayEscPress);
    uploadFile.value = '';
    imgUploadPreview.className = 'img-upload__preview';
    imgOverlay.removeEventListener('click', onImgOverlayClick);
    effectsList.removeEventListener('click', onEffectsItemClick);
  };

  uploadFile.addEventListener('change', openImgOverlay);
  cancelButton.addEventListener('click', closeImgOverlay);

  // Редагування насиченості зображення
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');

  var onEffectsItemClick = function (evt) {
    var target = evt.target;

    // Показуємо та ховаємо слайдер інтенсивності ефекту фільтру
    if (target.classList.contains('effects__preview')) {
      imgUploaudScale.classList.remove('hidden');
    }

    if (target.classList.contains('effects__preview--none')) {
      imgUploaudScale.classList.add('hidden');
    }

    if (target.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('img-upload__preview--chrome');
      document.querySelector('.img-upload__preview--chrome').style.filter = 'grayscale' + '(' + 1 + ')';
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;

    } else if (target.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('img-upload__preview--sepia');
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;
      document.querySelector('.img-upload__preview--sepia').style.filter = 'sepia' + '(' + 1 + ')';

    } else if (target.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('img-upload__preview--marvin');
      document.querySelector('.img-upload__preview--marvin').style.filter = 'invert' + '(' + 100 + '%' + ')';
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;

    } else if (target.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('img-upload__preview--phobos');
      document.querySelector('.img-upload__preview--phobos').style.filter = 'blur' + '(' + 3 + 'px' + ')';
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;

    } else if (target.classList.contains('effects__preview--heat')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('img-upload__preview--heat');
      document.querySelector('.img-upload__preview--heat').style.filter = 'brightness' + '(' + 3 + ')';
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;

    } else if (target.classList.contains('effects__preview--none')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.style.filter = 'none';
      scalePin.style.left = '100%';
      scaleLevel.style.width = scalePin.style.left;
    }

  };

  // Переміщення повзунка
  var MIN_LEFT = 0;

  var scaleLIne = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');

  var effectLevel = function (max) {
    var level = parseInt(scalePin.style.left, 10) * max / scaleLIne.offsetWidth;
    return level;
  };

  scaleLIne.addEventListener('mouseup', function (evt) {
    var target = evt.target;

    if (!target.classList.contains('scale__pin')) {
      scalePin.style.left = evt.offsetX + 'px';
      scaleLevel.style.width = evt.offsetX + 'px';

      if (imgUploadPreview.classList.contains('img-upload__preview--chrome')) {
        imgUploadPreview.style.filter = 'grayscale' + '(' + effectLevel(1) + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--sepia')) {
        imgUploadPreview.style.filter = 'sepia' + '(' + effectLevel(1) + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--marvin')) {
        imgUploadPreview.style.filter = 'invert' + '(' + effectLevel(100) + '%' + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--phobos')) {
        imgUploadPreview.style.filter = 'blur' + '(' + effectLevel(3) + 'px' + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--heat')) {
        imgUploadPreview.style.filter = 'brightness' + '(' + effectLevel(3) + ')';
      }
    }
  });

  scalePin.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      var shift = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      scalePin.style.left = (scalePin.offsetLeft - shift) + 'px';

      if (scalePin.offsetLeft - shift < MIN_LEFT) {
        scalePin.style.left = 0 + 'px';
      } else if (scalePin.offsetLeft - shift > scaleLIne.offsetWidth) {
        scalePin.style.left = scaleLIne.offsetWidth + 'px';
      }

      scaleLevel.style.width = scalePin.style.left;


      if (imgUploadPreview.classList.contains('img-upload__preview--chrome')) {
        imgUploadPreview.style.filter = 'grayscale' + '(' + effectLevel(1) + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--sepia')) {
        imgUploadPreview.style.filter = 'sepia' + '(' + effectLevel(1) + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--marvin')) {
        imgUploadPreview.style.filter = 'invert' + '(' + effectLevel(100) + '%' + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--phobos')) {
        imgUploadPreview.style.filter = 'blur' + '(' + effectLevel(3) + 'px' + ')';
      } else if (imgUploadPreview.classList.contains('img-upload__preview--heat')) {
        imgUploadPreview.style.filter = 'brightness' + '(' + effectLevel(3) + ')';
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Валідація форми
  var hashtags = document.querySelector('.text__hashtags');

  hashtags.addEventListener('input', function (evt) {
    var hashtagsList = hashtags.value.toLowerCase().split(' ');

    for (var i = 0; i < hashtagsList.length; i++) {
      var target = evt.target;
      var hashtagsItem = hashtagsList[i];

      if (hashtagsItem[0] !== '#') {
        target.setCustomValidity('хэш-тег начинается с символа # (решётка)');
        return;
      } else if (hashtagsItem.length === 1) {
        target.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtagsItem.length > 20) {
        target.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (hashtagsList.length > 5) {
        target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
      } else if (hashtagsList.indexOf(hashtagsItem) !== hashtagsList.lastIndexOf(hashtagsItem)) {
        target.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else {
        target.setCustomValidity('');
      }
    }
  });
})();
