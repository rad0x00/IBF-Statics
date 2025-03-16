 /**
  * =====================================
  * Main.js
  * =====================================
  * main file for js
  * =====================================
  */

var templateUrl  = $('body').data('directory-uri');
$(document).ready(function() {

  /** Header sub menu
   * ===================================== */
    $('#header .sub-menu .menu-item-has-children').append('<i class="fa fa-caret-down desktop-caret" aria-hidden="true"></i>');
    $('#header .primary-menu .sub-menu .menu-item-has-children').on('click','.fa',function() {
        var $this = $(this);
        var $parent = $this.closest('.menu-item-has-children');
        if($parent.hasClass('is-active')) {
            $parent.removeClass('is-active');
            $parent.find('.sub-menu').slideUp();
        } else {
            $parent.addClass('is-active');
            $parent.find('.sub-menu').slideDown();
        }
    });

  /** function Called
   * ===================================== */
    scrollAnimate();
    offcanvas_menu();
    setFooterMenu();
    getMediaDuration();
    iOS_CaretBug();
    $('a[data-rel^=lightcase]').lightcase();
    $(document).bind('gform_post_render', function(){
        // if( $('.gfield_radio li .input-label-wrapper').length == 0 && $('.gfield_checkbox li .input-label-wrapper').length == 0 ) {
        //     $('.gfield_radio li input, .gfield_checkbox li input').wrap('<div class="input-label-wrapper"></div>');
        //     $('.gfield_radio li label, .gfield_checkbox li label').wrap('<div class="input-label-wrapper"></div>');
        // }
        $('#field_1_5 .ginput_container_select').append('<i class="fa fa-angle-down" aria-hidden="true"></i>');
        $('.cs-select .ginput_container_select').append('<i class="fa fa-angle-down" aria-hidden="true"></i>');
        $('.datetimepicker-js input').datetimepicker({
            timepicker: false,
            format:'d-m-Y'
        });
    });

  /** To top
   * ===================================== */
    $(".back-top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-top').fadeIn();
            } else {
                $('.back-top').fadeOut();
            }
        });
        $('.back-top,#search-menu').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

    $('.back-top').mouseenter(function() {
        $(this).css({
            'opacity'    :'1',
            'transition' :'0.3s'
        });
    })
    .mouseleave(function() {
        $(this).css({
            'opacity'    :'0.5',
            'transition' :'0.3s'
        });
    });

  /** Mobile Menu
   * ===================================== */
    $('.primary-menu').clone().appendTo('#sidepanel .menu');
    $('#sidepanel .menu').find('.primary-menu').addClass('mobile-menu').removeClass('hidden');
    $('#sidepanel .mobile-menu li').each(function() {
        if( $(this).hasClass('menu-item-has-children') ) {
            $(this).append('<span class="sub-ctrl-arrow sub-ctrl"><i class="fa fa-caret-down" aria-hidden="true"></i></span>');
        } else {
            $(this).append('<span class="sub-ctrl-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>');
        }
    });
    $('#sidepanel .mobile-menu .desktop-caret').detach();
    $('#sidepanel').on('click','.sub-ctrl',function() {
        if( $(this).hasClass('active')) {
            $(this).removeClass('active').prev('.sub-menu').slideUp();
            $(this).find('.fa').removeClass('fa-caret-up').addClass('fa-caret-down');
        } else {
            $(this).addClass('active').prev('.sub-menu').slideDown();
            $(this).find('.fa').removeClass('fa-caret-down').addClass('fa-caret-up');
        }
    });

  /** Faq Accordion
   * ===================================== */
  var allPanels = $('.faq-accordion .faq-answer').hide();
  $('.faq-accordion .faq-question').on('click','h2',function() {
    // allPanels.slideUp();
    if( $(this).hasClass('active') ) {
        $(this).removeClass('active');
        $(this).closest('.faq-question').next().slideUp();
    } else {
        $(this).addClass('active');
        $(this).closest('.faq-question').next().slideDown();
    }
    return false;
  });

  /** Window Scroll
   * ================================== */
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
    });

  /** Window Bind
   * ================================= */
    $(window).bind("scroll", function () {
        if ($(this).scrollTop() > 320) {
            $(".to-top-jquery").fadeIn();
        } else {
            $(".to-top-jquery").stop().fadeOut();
        }
    });

  /** Window on resize
   * =================================== */
    var resizeTimer;
    $(window).on('resize', function() {
        sidebarAffix();
        headerAnimate();
        setFooterMenu();
        getMediaDuration();
        iOS_CaretBug();
        if ( $(window).width() > 1200 ) {
            $('#header .menu-bar').removeClass('active');
            $('.offcanvas-menu').removeClass('active');
        }
        /** Run code after resize
        * ===================================== */
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            sidebarAffix();
            headerAnimate();
            $('.offcanvas-menu').css('padding-top', $('#header').outerHeight());
        }, 1000);
    }).resize();

  /** Window Load
   * ===================================== */
    $(window).load(function() {
        $('.cs-slider').css('visibility','visible');
        $('#side-bar .sidebar-menu li').find('.toggle-menu.open').remove();
        /* FUNCTIONS */
        setTimeout(function(){
            headerAnimate();
        },500);
        setTimeout( function() {
            $('.page-load').fadeOut(600);
        },1000);
    });
});

 /**
  * =====================================
  * Functions
  * =====================================
  */

  /** Header Animation
   * ===================================== */
    function headerAnimate() {
        $('#main').css({
            'padding-bottom':$('#footer').outerHeight(),
        });
        if( !$('.header-fix')[0] ) {
            $('#header').clone(true, true).addClass('header-fix').insertAfter('#sidepanel');
        }
        $('.header-fix').css({
            'position'   : 'fixed',
            'top'        : -$('.header-fix').outerHeight() - 60,
            'transition' : '0.6s',
            'z-index'    :'10',
            'left'       :'0',
            'right'      :'0',
            'width'      :'100%',
        });
        window.addEventListener('scroll', function(e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn  = 150,
            header = document.querySelector("header"),
            heightvalue = $('#wpadminbar').outerHeight() || 0;
            if (distanceY >= shrinkOn) {
                $('.header-fix').css({'top': 0,});
            } else {
                $('.header-fix').css({'top': -$('.header-fix').outerHeight() - 50,});
            }
        });
    }

  /** Animate Scrolling
   * ================================= */
    function scrollAnimate() {
        // $('a[href*=#]:not([href=#])').click(function() {
        //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        //     var target = $(this.hash);
        //     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        //         if (target.length) {
        //             $('html,body').animate({
        //                 scrollTop: target.offset().top - $('.header').outerHeight()
        //             }, 1000);
        //         return false;
        //         }
        //     }
        // });
    }

  /** Sidebar Affix
   * ===================================== */
     function sidebarAffix() {
        var sidebar = $('.page-sidebar'),
            innercontent   = $('.page-content'),
            footer_menu    = $('.footer-menu').outerHeight(),
			faq_section    = $('.pages-faqs').outerHeight(),
            footer_height  = $('#footer').outerHeight(),
            list_height    = $('.footer-contact').outerHeight(),
            header_height  = $('.header-fix').outerHeight(),
            /*bottom_spacing = footer_height + list_height + footer_menu + 30;*/
			bottom_spacing = footer_height + list_height + footer_menu + faq_section + 30;

        if ( Modernizr.mq( '(min-width: 992px)' ) ){
          sidebar.sticky({topSpacing: header_height, bottomSpacing: bottom_spacing});
        } else {
          sidebar.unstick();
        }
    }

    /** Offcanvas Menu
     * ===================================== */
    function offcanvas_menu() {
        $('#header').on('click', '.menu-bar', function() {
            $('#header .menu-bar').toggleClass('active');
            $('.offcanvas-menu').toggleClass('active');
        });
    }

    /** Footer Menu
     * ===================================== */
    function setFooterMenu() {
        if ( Modernizr.mq('(max-width: 992px)') ) {
            $('body .footer-menu').unbind().on('click','.widget-title',function() {
                var $this = $(this),
                    $item = $this.closest('.widget').find('h3').next('div');
                if($this.hasClass('item-is-active')) {
                    $this.removeClass('item-is-active');
                    $item.stop().slideUp();
                } else {
                    $this.addClass('item-is-active');
                    $item.stop().slideDown();
                }
            });
        } else {
            $('body .footer-menu').off( 'click','.widget-title' );
        }
    }

    /** Get Duration
     * ===================================== */
     function getMediaDuration() {
        var objectUrl;
        $(".audio-wrapper").each(function() {
            var $this = $(this);
            $this.find('.the-audio').on("canplaythrough", function(e){
                var seconds    = e.currentTarget.duration;
                var duration   = moment.duration(seconds, "seconds");
                var time       = "";
                var hours      = duration.hours();
                var minutes    = duration.minutes();
                var seconds    = duration.seconds();
                var theHour    = ( hours > 1 ) ? hours + " hours" : hours + " hour" ;
                var theMinute  = ( minutes > 1 ) ? minutes + " minutes" : minutes + " minute" ;
                var theSeconds = ( seconds > 1 ) ? seconds + " seconds" : seconds + " second" ;
                var ht         = ( hours != 0 ) ? theHour : '';
                var mt         = ( minutes != 0 ) ? theMinute : '';
                var st         = ( seconds != 0 ) ? theSeconds : '';
                time = ht + mt + st;
                $(this).next('.audio-duration').html('<i class="fa fa-play-circle"></i> '+ time );
                URL.revokeObjectURL(objectUrl);
            });
        })
     }

    // Detect ios 11_x_x affected
    // NEED TO BE UPDATED if new versions are affected
    function iOS_CaretBug() {

       var ua = navigator.userAgent,
       scrollTopPosition,
       iOS = /iPad|iPhone|iPod/.test(ua),
       iOS11 = /OS 11_0|OS 11_1|OS 11_2/.test(ua);

       // ios 11 bug caret position
       if ( iOS && iOS11 ) {

           $(document.body).on('show.bs.modal', function(e) {
               if ( $(e.target).hasClass('inputModal') ) {
                   // Get scroll position before moving top
                   scrollTopPosition = $(document).scrollTop();

                   // Add CSS to body "position: fixed"
                   $("body").addClass("iosBugFixCaret");
               }
           });

           $(document.body).on('hide.bs.modal', function(e) {
               if ( $(e.target).hasClass('inputModal') ) {
                   // Remove CSS to body "position: fixed"
                   $("body").removeClass("iosBugFixCaret");

                   //Go back to initial position in document
                   $(document).scrollTop(scrollTopPosition);
               }
           });
       }
    }