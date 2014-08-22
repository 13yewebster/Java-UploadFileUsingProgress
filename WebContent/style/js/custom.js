// reset input searchbar
    function myFunction()
    {
      document.getElementById("searchForm").reset();
    }

// isotope
$(window).load(function() {
  var $container = $('.example'),
    colWidth = function () {
      var w = $container.width(),
        columnNum = 1,
        columnWidth = 0;
      if (w > 1280) {
        columnNum  = 5;
      } else if (w > 800 && w <= 1280) {
        columnNum  = 4;
      } else if (w > 480 && w <= 800) {
        columnNum  = 3;
      } else if (w <= 480) {
        columnNum  = 2;
      }
      columnWidth = Math.floor(w/columnNum);
      $container.find('.item').load().each(function() {
        var $item = $(this),
          multiplier_w = $item.attr('class').match(/item-w(\d)/),
          width = multiplier_w ? columnWidth*multiplier_w[1]-4 : columnWidth-4;
        $item.css({
          width: width,
        });
      });
      return columnWidth;
    },
    isotope = function (){
      $container.isotope({
        resizable: false,
        itemSelector: '.item',
        masonry: {
          columnWidth: colWidth(),
          gutterWidth: 4
        }
      });
    };
  isotope();
  $(window).smartresize(isotope);
});

//show password on login
$(function() {
  $("input[type=password]").each(function (index, input) {
    var $input = $(input);
    $(".show-password").click(function () {
      var change = "";
      if ($(this).html() === "Show") {
        $(this).html("Hide");
        change = "text";
      } else {
        $(this).html("Show");
        change = "password";
      }
      var rep = $("<input type='" + change + "' />")
        .attr("id", $input.attr("id"))
        .attr("name", $input.attr("name"))
        .attr("class", $input.attr("class"))
        .val($input.val())
        .insertBefore($input);
      $input.remove();
      $input = rep;
    }).insertAfter($input);
  });
});

//upload button
function getFile(){
   document.getElementById("upfile").click();
 }
 function sub(obj){
    var file = obj.value;
    var fileName = file.split("\\");
    document.getElementById("yourBtn").innerHTML = fileName[fileName.length-1];
    document.myForm.submit();
    event.preventDefault();
  }

 //check form validation
 var validator = new FormValidator('signUp', [{
 		name: 'userLoginId',
 		display: 'Email',
	    rules: 'valid_email'
	}, {
	    name: 'currentPassword',
	    display: 'password',
	    rules: 'required|alpha_numeric|min_length[8]'
	}, {
	    name: 'currentPasswordVerify',
	    display: 'password confirmation',
	    rules: 'required|alpha_numeric|min_length[8]|matches[currentPassword]'
	}], function(errors, evt) {
	    if (errors.length > 0) {

	    	//alert('error found !'+ errors.length);

	        var SELECTOR_ERRORS = $('#userLoginAlert');
		        //SELECTOR_SUCCESS = $('.success_box');
			   var errMsgString="";

			    if (errors.length > 0) {
			        SELECTOR_ERRORS.empty();
			        $('#passwordAlert').empty();
			        $('#userLoginAlert').empty();

			        for (var i = 0, errorLength = errors.length; i < errorLength; i++) {

			            errMsgString=errors[i].message;
			            if (errMsgString.toLowerCase().indexOf("password") >= 0)
			            	$('#passwordAlert').append(errors[i].message + '<br />');

			            if (errMsgString.toLowerCase().indexOf("email") >= 0)
			            	$('#userLoginAlert').append(errors[i].message + '<br />');

			        }

			        //SELECTOR_SUCCESS.css({ display: 'none' });
			        SELECTOR_ERRORS.fadeIn(200);
			    } else {
			        //SELECTOR_ERRORS.css({ display: 'none' });
			        //SELECTOR_SUCCESS.fadeIn(200);
			    }

			    if (evt && evt.preventDefault) {
			        evt.preventDefault();
			    } else if (event) {
			        event.returnValue = false;
			    }
			}
	});




