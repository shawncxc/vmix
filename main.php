<?php
    session_start();
    //echo $_SESSION["user_name"];
    //echo $_SESSION["user_id"];
?>

<html ng-app="app">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular.min.js"></script>
    <script src='//cameratag.com/api/v3/js/cameratag.js' type='text/javascript'></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui.min.js"></script>
    <!--<script src="angular-dragdrop.min.js"></script>-->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.2.0/ui-bootstrap-tpls.js"></script>
    <script src="http://pc035860.github.io/angular-highlightjs/angular-highlightjs.min.js"></script>
    <script src="https://raw.githubusercontent.com/jpillora/notifyjs/gh-pages/dist/notify-combined.min.js"></script>
    <script src="http://localhost/VMix/js/sortable.js"></script>
    <script data-require="angular.js@1.2.x" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.js" data-semver="1.2.20"></script>
    <script src="http://pc035860.github.io/angular-highlightjs/angular-highlightjs.min.js"></script>
    <script src="http://localhost/VMix/js/draganddrop.js"></script>
    <script src="http://localhost/VMix/js/controller.js"></script>
    <!--<script type="text/javascript" src="jscolor/jscolor.js"></script>-->
    <link rel="stylesheet" type="text/css" href="http://localhost/VMix/css/vmix-style-blue.css" />
    <link rel="stylesheet" type="text/css" href="css/play.css" />
    <!--<link rel="stylesheet" type="text/css" href="cameratag.css" />-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
    
    <link rel="stylesheet" href="http://localhost/VMix/css/header_profile.css">
    <script src="http://localhost/VMix/js/header.js"></script>
</head>

<body id="body" ng-controller="storyMakerController" data-ng-init="init()">
    <div id="header">
        <div id="show_logo">
            mr. V mix
        </div>
        <div id="navbar">
            <div class="navbaritem"><a href="#profile">Profile</a></div>
            <div class="navbaritem"><a href="logout.php">Log out</a></div>
        </ul>
        </div>
        
    </div>
    <div id="videoContainer">
        <div id="searchItemBox">
            <div id="player"></div>
            <div id="recordingPlayer"></div>
            <div id="imagePlayer">
            </div>
            <div id="searchedVideoContainer">
                <div id="logoshow"><img src="img/MrVmix.png"></div>
                
            </div>
        </div>
        <div id="storyMakerBox">
            <div id="item">
                <div class="category" id="Tools" ng-click="changeitem('Tools')">Me</div>
                <div class="category" id="MyStory" ng-click="changeitem('MyStory')">MyStory</div>
                <div class="category" id="Detail" ng-click="changeitem('Detail')">Detail</div>
            </div>
            <div id="tools" class="items" ng-modal="tools" ng-show="tools==true">
               <div id="me_photo">
                     <div id="photo"><img src="http://cdn.batman-news.com/wp-content/uploads/2013/03/logo.png"></div>                 
                </div>

                <div id="me_info">
                    <h2 style="color: white;">User: <?php echo $_SESSION["user_name"] ?></h2>
                    <h2 style="color: white;">User ID: <?php echo $_SESSION["user_id"] ?></h2>
                </div>
              </div>
            <div class="items" id="videoDetail" ng-modal="videoDetail" ng-show="videoDetail==true">
                <div class="detail" ng-repeat="video in videos" ng-show="video.detail==true">
                    <div id="img"><img ng-src="{{video.videoImg}}" />
                    </div>
                    <div id="title">{{video.title}}</div>
                    <div class="timeSliderBar" ng-modal="timeSliderBar" ng-show="timeSliderBar==true">
                        <p>
                            <input type="text" class="amount2" readonly style="border:0;  background-color: #030303; color:#f6931f; font-weight:bold;">
                        </p>
                        <div class="timeSlider"></div>
                    </div>
                </div>
            </div>
            <div id="myStory" class="items" ng-modal="myStory" ng-show="myStory==true">
                <div class="myRecords" ng-repeat="story in userStories">
                    <a ng-click="" class="myRecords_img"><img class="myRecords_img" ng-src="{{story.story_json[0].videoImg}}" />
                    </a>
                    <div class="myRecordsInfo">
                        Name:<br>
                        {{story.story_name}}<br>
                        Description:<br>
                        {{story.story_description}}<br>
                        
                    </div>
                    <div class="addToEdit_record">
                        <img src="img/MrVmix2.png" ng-click="showStory(story)" />
                    </div>
                    <div class="addToEdit_record">
                        <img src="https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627149-delete3-512.png" ng-click="deleteStory(story)" />
                    </div>
                </div>
            </div>
        </div>
        <div id="pickedVideoBox" ng-model="videos" ui-on-Drop="onDrop($event,$data)" ui-sortable>
            <div class="pickedvideo" ng-repeat="video in videos" ui-draggable="true" drag="video" on-drop-failure="removeVideo(video)">
                <img src="http://waywire.com/media/site/YH5PLD0V56XPX2RS/uploads/removeX.png" class="addToEdit" ng-click="removeVideo(video)" />
                <img class="pickedvideopic" ng-src="{{video.videoImg}}" ng-click="EditVideo(video)" />
            </div>
        </div>
        <div id="searchedBox">
            <div id="searchText">
                <input type="textarea" size=46 placeholder="Input the url of videos" ng-model="searchText" />
                <button class="button" type="submit" ng-click="searchVideo('')">Add</button>
            </div>
            <div class="inner">
                <ul class="activity">
                  <li>
                    <a ng-click="onYouTubeIframeAPIReady('player')">Play</a>
                  </li>
                  <li>
                    <a ng-click="onYouTubeIframeAPIReady('stop')">Stop</a>
                  </li>
                  <li>
                    <a ng-click="showSave()">Save</a>
                  </li>
                </ul>
              </div>
            
        </div>


    </div>
    <div id="shadow-overlay" ng-click="modalClose()"></div>
    <div class="modal" id="previewModal"></div>
</body>

</html>