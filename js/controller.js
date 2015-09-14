var app = angular.module("app", ['ngDragDrop', 'hljs', 'ui.sortable']);

app.controller("storyMakerController", function($scope, $http, $sce, $compile) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    $scope.currentPreviewIframeURL = "";
    $scope.currentPreviewRecordDatauuid = "";
    var allvideos = [];
    $scope.pagenumber = 1;
    $scope.player = null;
    $scope.searchResult = true;
    $scope.startHours;
    $scope.tools = true;
    $scope.countCorrect = 0;
    $scope.myVideo = false;
    $scope.slidebar = false;
    $scope.slidebar_hide = true;
    $scope.timeSliderBar = false;
    $scope.userStories = {};
    $scope.myStory = false;
    $scope.videoDetail = false;
    $scope.clips = 3;
    $scope.text = null;
    $scope.bgColor = "000000";
    $scope.fgColor = "ffffff";
    $scope.textsizes = [{
            size: 10
        }, {
            size: 12
        }, {
            size: 14
        }, {
            size: 16
        }, {
            size: 18
        }, {
            size: 20
        }

    ];
    $scope.colors = [{
        name: 'black',
        code: '000000'
    }, {
        name: 'white',
        code: 'FFFFFF'
    }, {
        name: 'red',
        code: 'FF0000'
    }, {
        name: 'blue',
        code: '0000FF'
    }, {
        name: 'yellow',
        code: 'FFFF00'
    }];

    $scope.addText = "";
          
    $scope.onDrop = function($event,$data){
    };
  
    $scope.init = function() {
        console.log("init");
        $("#logoshow>img").fadeIn(3000);
        $scope.getStory();
    };
    
    $scope.previewVideo = function(video) {
        console.log(video);
            var vId = video.source_href.substring(31);
            $scope.currentPreviewIframeURL = "http://www.youtube.com/embed/" + vId + "?autoplay=1";
            jQuery("#previewModal").addClass("active").html("<iframe src='" + $scope.currentPreviewIframeURL + "'></iframe>");
            console.log($scope.currentPreviewIframeURL);
            $scope.modalOpen("previewModal", function() {
                $scope.currentPreviewIframeURL = "";
                jQuery("#previewModal").removeClass("active").html("");
            });
    }

    $scope.previewImage = function(img) {
        var baseUrl = "http://ipsumimage.appspot.com/600x310?s=35&";
        var bgColor = $scope.bgColor.code;
        var fgColor = $scope.fgColor.code;
        console.log(bgColor);
        console.log(fgColor);

        var text = $scope.text;
        while (text.indexOf('\n') != -1) {
           text= text.replace('\n', '|');
        }
        
        var url = baseUrl + "b=" + bgColor + "&f=" + fgColor + "&l=" + text;
        jQuery("#previewModal").addClass("active").html("<img style='width:600px; border:1px solid white;' src='" + url + "'></img>");
        console.log($scope.currentPreviewIframeURL);
        $scope.modalOpen("previewModal", function() {
            jQuery("#previewModal").removeClass("active").html("");
        });


    }

    $scope.modalOpen = function(id, callback) {
        $scope.modalID = id;
        $("#" + $scope.modalID).show();
        jQuery("#shadow-overlay").addClass("toggled");
        $scope.modalCallback = callback || function() {};
    }

    $scope.modalClose = function() {
        $("#" + $scope.modalID).hide();
        jQuery("#shadow-overlay").removeClass("toggled");
        $scope.modalCallback();
    }

    $scope.getClips = function(clips) {
        console.log(typeof(clips));
        if (clips == 3) {
            if ($scope.videos != undefined && $scope.videos.length > 3) {
                jQuery.notify("Too many videos", "error");
            } else {
                jQuery("#clips_3").css("background-color", "orange");
                jQuery("#clips_3").css("color", "#030303");
                jQuery("#clips_5").css("background-color", "#030303");
                jQuery("#clips_5").css("color", "orange");
                jQuery(".pickedvideo").css("margin", "25px 73px auto");
                //jQuery.notify("3 videos","success");
            }
        } else {
            jQuery("#clips_5").css("background-color", "orange");
            jQuery("#clips_5").css("color", "#030303");
            jQuery("#clips_3").css("background-color", "#030303");
            jQuery("#clips_3").css("color", "orange");
            jQuery(".pickedvideo").css("margin", "25px 20px auto");
            //jQuery.notify("5 videos","success");
        }
        $scope.clips = clips;
    }

    $scope.getMyRecord = function() {
        $http({
            method: 'GET',
            url: '/storymaker/getRecords.mason'
        }).

        success(function(data, status, headers, config) {
            //console.log(data);
            var myRecording = [];

            for (var i = 0; i < data.length; i++) {
                var duration_seconds = data[i].formats[0].length;
                var searchedVideo = {
                    index: i,
                    uuid: data[i].uuid,
                    camera_uuid: data[i].camera_uuid,
                    created_at: data[i].created_at,
                    duration_seconds: duration_seconds,
                    display: true,
                    state: "published",
                    formats: [{
                        thumbnail_url: data[i].formats[0].thumbnail_url,
                        small_thumbnail_url: data[i].formats[0].small_thumbnail_url,
                        video_url: data[i].formats[0].mp4_url
                    }],
                }
                myRecording.push(searchedVideo);
            }

            $scope.myRecording = myRecording;


        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    $scope.deleteRecord = function(record) {
        console.log(record.uuid);
        var baseUrl = "/storymaker/deleteRecord.mason?recordinguuid=";
        var videouuid = record.uuid;
        $http({
            method: 'GET',
            url: baseUrl + videouuid
        }).

        success(function(data, status, headers, config) {
            setTimeout(function() {
                $scope.getMyRecord();
                jQuery.notify("Delete recording successful", "success");
            }, 3000);

        }).
        error(function(data, status, headers, config) {});

    }
 
/*    $scope.searchVideo = function(page) {

        jQuery("#logoshow").hide();
        jQuery("#allvideos").show();
        jQuery("#pages").show();



        if (page == 'next' && $scope.pagenumber < 20) {
            $scope.pagenumber++;
        } else if (page == 'prev' && $scope.pagenumber > 1) {
            $scope.pagenumber--;
        } else{
            $scope.pagenumber = 1;
        }
        console.log(page);
        if (page=='vimeo') {
            console.log("!!!!!!!");
            var text = $scope.searchText;
            var searchParams = {
            page: $scope.pagenumber,
            per_page: 8,
            search: text,
            sort: 'date',
            filter: '',
            services: 'vimeo'
        };
        $http({
            method: 'POST',
            url: '/admin/manage/loader/builder',
            params: searchParams
        }).
        success(function(data, status, headers, config) {
            console.log(data.results.vimeo.length);
            var allSearchedVideo = [];
            for (var i = 0; i < data.results.vimeo.length; i++) {
                var searchedVideo = {
                    index: i,
                    cid: data.results.vimeo[i].cid,
                    content_item_cid: data.results.vimeo[i].content_item_cid,
                    description: data.results.vimeo[i].description,
                    duration_seconds: data.results.vimeo[i].duration_seconds,
                    source_href: data.results.vimeo[i].source_href,
                    thumbnail_url: data.results.vimeo[i].thumbnail_url,
                    title: data.results.vimeo[i].title,
                    type: 'vimeo', 
                    displayInSearch: true,
                    displayInEdit: false
                }
                allSearchedVideo.push(searchedVideo);
            }
            $scope.allsearchedVideos = allSearchedVideo;
            //console.log(data.results.youtube); //, headers, config); 
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function(data, status, headers, config) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        }else if (page=='aol') {
            var text = $scope.searchText;
            var searchParams = {
            page: $scope.pagenumber,
            per_page: 8,
            search: text,
            sort: 'date',
            filter: '',
            services: '5min'
        };
        $http({
            method: 'POST',
            url: '/admin/manage/loader/builder',
            params: searchParams
        }).
        success(function(data, status, headers, config) {
            console.log(data);
            var allSearchedVideo = [];
            for (var i = 0; i < data.results["5min"].length; i++) {
                var searchedVideo = {
                    index: i,
                    cid: data.results["5min"][i].cid,
                    content_item_cid: data.results["5min"][i].content_item_cid,
                    description: data.results["5min"][i].description,
                    duration_seconds: data.results["5min"][i].duration_seconds,
                    format_info: data.results["5min"][i].format_info,
                    license: data.results["5min"][i].license,
                    media_equivalence_nid: data.results["5min"][i].media_equivalence_nid,
                    media_pipeline_cid: data.results["5min"][i].media_pipeline_cid,
                    media_type_cid: data.results["5min"][i].media_type_cid,
                    nid: data.results["5min"][i].nid,
                    pipeline_info: data.results["5min"][i].pipeline_info,
                    pipeline_xid: data.results["5min"][i].pipeline_xid,
                    posted: data.results["5min"][i].posted,
                    poster: data.results["5min"][i].poster,
                    source_href: data.results["5min"][i].source_href,
                    status: data.results["5min"][i].status,
                    synced: data.results["5min"][i].synced,
                    tags: data.results["5min"][i].tags,
                    thumbnail_cache: data.results["5min"][i].thumbnail_cache,
                    thumbnail_url: data.results["5min"][i].thumbnail_url,
                    title: data.results["5min"][i].title,
                    type: '5min',
                    displayInSearch: true,
                    displayInEdit: false
                }
                allSearchedVideo.push(searchedVideo);
            }
            $scope.allsearchedVideos = allSearchedVideo;
            //console.log(data.results.youtube); //, headers, config); 
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function(data, status, headers, config) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        }else if (page=='youtube') {
            var text = $scope.searchText;
            var searchParams = {
            page: $scope.pagenumber,
            per_page: 8,
            search: text,
            sort: 'date',
            filter: '',
            services: 'youtube'
        };
        $http({
            method: 'POST',
            url: '/admin/manage/loader/builder',
            params: searchParams
        }).
        success(function(data, status, headers, config) {
            //console.log(data);
            var allSearchedVideo = [];
            for (var i = 0; i < data.results.youtube.length; i++) {
                var searchedVideo = {
                    index: i,
                    cid: data.results.youtube[i].cid,
                    duration_seconds: data.results.youtube[i].duration_seconds,
                    media_equivalence_nid: data.results.youtube[i].media_equivalence_nid,
                    source_href: data.results.youtube[i].source_href,
                    thumbnail_url: data.results.youtube[i].thumbnail_url,
                    title: data.results.youtube[i].title,
                    type: 'youtube',
                    displayInSearch: true,
                    displayInEdit: false
                }
                allSearchedVideo.push(searchedVideo);
            }
            $scope.allsearchedVideos = allSearchedVideo;
            //console.log(data.results.youtube); //, headers, config); 
            // this callback will be called asynchronously
            // when the response is available
        }).
        error(function(data, status, headers, config) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        }
        
    }
*/

    $scope.changeitem = function(text) {
        console.log(text);
        if (text == "Tools") {
            //jQuery("#Tools").css("background-color","orange");
            //jQuery("#Tools").css("color","#030303");
            $scope.tools = true;
            $scope.myVideo = false;
            $scope.videoDetail = false;
            $scope.myStory = false;
        } else if (text == "MyVideo") {
            $scope.tools = false;
            $scope.myVideo = true;
            $scope.videoDetail = false;
            $scope.myStory = false;
        } else if (text == "Detail") {
            $scope.tools = false;
            $scope.myVideo = false;
            $scope.videoDetail = true;
            $scope.myStory = false;
        } else if (text == "MyStory") {
            $scope.tools = false;
            $scope.myVideo = false;
            $scope.videoDetail = false;
            $scope.myStory = true;
            $scope.getStory();
        }
    }

    $scope.addToEdit = function(newvideo) {
            //$scope.allsearchedVideos[newvideo.index].displayInSearch = false;
            console.log(newvideo);
            var videoId = newvideo.vid;
            var videoImg = newvideo.thumbnail_url;
            var title = newvideo.title;
            var duration_seconds = newvideo.duration_seconds;

            var video = {
                videoId: videoId,
                startSeconds: 0,
                endSeconds: duration_seconds - 1 + 1,
                duration_seconds: duration_seconds,
                suggestedQuality: "large",
                videoImg: videoImg,
                title: title,
                detail: false,
                type: "youtube"

            };
            allvideos.push(video);
                        
            $scope.videos = allvideos;
        }
    
    function convert(input) {
          var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
          var hours = 0, minutes = 0, seconds = 0, totalseconds;

          if (reptms.test(input)) {
            var matches = reptms.exec(input);
            if (matches[1]) hours = Number(matches[1]);
            if (matches[2]) minutes = Number(matches[2]);
            if (matches[3]) seconds = Number(matches[3]);
            totalseconds = hours * 3600  + minutes * 60 + seconds;
          }
          
          return totalseconds
    }
    
    function httpGet(theUrl){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
    
    
    $scope.searchVideo = function(){
        jQuery("#logoshow").hide();

        var vid = $scope.searchText.substring(32);
        var API_key = "&key=AIzaSyDbOhNEDmXce8jC8r9Y5inKWk3hZC8giNA"
        var tumble = "&part=snippet"
        var duration = "&part=contentDetails"
        
        url = "https://www.googleapis.com/youtube/v3/videos?id=" + vid + tumble + API_key;
        duration_time = "https://www.googleapis.com/youtube/v3/videos?id=" + vid + duration + API_key;
        console.log(duration_time);
        var pic = "";
        var time = 0;
        var title = "";
        
        var response_pic = JSON.parse(httpGet(url));
        var response_time = JSON.parse(httpGet(duration_time))
        var pic = response_pic.items[0].snippet.thumbnails.medium.url;
        var title = response_pic.items[0].snippet.title;
        var time = convert(response_time.items[0].contentDetails.duration); 
         
        
        var AddedVideo = {
                duration_seconds: time,
                vid : vid, 
                thumbnail_url: pic,
                title :title,
                type: 'youtube',
                displayInSearch: true,
                displayInEdit: false
            }
            
        $scope.addToEdit(AddedVideo);      
    }
    
    
    $scope.saveStory = function() {
        var storyTitle = document.getElementById("storyTitle").value;
        var decription = document.getElementById("storyDecription").value;
        var story_json = JSON.stringify($scope.videos);
        

        var story = {
            storyTitle : storyTitle,
            decription : decription,
            story_json : story_json
        };

        $.ajax({
            type:"GET",
            datatype: "json",
            url:"http://localhost/vmix/php/saveStory.php",
            data:story,
            success:function(response){
                console.log(response);
            }
        });
        jQuery("#previewModal").removeClass("active").html("");
        $scope.modalClose();
        $scope.getStory();

    };


    $scope.getStory = function() {        
        $.ajax({
            type:"GET",
            url:"http://localhost/vmix/php/getStory.php",
            success:function(response){
            var allStories = [];
            var res = JSON.parse(response);
                for(var i = 0; i< res.length;i++){
                   var s = JSON.parse(res[i]);
                   var story ={
                      user_id: s.user_id,
                      story_id: s.story_id,
                      story_json:JSON.parse(s.story_json),
                      story_name: s.story_name,
                      story_description: s.story_description,
                      story_tag: s.story_tag,
                   }
                   allStories.push(story);
                }
              console.log(allStories[0].story_json[0].videoImg);
              $scope.userStories = allStories;
            }
            
        });
        
    };


    $scope.deleteStory = function(story) {
        var story_id = {
            story_id : story.story_id
        }
        console.log(story_id);

        $.ajax({
            type:"GET",
            url:"http://localhost/vmix/php/deleteStory.php",
            datatype: "JSON",
            data: story_id,
            success:function(response){
                console.log(response);
            }
            
        });
       

        $scope.getStory();
        $scope.videos = [];
        
    };


    $scope.showStory = function(story) {
       
        $scope.videos = story.story_json;
    };


    $scope.showSave = function() {
        if ($scope.videos.length!=0) {
            jQuery("#previewModal").addClass("active").html($compile("<div id='saveTable' ng-controller='storyMakerController'><div><img style='float: left; height: 80px; margin-left: 110px;' src='img/MrVmix.png'></div><div style='float: left; height: 120px; width:400px; margin-top: 15px;'>Title<br><input id='storyTitle' type='text'/><br>Discription:<br><textarea id='storyDecription' rows='3' ></textarea></div><div style='float: left; height: 50px; width:200px; margin: 20px 102px;'><input class='button' type='submit' value='  ' ng-click='saveStory()'></div></div>")($scope));
            $scope.modalOpen("previewModal", function() {
            jQuery("#previewModal").removeClass("active").html("");
        });
        }
            
    }

    $scope.EditVideo = function(pickedVideo){
        for (var i = 0, len = $scope.videos.length; i < len; i++){
            $scope.videos[i].detail = false;
        }        
        for (var i = 0, len = $scope.videos.length; i < len; i++) {
            if ($scope.videos[i].videoId == pickedVideo.videoId) {
                console.log($scope.timeSliderBar);
                $scope.videos[i].detail = true;
                $scope.timeSliderBar = true;
                $( ".timeSlider" ).slider({
                    range: true,
                    min: 0,
                    max: pickedVideo.duration_seconds,
                    values: [pickedVideo.startSeconds, pickedVideo.endSeconds],
                    slide: function( event, ui ) {
                        $( ".amount2" ).val("Start:" + ui.values[0] + " - End:" + ui.values[1] );
                        pickedVideo.startSeconds = ui.values[0];
                        pickedVideo.endSeconds = ui.values[1]
                    }
                });
                
                $( ".amount2" ).val("Start: " + $( ".timeSlider" ).slider( "values", 0 ) +
                " - End: " + $( ".timeSlider" ).slider( "values", 1 ) );
                
            }
        }
    }


    $scope.removeVideo = function(pickedVideo) {
        console.log(pickedVideo);
        var videoId = pickedVideo.videoId;
        if ($scope.allsearchedVideos != undefined && pickedVideo.type == "video") {
                $scope.allsearchedVideos[pickedVideo.index].displayInSearch = true;   
        }
        if (pickedVideo.type == "recording") {
                $scope.myRecording[pickedVideo.index].display = true;
        }

        var newVideos = [];
        for (var i = 0, len = $scope.videos.length; i < len; i++) {
            if ($scope.videos[i].videoId != videoId) {
                newVideos.push($scope.videos[i]);
            }
        }
        if (newVideos.length < 10) {
            jQuery(".pickedvideopic").css("width", "118px");
        } else if (newVideos.length >= 10 && newVideos.length < 20) {
            jQuery(".pickedvideopic").css("width", "50px");
        } else if (newVideos.length >= 20) {
            jQuery(".pickedvideopic").css("width", "25px");
        }
        $scope.videos = newVideos;
        allvideos = newVideos;

    }

    $scope.exchangeOrder = function(pickedVideo, direction) {
        for (var i = 0, len = $scope.videos.length; i < len; i++) {
            if (direction == 'right' && $scope.videos[i].videoId == pickedVideo.videoId && i != $scope.videos.length - 1) {
                var temp = $scope.videos[i];
                $scope.videos[i] = $scope.videos[i + 1];
                $scope.videos[i + 1] = temp;
                return;

            } else if (direction == 'left' && $scope.videos[i].videoId == pickedVideo.videoId && i != 0) {
                var temp = $scope.videos[i];
                $scope.videos[i] = $scope.videos[i - 1];
                $scope.videos[i - 1] = temp;
                return;
            }
        }
    }

   


    $scope.onYouTubeIframeAPIReady = function(divId) {
        var count = 0;
        var temp = 1;
        
        if (divId == "player") {
            if ($scope.videos.length == 0) {
                return;
            }
            jQuery("#searchedVideoContainer").hide();
            jQuery("#pages").hide();
            jQuery("#text_area").show();
            jQuery("#slidebar_hide").hide();

            jQuery("#slidebar").show();


            //slideshow(durationTime());

            $scope.player = new YT.Player(divId, {
                height: '350',
                width: '750',
                playerVars: {
                    'controls': 0,
                    'rel': 0,
                    'fs': 1,
                    'showinfo': 0,
                    'modestbranding': 1,
                    'autoplay' : 0,
                    'end' : 10
                },
                events: {
                    'onReady': startPlayer,
                    'onStateChange': isEnded
                }
            });
            
        } else if (divId == "stop") {
            stopPlaying();
            return;
        }


        function durationTime() {
            durationTime = 0;
            for (var i = 0; i < $scope.videos.length; i++) {
                if ($scope.videos[i].type == "video") {
                    durationTime += $scope.videos[i].endSeconds - $scope.videos[i].startSeconds;
                } else if ($scope.videos[i].type == "recording") {
                    durationTime += $scope.videos[i].duration_seconds;
                } else {
                    durationTime += $scope.videos[i].duration_seconds;
                }
                console.log(durationTime);
            }
            return durationTime;
        }

        function startPlayer(event) {
            console.log("start:" + event);
            playingVideo = {
                    'videoId': $scope.videos[count].videoId,
                    'startSeconds': $scope.videos[count].startSeconds,
                    'endSeconds': 20,
                    //'endSeconds': $scope.videos[count].endSeconds,
                    'suggestedQuality': 'large'
                 }
            $scope.player.loadVideoById(playingVideo);
            count++;
        }

        function slideshow(durationTime) {
            console.log("durationTime:" + durationTime);
            var time = 0;
            var range_time = durationTime;

            interval = setInterval(function() {

                $("#slider").slider({
                    range: "min",
                    animate: "fast",
                    value: time,
                    min: 1,
                    max: range_time,
                    slide: function(event, ui) {
                        time = ui.value;

                        var newTime = time;
                        console.log("newTime:" + newTime);
                        for (var i = 0; i < $scope.videos.length; i++) {
                        /*
			if($scope.videos[i].duration_seconds < newTime)
			{
                          var time_scale = $scope.videos[i].endSeconds - $scope.videos[i].startSeconds;
                          console.log("time_scale:" + time_scale);
                          console.log($scope.videos[i].endSeconds);
                          if ($scope.videos[i].type=="recording") {
                            newTime = newTime - $scope.videos[i].duration_seconds;
                          }else
                          {
                            newTime = newTime - $scope.videos[i].time_scale;
                          }
			  videoToPlay = i+1;
			}
			else
			{
			  videoToPlay = i;
			  break;
			}
			*/
                        if ($scope.videos[i].type == "recording" && $scope.videos[i].duration_seconds <= newTime)
                        {
                                newTime = newTime - $scope.videos[i].duration_seconds;
                                videoToPlay = i + 1;
                            } else if ($scope.videos[i].type == "recording" && $scope.videos[i].duration_seconds > newTime) {
                                videoToPlay = i;
                                break;
                            } else if ($scope.videos[i].type == "video") {
                                var time_scale = $scope.videos[i].endSeconds - $scope.videos[i].startSeconds;
                                console.log("time_scale:" + time_scale);
                                if (time_scale <= newTime) {
                                    newTime = newTime - time_scale;
                                    videoToPlay = i + 1;
                                } else {
                                    videoToPlay = i;
                                    break;
                                }
                        }
                        }
                        console.log("time:" + newTime);
                        console.log("videoToPlay:" + videoToPlay);
                        if ($scope.videos[videoToPlay].type == "video" && player.getPlayerState() != 2 && player.getPlayerState() != 3) {
                            jQuery("#recordingPlayer").css("z-index", -1);
                            jQuery("#recordingPlayer").removeClass("active").html("");
                            console.log("end at: " + $scope.videos[videoToPlay].endSeconds);
                            count = videoToPlay;
                            var video = {
                                'videoId': $scope.videos[videoToPlay].videoId,
                                'startSeconds': newTime,
                                'endSeconds': $scope.videos[videoToPlay].endSeconds
                            };
                            player.loadVideoById(video);
                        } else if ($scope.videos[videoToPlay].type == "recording") {
                            jQuery("#recordingPlayer").removeClass("active").html("");
                            onCameraAPIReady($scope.videos[videoToPlay].videoId, newTime, videoToPlay);
                        }
                    }
                });
                
                if (time < range_time) {
                    time++;
                } else if (time >= range_time) {
                    clearInterval(interval);
                    stopPlaying();
                }



                if (time > 0 && time < 10) {
                    $("#amount").val("00:0" + (time % 60));
                } else if (time >= 10 && time < 60) {
                    $("#amount").val("00:" + (time % 60));
                } else if (time / 60 < 10 && time >= 60 && (time % 60) < 10) {
                    $("#amount").val("0" + parseInt(time / 60) + ":0" + (time % 60));
                } else if (time / 60 < 10 && time >= 60 && (time % 60) >= 10) {
                    $("#amount").val("0" + parseInt(time / 60) + ":" + (time % 60));
                } else if (time / 60 >= 10 && time >= 60 && (time % 60) < 10) {
                    $("#amount").val(parseInt(time / 60) + ":0" + (time % 60));
                } else if (time / 60 >= 10 && time >= 60 && (time % 60) >= 10) {
                    $("#amount").val(parseInt(time / 60) + ":" + (time % 60));
                }

            }, 1000);
        }

        function isEnded(event) {
            console.log(event);
            if (event.data == 0){                          
                if (count == $scope.videos.length) {
                    $scope.player.destroy();
                    console.log("Stop");
                    return;                               
                }else if ($scope.videos[count] != undefined && $scope.videos[count].type == "youtube") {
                    console.log(count + " " + temp);
                    playingVideo = {
                        'videoId': $scope.videos[count].videoId,
                        'startSeconds': $scope.videos[count].startSeconds,
                        'endSeconds': 20,
                        //'endSeconds': $scope.videos[count].endSeconds,
                        'suggestedQuality': 'small'
                    }
                    $scope.player.loadVideoById(playingVideo);
                    if(temp == 0) {
                       count++;
                       temp = 1;                
                    }else{
                       temp--; 
                    }
                    
                }
            }
           
        }
        


        function stopPlaying() {
            $scope.player.destroy();
            console.log("Stoped!!!");
        }

    }
    
    
    $scope.allowDrop = function(ev) {
          console.log("!!!!!!");
          ev.preventDefault();
    }
      
    $scope.drag = function (ev) {
          console.log("!!!!!!");
          ev.dataTransfer.setData("Text", ev.target.id);
      }
      
    $scope.drop = function(ev) {
          console.log("!!!!!!");
          ev.preventDefault();
          var data = ev.dataTransfer.getData("Text");
          ev.target.appendChild(document.getElementById(data));
      }



});