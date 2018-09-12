/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // camera test
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;

        // camera preview test
        // app.cameraPreviewTest();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    cameraPreviewTest: function() {
        var options = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: CameraPreview.CAMERA_DIRECTION.FRONT,
            toBack: true,
            tapPhoto: true,
            tapFocus: true,
            previewDrag: false
        };

        var flash_mode = 'off';
        // Take a look at docs: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview#methods
        CameraPreview.startCamera(options);


        // Create a rectangle & buttons
        var rect = document.createElement('div');
        var take_pic_btn = document.createElement('img');
        var flash_on_btn = document.createElement('img');
        var flash_off_btn = document.createElement('img');
        var cameraPreviewImg = document.createElement('img');

        cameraPreviewImg.id = 'cameraPreviewImg';
        cameraPreviewImg.style.visibility = 'hidden';

        // You must specify path relative to www folder
        take_pic_btn.src = 'img/take_photo.png';
        flash_on_btn.src = 'img/flash_on.svg';
        flash_off_btn.src = 'img/flash_off.svg';

        // Add styles
        rect.className += 'rect_class';
        take_pic_btn.className += ' take_pic_class';
        flash_on_btn.className += ' flash_class';
        flash_off_btn.className += ' flash_class';

        // Hide flash_off btn by default
        flash_off_btn.style.visibility = 'hidden';

        // Append to body section
        document.body.appendChild(rect);
        document.body.appendChild(take_pic_btn);
        document.body.appendChild(flash_on_btn);
        document.body.appendChild(flash_off_btn);
        document.body.appendChild(cameraPreviewImg);

        // Get rectangle coordinates
        var rect_coords = rect.getBoundingClientRect();
        var x_coord = rect_coords.left, y_coord = rect_coords.top;

        take_pic_btn.onclick = function(){
            // Get rectangle size
            var rect_width = rect.offsetWidth, rect_height = rect.offsetHeight;

            CameraPreview.takePicture(function(base64PictureData) {
                /*
                base64PictureData is base64 encoded jpeg image. Use this data to store to a file or upload.
                Its up to the you to figure out the best way to save it to disk or whatever for your application.
                */

                // One simple example is if you are going to use it inside an HTML img src attribute then you would do the following:
                imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
                cameraPreviewImg.src = imageSrcData;

                rect.style.visibility = 'hidden';
                take_pic_btn.style.visibility = 'hidden';
                flash_on_btn.style.visibility = 'hidden';
                flash_off_btn.style.visibility = 'hidden';
            });
        };

        flash_on_btn.onclick = function() {
            flash_mode = 'on';
            flash_off_btn.style.visibility = 'visible';
            flash_on_btn.style.visibility = 'hidden';

            CameraPreview.setFlashMode(flash_mode);
        }

        flash_off_btn.onclick = function() {
            flash_mode = 'off';
            flash_off_btn.style.visibility = 'hidden';
            flash_on_btn.style.visibility = 'visible';

            CameraPreview.setFlashMode(flash_mode);
        }
    }
};

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
    }

	// Called when a photo is successfully retrieved
    //
    function onPhotoFileSuccess(imageData) {
      // Get image handle
      console.log(JSON.stringify(imageData));

   	  // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
      // Unhide image elements
      //
      smallImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = imageData;
    }
    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);
      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }
    // A button will call this function
    //
    function capturePhotoWithData() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }
    function capturePhotoWithFile() {
        navigator.camera.getPicture(onPhotoFileSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }
    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    function cameraPreview() {
      app.cameraPreviewTest();
    }
