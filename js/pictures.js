'use strict';

(function () {
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
  document.querySelector('.big-picture').classList.remove('hidden');
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
})();
