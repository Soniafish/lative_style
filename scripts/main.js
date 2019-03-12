"use strict";

document.addEventListener('DOMContentLoaded', function () {
    $(window).scroll(function () {
        var scrollVal = $(this).scrollTop();
        // console.log(scrollVal);
        if (scrollVal > 10) {
            $("header").addClass("scroll");
        } else {
            $("header").removeClass("scroll");
        }
    });

    $(".js-toggle-trigger").each(function () {

        $(this).click(function (e) {
            e.stopPropagation();
            var target = $(this).data("target");
            console.log(target);
            $("#" + target).toggleClass("active");
        });
    });

    $(".js-submenuTitle").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).parent().find(".js-submenu").removeClass("active");
        } else {
            $(".js-submenuTitle").removeClass("active");
            $(".js-submenuTitle").parent().find(".js-submenu").removeClass("active");
            $(this).addClass("active");
            $(this).parent().find(".js-submenu").addClass("active");
        }
    });

    $('.slick_six').slick({
        slidesToShow: 6,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }]
    });
    $('.slick_five').slick({
        slidesToShow: 5,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2
            }
        }]
    });

});