/**
 * Created by Randy, Derek on 04/10/17.
 */

function capturePhoto(sCallback, fCallback) {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true
    };
    navigator.camera.getPicture(options, sCallback, fCallback);
}

function savePhoto() {
    capturePhoto(
        function (imageURI) {
            //Add Saved to database
        }, function (ex) {
            alert("Failed: " + ex);
        });
}