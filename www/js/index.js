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
var device = true;
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
        if (device) document.addEventListener('deviceready', this.onDeviceReady, false);
        else this.onDeviceReady();
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
        var takePhotoTimerId, photoFrameTimerId, previewImgSizeTimerId, previewImgSizeChangeTimerId, text1TimerId, text2TimerId;
        var appElement = document.getElementById('app');
        appElement.setAttribute('style', 'display:none;');
        document.body.classList.add("cameraPreview");

        var options = {
            x: 0,
            y: 0,
            width: window.screen.width,
            height: window.screen.height,
            camera: device ? CameraPreview.CAMERA_DIRECTION.FRONT : null,
            toBack: true,
            tapPhoto: false,
            tapFocus: true,
            previewDrag: false
        };

        // Take a look at docs: https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview#methods
        if (device) CameraPreview.startCamera(options);

        takePhotoTimerId = setTimeout(takePhoto, 3500);

        function takePhoto() {
            textInit();
            if (device) {
                CameraPreview.takePicture({width: 200, height: 200, quality: 100}, function(base64PictureData) {
                    CameraPreview.stopCamera();
                    document.getElementById('cameraPreviewImg').src = 'data:image/jpeg;base64,' + base64PictureData;

                    photoFrameTimerId = setTimeout(photoFrameInit, 1500);
                    previewImgSizeTimerId = setTimeout(previewImgSize, 3000);
                });
            }
            else {
                document.getElementById('cameraPreviewImg').src = 'res/screen/android/drawable-port-xxxhdpi-screen.png';

                photoFrameTimerId = setTimeout(photoFrameInit, 1500);
                previewImgSizeTimerId = setTimeout(previewImgSize, 3000);
            }
        }

        function photoFrameInit() {
            document.getElementById('photoFrame').classList.add("on");
        }

        function previewImgSize() {
            document.getElementById('photoFrame').classList.remove("on");
            previewImgSizeChangeTimerId = setTimeout(function () {
                document.getElementById('cameraPreviewImg').classList.add("size-change");
            }, 10);
            text1TimerId = setTimeout(function () {
                document.getElementById('text_1').setAttribute('style', 'opacity:1;');
            }, 450);
            text2TimerId = setTimeout(function () {
                var coord = app.getCoords(document.getElementById('cameraPreviewImg'));
                var date = new Date();
                var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                document.getElementById('text_2_time').textContent = hours + ':' + minutes;
                document.getElementById('text_2').setAttribute('style', 'top:' + coord.bottom +'px; opacity:1;');
            }, 2000);
        }

        function textInit() {
            // text_1
            var employeeName = document.getElementById('employee-name-param').value;
            if (employeeName !== '') {
                document.getElementById('employee-name').textContent = employeeName;
            }
        }

        document.getElementById('back-btn').addEventListener("click", back);

        function back() {
            appElement.setAttribute('style', 'display:block;');
            document.body.classList.remove("cameraPreview");
            document.getElementById('cameraPreviewImg').src = '';
            document.getElementById('photoFrame').classList.remove("on");
            document.getElementById('cameraPreviewImg').classList.remove("size-change");
            document.getElementById('text_1').setAttribute('style', 'opacity:0;');
            document.getElementById('text_2').setAttribute('style', 'opacity:0;');

            clearTimeout(takePhotoTimerId);
            clearTimeout(photoFrameTimerId);
            clearTimeout(previewImgSizeTimerId);
            clearTimeout(previewImgSizeChangeTimerId);
            clearTimeout(text1TimerId);
            clearTimeout(text2TimerId);
        }
    },

    getCoords: function(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset,
            bottom: elem.offsetHeight + (box.top + pageYOffset)
      };
    }
};
