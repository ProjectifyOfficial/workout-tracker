var popoverTextButton = "Company has DirectApply turned on, so you can apply through FirmPlay.com...then the FirmPlay team refers you if you're a fit.";
$(window).load(function() {
    var signupFormHtml = $('#signup_form').html();
    var onMainSite = $.inArray(location.hostname.split('.')[0],['www','localhost','staging-firmplay']) >= 0;
    var onMainPage = location.pathname.length <= 1;

    // Scroll to #jobs if user clicked See Jobs button on search page
    if(localStorage.getItem("seeJobs") == "true") {
        $('html, body').animate({
            scrollTop: $("#jobs").offset().top - 130
        }, 2000);
        localStorage.setItem("seeJobs",false);
    };

    // Trigger Bootstrao Popover for DA Checbkoxes
    $('[data-toggle="popover-box"]').popover({
        delay: {show: "0", hide: "100"},
        content: popoverTextButton,
        trigger: "hover",
        placement: "right"
    });

    if(onMainSite && onMainPage) {
        var navbar = $('.header');
        var afterNavDivider = $('.after-nav-divider');
        var navDivider = $('.nav-divider');
        var signUpBtn = $('.sign-up-btn');
        var registerBtn = $('.register-btn');
        var breakpoint = 440;
        var time = 1000;
        var transparent = true;

        registerBtn.on('mouseenter', function(){
            $(this).removeClass('clicked');
            $(this).addClass('hover');
        }).on('mousedown keydown', function(){
            $(this).removeClass('hover');
            $(this).addClass('clicked');
        }).on('mouseleave keyup', function(){
            $(this).removeClass('hover');
            $(this).removeClass('clicked');
        });

        $(document).scroll(function(){
            if($(this).scrollTop() >= breakpoint && transparent) {
                navbar.removeClass('transparent', time);
                afterNavDivider.removeClass('hide', time);
                navDivider.removeClass('hide', time);
                signUpBtn.removeClass('hide', time);
                transparent = false;
            } else if($(this).scrollTop() < breakpoint && !transparent) {
                navbar.addClass('transparent', time);
                afterNavDivider.addClass('hide', time);
                navDivider.addClass('hide', time);
                signUpBtn.addClass('hide', time);
                transparent = true;
            };
        });
        $('#signup_link').click(function() {
            $('html, body').animate({
                scrollTop: $("body").offset().top
            }, 300);
            setTimeout(function(){
                $('#user_email_hero').children('input').first().focus();
            }, 500);
        });
    } else {
        $('#signup_link').click(function() {
            modal.open({
                content: signupFormHtml,
                top: 130
            });
        });
    };

    // Control behavior of subnavbar buttons
    $(document).scroll(function(){
        var overview = $("#overview").length > 0 ? $("#overview").offset().top - 300 : 9999;
        var scenes = $("#scenes").length > 0 ? $("#scenes").offset().top - 300 : 9999;
        var jobs = $("#jobs").length > 0 ? $("#jobs").offset().top - 300 : 9999;

        if($(this).scrollTop() > overview) {
            $('#overviewButton').addClass("active-nav");
            $('#behindTheScenesButton').removeClass("active-nav");
            $('#jobsButton').removeClass("active-nav");
        };

        if($(this).scrollTop() > scenes) {
            $('#overviewButton').removeClass("active-nav");
            $('#behindTheScenesButton').addClass("active-nav");
            $('#jobsButton').removeClass("active-nav");
        };

        if($(this).scrollTop() > jobs) {
            $('#overviewButton').removeClass("active-nav");
            $('#behindTheScenesButton').removeClass("active-nav");
            $('#jobsButton').addClass("active-nav");
        };
    });

    $("#overviewButton").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#overview").offset().top - 100
        }, 300);
    });

    $("#behindTheScenesButton").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#scenes").offset().top - 100
        }, 1000);
    });

    $("#jobsButton").click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#jobs").offset().top - 130
        }, 2000);
    });

    // Next and Prev Links on Side
    $('.article-link.prev').on('mouseenter', function(){
        $(this).children('.info').animate({
            left:'0px',
            marginRight:'20px'
        }, 250);
    }).on('mouseleave', function(){
        $(this).children('.info').animate({
            left:'-1000px',
            marginRight:'-700px'
        }, 250);
    });

    $('.article-link.next').on('mouseenter', function(){
        $(this).children('.info').animate({
            right: '0px',
            marginLeft: '20px'
        }, 250);
    }).on('mouseleave', function(){
        $(this).children('.info').animate({
            right: '-1000px',
            marginLeft: '-700px'
        }, 250);
    });

    // Show or hide modals for job cards and signup link
    $('.dropdown-menu').on("click", function(e) {
        e.stopPropagation();
    });

    $(document).click(function(e) {
        if($('.dropdown-menu').find(e.target).length > 0) {
        } else {
            $('.dropdown-menu').hide();
        }
    });

    $('.dropdown-link').on("click", function(e) {
        e.stopPropagation();
        toggleDropdown(e, '#' + $(this).attr('menu'));
    });

    $('.read-more-btn').on('click', function(){
        Intercom('trackEvent', 'clicked-read-more-button');
    });

    setModalToggles();
    toggleButtonState();

    $('#signup_link').on("click", function(){
        toggleButtonState();
    });

    // Rebind above event listeners on DOM change when resuls are updated
    $('.job-openings').bindWithDelay('DOMSubtreeModified', function() {
        // Trigger Bootstrao Popover for DA Checbkoxes
        // Code below doesn't work because it conflicts with other event listeners
        // See Bug #019 on Trello for details.

        // $('[data-toggle="da-apply-btn"]').popover({
        //     delay: {show: "500", hide: "100"},
        //     content: popoverTextButton,
        //     trigger: "hover",
        //     placement: "top"
        // });

        setModalToggles();
        toggleButtonState();

        $('.dropdown-menu').on('click', function(e) {
            e.stopPropagation();
        });

        $('.read-more-btn').on('click', function(){
            Intercom('trackEvent', 'clicked-read-more-button');
        });
    }, 1000);

    $('.jobfunction-filter-button').on('click', function(e){
        $(this).parent().parent().toggleClass('brand-color');
        $(this).children().toggleClass('brand-color-text');
    })
});

