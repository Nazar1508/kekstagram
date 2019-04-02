'use strict';
(function () {
  var PHOTOS_AMOUND = 25;
  var photoContainer = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content.querySelector('.picture__link');

  // Массив, в який будуть передані дані для фотографій
  var photoDataArray = [];

  var photoData = function (photoAmound) {
    for (var i = 1; i <= photoAmound; i++) {
      var photoDataObject = {
        url: 'photos/' + i + '.jpg',
        likes: window.data.randomRangeInteger(15, 200),
        comments: window.data.COMMENTS_LIST[window.data.randomRangeInteger(0, window.data.COMMENTS_LIST.length - 1)],
        description: window.data.DESCRIPTION_LIST[window.data.randomRangeInteger(0, window.data.DESCRIPTION_LIST.length - 1)]
      };

      photoDataArray.push(photoDataObject);
    }

    return photoDataArray;
  };
  photoData(PHOTOS_AMOUND);

  var renderPhoto = function (number) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photoDataArray[number].url;
    photoElement.querySelector('.picture__stat--likes').textContent = window.data.randomRangeInteger(15, 200);
    photoElement.querySelector('.picture__stat--comments').textContent = window.data.randomRangeInteger(1, 2);

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

  window.picture = {
    photoDataArray: photoDataArray
  };
}());
