'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var PHOTOS_AMOUND = 25;

  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTION_LIST = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var randomRangeInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var photoContainer = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content.querySelector('.picture__link');

  // Массив, в який будуть передані дані для фотографій
  var photoDataArray = [];

  var photoData = function (photoAmound) {
    for (var i = 1; i <= photoAmound; i++) {
      var photoDataObject = {
        url: 'photos/' + i + '.jpg',
        likes: randomRangeInteger(15, 200),
        comments: COMMENTS_LIST[randomRangeInteger(0, COMMENTS_LIST.length - 1)],
        description: DESCRIPTION_LIST[randomRangeInteger(0, DESCRIPTION_LIST.length - 1)]
      };

      photoDataArray.push(photoDataObject);
    }

    return photoDataArray;
  };
  photoData(PHOTOS_AMOUND);

  var renderPhoto = function (number) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoDataArray[number].url;
    photoElement.querySelector('.picture__stat--likes').textContent = randomRangeInteger(15, 200);
    photoElement.querySelector('.picture__stat--comments').textContent = randomRangeInteger(1, 2);

    return photoElement;
  };

  var renderMorePhotos = function () {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < photoDataArray.length; i++) {
      photoFragment.appendChild(renderPhoto(i));
    }
    return photoFragment;
  };
  photoContainer.appendChild(renderMorePhotos());


  // Блок з великим фото
  document.querySelector('.big-picture__img img').src = 'img/logo-background-3.jpg';
  document.querySelector('.social__header img').src = 'img/avatar-1.svg';
  document.querySelector('.social__caption').textContent =
    photoDataArray[randomRangeInteger(0, photoDataArray.length - 1)].description;
  document.querySelector('.likes-count').textContent = '356';

  // Стврюємо новий коментар
  var createComments = function () {
    var newComent = document.createElement('li');
    newComent.className = 'social__comment';

    var socialPicture = document.createElement('img');
    socialPicture.className = 'social__picture';
    socialPicture.src = 'img/avatar-' + randomRangeInteger(1, 6) + '.svg';
    socialPicture.width = '35';
    socialPicture.height = '35';
    socialPicture.alt = 'Аватар комментатора фотографии';

    var socialText = document.createElement('p');
    socialText.className = 'social__text';
    socialText.textContent =
      photoDataArray[randomRangeInteger(0, photoDataArray.length - 1)].comments;

    newComent.appendChild(socialPicture);
    newComent.appendChild(socialText);

    return newComent;
  };

  var socialComments = document.querySelector('.social__comments');

  var renderMoreComments = function () {
    var comentFragment = document.createDocumentFragment();
    for (var i = 1; i <= randomRangeInteger(1, 2); i++) {
      comentFragment.appendChild(createComments());
    }

    return comentFragment;
  };
  socialComments.appendChild(renderMoreComments());


  // Загрузка зображення і показ форми редагування
  var uploadFile = document.getElementById('upload-file');
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var cancelButton = document.querySelector('.img-upload__cancel');

  var onImgOverlayEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
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

  var inputHashtags = document.querySelector('.text__hashtags');
  inputHashtags.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgOverlayEscPress);
  });

  inputHashtags.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgOverlayEscPress);
  });


  uploadFile.addEventListener('change', openImgOverlay);
  cancelButton.addEventListener('click', closeImgOverlay);

  // Редагування насиченості зображення
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');

  var onEffectsItemClick = function (evt) {
    var target = evt.target;

    if (target.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--chrome');
    } else if (target.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--sepia');
    } else if (target.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--marvin');
    } else if (target.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--phobos');
    } else if (target.classList.contains('effects__preview--heat')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--heat');
    } else if (target.classList.contains('effects__preview--none')) {
      imgUploadPreview.className = 'img-upload__preview';
      imgUploadPreview.classList.add('effects__preview--none');
    }
  };

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
    if (evt.keyCode === ESC_KEYCODE) {

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


  // Валідація форми(Неповна)

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
