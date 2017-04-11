/**
 * Created by Bimmr on 04/10/17.
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


    // capturePhoto(
    //     function (imageURI) {
    //         //Success
    //         var image = $("#imgSnap");
    //         image.prop("src", imageURI);
    //     },
    //     function (ex) {
    //         //Fail
    //         alert("Failed: " + ex);
    //     });
