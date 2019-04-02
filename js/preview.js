'use strict';
(function () {
  // Блок з великим фото
  document.querySelector('.big-picture__img img').src = 'img/logo-background-3.jpg';
  document.querySelector('.social__header img').src = 'img/avatar-1.svg';
  document.querySelector('.social__caption').textContent =
  window.picture.photoDataArray[window.data.randomRangeInteger(0, window.picture.photoDataArray.length - 1)].description;
  document.querySelector('.likes-count').textContent = '356';

  // Стврюємо новий коментар
  var createComments = function () {
    var newComent = document.createElement('li');
    newComent.className = 'social__comment';

    var socialPicture = document.createElement('img');
    socialPicture.className = 'social__picture';
    socialPicture.src = 'img/avatar-' + window.data.randomRangeInteger(1, 6) + '.svg';
    socialPicture.width = '35';
    socialPicture.height = '35';
    socialPicture.alt = 'Аватар комментатора фотографии';

    var socialText = document.createElement('p');
    socialText.className = 'social__text';
    socialText.textContent =
      window.picture.photoDataArray[window.data.randomRangeInteger(0, window.picture.photoDataArray.length - 1)].comments;

    newComent.appendChild(socialPicture);
    newComent.appendChild(socialText);

    return newComent;
  };

  var socialComments = document.querySelector('.social__comments');

  var renderMoreComments = function () {
    var comentFragment = document.createDocumentFragment();
    for (var i = 1; i <= window.data.randomRangeInteger(1, 2); i++) {
      comentFragment.appendChild(createComments());
    }

    return comentFragment;
  };
  socialComments.appendChild(renderMoreComments());

  // Показуємо повноекранне зображення при натисненні на одну із картинок
  var pictureLinks = document.querySelectorAll('.picture__link');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = document.querySelector('.big-picture__cancel');

  var onBigPictureClick = function () {
    for (var i = 0; i < pictureLinks.length; i++) {
      (function () {
        var pictureLink = pictureLinks[i];
        pictureLink.addEventListener('click', function () {
          openBigPicture();
        });
      })();
    }
  };
  onBigPictureClick();

  var onBigPictureESCPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  var onBigPictureOverlayClick = function (evt) {
    var target = evt.target;

    if (target.classList.contains('big-picture')) {
      closeBigPicture();
    }
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bigPicture.addEventListener('click', onBigPictureOverlayClick);
    document.addEventListener('keydown', onBigPictureESCPress);
    bigPictureClose.addEventListener('click', closeBigPicture);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPicture.removeEventListener('click', onBigPictureOverlayClick);
    document.removeEventListener('keydown', onBigPictureESCPress);
    bigPictureClose.removeEventListener('click', closeBigPicture);
  };
}());