//Cookies
$(function() {

$('.form-signin').change(function() {

 // Declares
 var getUser = $('input[name="USERNAME"]').val();
 var getPass = $('input[name="PASSWORD"]').val();
 var keepMe  = $('input[name="KEEPME"]');

 // Create Cookies
 $.cookie('username', getUser), { expires: 30 };
 $.cookie('password', getPass), { expires: 30 };

 // Debugs
 // console.log('Username : ' + getUser);
 // console.log('Password : ' + getPass);

 $('button').click(function() {
   // event.preventDefault();
   if(keepMe.is(':checked')) {
     $.cookie('username', getUser), { expires: 30 };
     $.cookie('password', getPass), { expires: 30 };
     // console.log('Cookies has been created');
   }
   else {
     $.removeCookie('username');
     $.removeCookie('password');
     // console.log('Cookies has been removed');
   }
 });

});

if ($.cookie('username') && $.cookie('password').length > 0) {
 $('input[name="USERNAME"]').val($.cookie('username'));
 $('input[name="PASSWORD"]').val($.cookie('password'));
 $('input[name="KEEPME"]').prop('checked', true);
 //$('.form-signin').submit();
};

$('.form-logout').click(function() {
 $.removeCookie('username');
 $.removeCookie('password');
 // console.log('Cookies has been removed');
});

});



$(function(){

	  function previewURL(input) {
	    if (input.files && input.files[0]) {
	      var reader = new FileReader();
	      reader.onload = function (e) {
	        $('.imgReplacer').remove();
	        $('.imgPlace').append('<img class="imgReplacer">');
	        $('.imgReplacer').attr('src', e.target.result);
	        $('.imgReplacer').css({'padding' : '10px', 'maxWidth' : '100%'});
	      }
	      reader.readAsDataURL(input.files[0]);
	    }
	  }

	  $('.previewURL').change(function(){
	    var newImage = previewURL(this);
	  });

	});




 //fade in
 $(".imageContainer").delay(500).animate({"opacity": "1"}, 700);



 //dynamic input
$( "#addExpButton" ).click(function () {
	var ajaxLoading = false;

	if ( $( "#userAddExperienceForm" ).is( ":hidden" ) ) {
		$( "#userAddExperienceForm" ).slideDown( "slow" );
		//$("#addExpButton").attr("disabled","disabled");
		$("#cancelExperience").click(function(){
			$("#addExpButton").removeAttr("disabled");
			$( "#userAddExperienceForm" ).slideUp("slow");
		});
		$("#saveExperience").click(function(){
			$("#addExpButton").removeAttr("disabled");
			$( "#userAddExperienceForm" ).slideUp("slow");
			var xpartyIdToName = $("#partyIdToName").val();
			var xpositionName = $("#positionName").val();
			var xcurrentJob = $('input[name="currentJob"]:checked').val();
			var xstartMonth = $('select[name="startMonth"]').val();
			var xstartYear = $('select[name="startYear"]').val();
			var xendMonth = $('select[name="endMonth"]').val();
			var xendYear = $('select[name="endYear"]').val();
			var xpartyRegion = $("#partyRegion").val();
			var xdescription = $("#description").val();

			var datas = 'partyIdToName='+xpartyIdToName+'&positionName='+xpositionName+'&currentJob='+xcurrentJob+'&startMonth='+xstartMonth+'&startYear='+xstartYear+'&endMonth='+xendMonth+'&endYear'+xendYear+'&partyRegion='+xpartyRegion+'&description='+xdescription;
			 if(!ajaxLoading) {
				 ajaxLoading = true;
				 //clear all form
				$("#partyIdToName").val("");
				$("#positionName").val("");
				$('input[name="currentJob"]').val("no");
				$('select[name="startMonth"]').val("empty");
				$('select[name="startYear"]').val("empty");
				$('select[name="endMonth"]').val("empty");
				$('select[name="endYear"]').val("empty");
				$("#partyRegion").val("");
				$("#description").val("");

				$.ajax({
					url: "userCreateExperience",
					data: {partyIdToName: xpartyIdToName, positionName: xpositionName, currentJob: xcurrentJob, startMonth: xstartMonth, startYear: xstartYear, endMonth: xendMonth, endYear: xendYear, partyRegion: xpartyRegion, description: xdescription },
					type: "post",
					success: function(html) {
						$('#expListTable').remove();
						$('#expListSection').append(html);
					}
				});
			 }
		});
	} else {
		$( "#userAddExperienceForm" ).slideUp("slow");
	}
});

