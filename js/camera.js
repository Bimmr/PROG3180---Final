/**
 * Created by Randy, Derek on 04/10/17.
 */

function capturePhoto(sCallback, fCallback) {
    navigator.camera.getPicture(sCallback, fCallback, {quality: 50});
}

function savePhoto() {
    var imageURI = "img/icon.png";
    $("#hiddenImg").attr("src", imageURI);
    movePic(imageURI);

    // capturePhoto(
    //     function (imageURI) {
    //         $("#hiddenImg").attr("src", imageURI);
    //         movePic(imageURI);
    //     }, function (ex) {
    //         alert("Unable to use camera");
    //     });
}
function movePic(file) {
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry) {
    var d = new Date();
    var n = d.getTime();
    var newFileName = n + ".jpg";
    var myFolderApp = "BookWorms";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {

            //The folder is created if doesn't exist
            fileSys.root.getDirectory(myFolderApp,
                {create: true, exclusive: false},
                function (directory) {
                    entry.moveTo(directory, newFileName, successMove, resOnError);
                },
                resOnError);
        },
        resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    var path = entry.toURL();
    SavedBooks.insert([path],
        function () {
            alert("Picture saved");
        },
        function () {
            console.log("Error while saving picture");
        });
}

function resOnError(error) {
    alert(error.code);
}