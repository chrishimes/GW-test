$(document).ready(function () {
  var modules = {
    "home_li": "landing",
    "demo_li": "demo_container",
    "modules_li": "training_modules",
    "platform_li": "cross_platform",
    "tests_li": "quiz_and_test",
    "analytics_li": "reports_and_analytics",
    "contact_li": "contact_us"
  };

  $("li").click(function (e) {
    var id = modules[e.target.id];
    console.log(id);
    $("html, body").animate({
      scrollTop: $("#" + id).offset().top
    }, 500);
  });

  $("#demo_button").click(function (e) {
    $("html, body").animate({
      scrollTop: $("#contact_us").offset().top
    });
  });

  var $landingElem = $("#landing");
  $(window).on("resize, load", function () {
    var ratio = $landingElem[0].clientWidth / $landingElem[0].clientHeight;
    if (ratio < 1.5) {
      $landingElem.css("background-size", "auto 100%");
    } else {
      $landingElem.css("background-size", "100% auto");
    }
    console.log($landingElem[0].clientHeight);
  });

  $sidebar = $("#sidebar");

  $("#hamburger").click(function () {
    if (/-/g.test($sidebar.css("left"))) {
      $sidebar.animate({
        left: "0%"
      });
    }
  });

  $("*").click(function () {
    if ($sidebar.css("left") == "0px") {
      $sidebar.animate({
        left: "-50%"
      });
    }
  });

  $("input, textarea").on("click, input", function (i) {
    if ($(this).val().length > 0)
      $(this).addClass("white-important");
    else
      $(this).removeClass("white-important");
  });

  $("form button").click(function () {
    var INFO = {
      name: $("#name_input").val(),
      email: $("#email_input").val(),
      comment: $("#comment_input").val()
    };
    var $error = $("#error"), errors = [];

    $error.html("");

    for (var x in INFO) {
      if (INFO[x].length === 0) {
        errors.push(x);
      }
    }

    if (errors.length > 0) {
      if (errors.length === 1) {
        $error.html("Please enter a valid " + errors[0] + ".");
      } else if (errors.length === 2) {
        $error.html("Please enter a valid " + errors[0] + " and " + errors[1] + ".");
      } else if (errors.length === 3) {
        $error.html ("Please enter a valid " + errors[0] + ", " + errors[1] + ", and " + errors[2] + ".");
      }
    } else {
      $error.html("Sending email...");
      $.ajax({
        type: "POST",
        url: "php/email.php",
        data: {
          name: INFO.name,
          email: INFO.email,
          comment: INFO.comment
        },
        success: function (data) {
          $error.html(data);
        },
        error: function (data) {
        },
        dataType: "html"
      });
    }
  });
});