$(function() {
  $('.editExpCallAjax').click(function() {
	  var ajaxLoading=false;

	  if(!ajaxLoading) {
			 ajaxLoading = true;
			 var expEdit=$(this).parents('td').find('#userExpEdit');

			 var xpartyRelationshipId =   $(this).find('#partyRelationshipId').val();
			 $(this).parents('td').find('#userExpDetail').css('display', 'none');
			 //alert("$(this).parents('td').find('#userExpDetail').css('display', 'none')");

				 $.ajax({
						url: "userEditExperience",
						data: {partyRelationshipId: xpartyRelationshipId },
						type: "post",
						success: function(html) {
							$(expEdit).empty();
							$(expEdit).append(html);
							//add button function
//
//							$('input[name=currentJob]').click(function(){
//
//								var concurrent = $(this);
//								var checkedVal = $(this).attr("checked");
//								var selectMonth = $(this).parent().parent().parent().find('select[name=endMonth]');
//								var endExp     = $(selectMonth).parent().parent();
//
//								console.log("checkedVal :"+checkedVal)
//								// Declare Ready
//								if (checkedVal == 1) {
//								  $(endExp).hide();
//								}
//								else {
//								  $(endExp).show();
//								}
//
//								// Declare Changes
//								$(concurrent).on('change', function(){
//								  // console.log($('input[name=currentJob]:checked').val());
//								  if (checkedVal == 1) {
//								    $(endExp).slideUp();
//								  }
//								  else {
//								    $(endExp).slideDown();
//								  }
//								});
//
//							});

							$('.cancelEditExperience').click(function(){

								var expEdit=$(this).parents('#userExpEdit');
								var userExpDetail=$(this).parents('td').find('#userExpDetail');

							 	 $(expEdit).empty();
							 	 $(userExpDetail).css('display', 'block');
								 //alert('cancel edit');
							});

							$(".saveEditExperience").click(function(){
								var ajaxLoading=false;

								var expEdit=$(this).parents('#userExpEdit');
								var userExpDetail=$(this).parents('td').find('#userExpDetail');
								var userExpForm=$(userExpDetail).children('#frmExpEdit').children('.editExpCallAjax');

								 $(expEdit).empty();
								 $(userExpDetail).css('display','block');

									var xpartyIdToName = $(this).parent().find("#partyIdToName").val();
									var xpositionName = $(this).parent().find("#positionName").val();
									var xcurrentJob = $(this).parent().find('input[name="currentJob"]:checked').val();
									var xstartMonth = $(this).parent().find('select[name="startMonth"]').val();
									var xstartYear = $(this).parent().find('select[name="startYear"]').val();
									var xendMonth = $(this).parent().find('select[name="endMonth"]').val();
									var xendYear = $(this).parent().find('select[name="endYear"]').val();
									var xpartyRegion = $(this).parent().find("#partyRegion").val();
									var xdescription = $(this).parent().find("#description").val();
									var xpartyRelationshipId = $(this).parent().find("#partyRelationshipId").val();
									var startWork="";

									var month = new Array();
									month[0] = "";
									month[1] = "Januari";
									month[2] = "Februari";
									month[3] = "Maret";
									month[4] = "April";
									month[5] = "Mei";
									month[6] = "Juni";
									month[7] = "Juli";
									month[8] = "Agustus";
									month[9] = "September";
									month[10] = "Oktober";
									month[11] = "November";
									month[12] = "Desember";

									if(xstartMonth!="empty"){
										startWork=month[parseInt(xstartMonth)];
									}

									if (xstartYear!="empty"){
										startWork=startWork+ " " +xstartYear;
									}

									if (xcurrentJob==2){
										if (xendMonth!="empty" && xendYear!="empty"){
											startWork=startWork+ " - " +month[parseInt(xendMonth)]+" " +xendYear;
										}
									}

								if(!ajaxLoading) {
									 ajaxLoading = true;
									$.ajax({
										url: "userUpdateExperience",
										data: {partyRelationshipId: xpartyRelationshipId, partyIdToName: xpartyIdToName, positionName: xpositionName, currentJob: xcurrentJob, startMonth: xstartMonth, startYear: xstartYear, endMonth: xendMonth, endYear: xendYear, partyRegion: xpartyRegion, description: xdescription },
										type: "post",
										success: function(html) {

											$(userExpForm).find('#companyExp').text(xpartyIdToName);
											$(userExpForm).find('#positionExp').text(xpositionName);
											$(userExpForm).find('#periodExp').text(startWork);
											$(userExpForm).find('#regionExp').text(xpartyRegion);

										}
									});
								 }
							});


						}
					});

	  }//ajax loading

  });

});