$(function() {
    var h = window.location.hash;
    if(h) {
        $('#profileBackButton').attr('href', '/' + h);
        window.location.hash = '';
    }

    $('iframe').each(function() {
        this.src = this.src;
    });

    $('.apply-conf').append('<%= link_to "My Dashboard", user_dashboard_url %>');

    $('.pitch-form').on("ajax:error", function(e, data, status, xhr){
        $(this).append("<div><span>Oops! Looks like you haven't entered an answer - it's required to complete your application!</span></div>");
    });
});

function setModalToggles() {
    setTimeout(function(){
        $('button[menu=apply], button[menu=refer]').on("click", function(e) {
            e.stopPropagation();
            var menu = $(this).siblings();
            compApplyOrReferDropdown(e, menu);
        });
    }, 1000);
}

function toggleDropdown(e, menu) {
    e.stopPropagation();
    var m = $(menu);
    if(!m.is(":visible")) {
        $(menu).show();
    } else {
        $(menu).hide();
    }
};

function compApplyOrReferDropdown(e, menu) {
    e.stopPropagation();
    $('.dropdown-menu').hide();
    menu.toggle();
}

function toggleButtonState() {
    // Toggle button states static/hover/active/clicked
    var buttonsArray = '.j-descrip-button, .see-jobs-btn, #signup_link, .form-submit.input-btn';
    var formSubmitBtn = '.form-submit.input-btn';
    var profileFavBtn = '.fav-btn';
    var actionsToUnbind = 'mouseenter mousedown mouseleave keydown keyup';

    $(buttonsArray).on('mouseenter', function(){
        $(this).removeClass('active');
        $(this).addClass('hover');
    }).on('mousedown keydown', function(){
        $(this).removeClass('hover');
        $(this).addClass('active');
    }).on('mouseleave keyup', function(){
        $(this).removeClass('active');
        $(this).removeClass('hover');
    });

    $(formSubmitBtn).on('mouseenter', function(){
        $(this).removeClass('active');
        $(this).addClass('hover');
    }).on('mousedown keydown', function(){
        $(this).removeClass('hover');
        $(this).addClass('active');
    }).on('mouseleave keyup', function(){
        $(this).removeClass('active');
        $(this).removeClass('hover');
    });

    $(formSubmitBtn).on('click', function(){
        $(this).unbind(actionsToUnbind);
        $(this).removeClass('hover');
        $(this).addClass('active');
    });

    if(location.pathname.length > 1 && !$(profileFavBtn).hasClass('selected')) {
        $(profileFavBtn).on("mouseenter mouseleave", function(){
            $(this).children('i').toggleClass('hover');
        });
    };
}
