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
        var appElement = document.getElementById('app');
        appElement.setAttribute('style', 'display:none;');
        document.body.classList.add("cameraPreview");

        var options = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: CameraPreview.CAMERA_DIRECTION.FRONT,
            toBack: true,
            tapPhoto: false,
            tapFocus: true,
            previewDrag: false
        };

        // Take a look at docs: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview#methods
        CameraPreview.startCamera(options);


        // Create a rectangle & buttons
        var take_pic_btn = document.createElement('img');
        // var cameraPreviewImg = document.createElement('img');
        // cameraPreviewImg.id = 'cameraPreviewImg';
        // var cameraPreviewImg = document.getElementById('cameraPreviewImg');

        take_pic_btn.src = 'img/cameraPreview/take_photo.png';
        take_pic_btn.className += ' take_pic_class';
        document.body.appendChild(take_pic_btn);

        var takePhotoTimerId = setTimeout(takePhoto, 3500);

        function takePhoto() {
            CameraPreview.takePicture({width: 200, height: 200, quality: 100}, function(base64PictureData) {
                CameraPreview.stopCamera();
                document.getElementById('cameraPreviewImg').src = 'data:image/jpeg;base64,' + base64PictureData;

                var photoFrameTimerId = setTimeout(photoFrameInit, 2000);

                // take_pic_btn.setAttribute('style', 'display:none;');
                // appElement.setAttribute('style', 'display:block;');
                // document.body.classList.remove("cameraPreview");

                // imageSrcData = 'data:image/jpeg;base64,' +base64PictureData;
                
                
            });
        }

        function photoFrameInit() {
            var photoFrame = document.createElement('div');
            photoFrame.classList.add("photo-frame");
        }
    }
};