$(function(){
	var concurrent = $('input[name=currentJob]');
	var endExp     = $('select[name=endMonth]').parent().parent();

	// Declare Ready
	if ($('#yes:checked').val() == 1) {
	  $(endExp).hide();
	}
	else {
	  $(endExp).show();
	}

	// Declare Changes
	$(concurrent).on('change', function(){
	  // console.log($('input[name=currentJob]:checked').val());
	  if ($('#yes:checked').val() == 1) {
	    $(endExp).slideUp();
	  }
	  else {
	    $(endExp).slideDown();
	  }
	});

});


// nailthumb
jQuery(document).ready(function() {
    jQuery('.nailthumb-container').nailthumb({width:100,height:100,fitDirection:'top right'});

    jQuery('.nailthumb-container1').nailthumb({width:100,height:100,method:'crop',fitDirection:'top left'});

    jQuery('.nailthumb-container2').nailthumb({width:75,height:75,method:'crop',fitDirection:'center center'});
});



// wheel button
/*
$(".wheel-button").wheelmenu({
        animation: "fly",
        animationSpeed: "medium",
    angle: "all"
});
*/

//upload page
function loadImageFile() {
      if (document.getElementById("uploadfile").files.length === 0)
          return;
      var e = document.getElementById("uploadfile").files[0];
      if (!rFilter.test(e.type)) {
          return
      }
      oFReader.readAsDataURL(e)
  }
  // Rotator
  var angleRot = 0, imgRot = $('.cropMain');
  $(".rotator").click(function() {
    imgRot.removeClass("rotate"+angleRot);
    angleRot = (angleRot+90)%360;
    imgRot.addClass("rotate"+angleRot);
  });
  // Cropper
  var one = new CROP;
  one.init(".default");
  one.loadImg("style/images/beach.jpg");
  $("#getCropVal").on("click", function() {
      $("canvas").remove();
      $(".output").remove();
      $(".default").after('<canvas width="240" height="240" id="canvas" style="display: none;"/>');
      var v = document.getElementById("canvas");
      var e = v.getContext("2d"), t = new Image, n = coordinates(one).w, r = coordinates(one).h, i = coordinates(one).x, s = coordinates(one).y, o = 240, u = 240;
      t.src = coordinates(one).image;
      t.onload = function() {
          e.clearRect(0,0,canvas.width,canvas.height);
          e.drawImage(t, i, s, n, r, 0, 0, o, u);
          e.save();
          e.translate(v.width/2,v.height/2);
          e.rotate(angleRot*Math.PI/180);
          e.drawImage(v,-v.width/2,-v.width/2);
          e.restore();
          dataUrl  = document.getElementById('canvas').toDataURL(),
          imageFoo = document.getElementById('getDatas');
          imageFoo.value = dataUrl;
          $('#canvasImage').submit();
      }
  });
  $("body").on("click", ".newupload", function() {
      $(".uploadfile").click()
  });
  $("body").change(".uploadfile", function() {
      loadImageFile();
      $(".uploadfile").wrap("<form>").closest("form").get(0).reset();
      $(".uploadfile").unwrap()
  });
  oFReader = new FileReader, rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  oFReader.onload = function(e) {
      $(".example").html('<div class="default"><div class="cropMain"></div><div class="cropSlider"></div></div>');
      one = new CROP;
      one.init(".default");
      one.loadImg(e.target.result);
      // Set Angle To Zero
      angleRot = 0;
      imgRot = $('.cropMain');
  }




//pagination
 $('.content-wrapper').infinitescroll({
		navSelector  	: "#next:last",
		nextSelector 	: "a#next:last",
		itemSelector 	: ".content-wrapper",
		debug		 	: true,
		//dataType	 	: 'html',
		//maxPage         : 3,
//		prefill			: true,
//		path: ["http://nuvique/infinite-scroll/test/index", ".html"]
		path: function(index) {
			return "profile";
			//return "userGetProfessionalDirectory" + index ;
		}
		// behavior		: 'twitter',
		// appendCallback	: false, // USE FOR PREPENDING
		// pathParse     	: function( pathStr, nextPage ){ return pathStr.replace('2', nextPage ); }
 }, function(newElements, data, url){
 	//USE FOR PREPENDING
 	// $(newElements).css('background-color','#ffef00');
 	// $(this).prepend(newElements);
 	//
 	//END OF PREPENDING

// 	window.console && console.log('context: ',this);
// 	window.console && console.log('returned: ', newElements);

 });

