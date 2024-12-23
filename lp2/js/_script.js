//import

//iOS hover
document.addEventListener('touchstart', function () {}, true);

/****************

jQuery Document.

****************/
(function ($) {

    const kv = $('#fwh-fv');
    const body = $('body');
    const header = $('#fwh-header');

    //headerHight
    let headerHight = 0;

    function headerHightSet() {
        if (header.length) {
            headerHight = header.outerHeight();
        }
    }
    headerHightSet();

    //kvHightSet
    let kvHight = 0;

    function kvHightSet() {
        if (kv.length) {
            kvHight = kv.outerHeight() + headerHight;
        }
    }
    kvHightSet();

    //$(window).width()
    function windowWidth() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            body.addClass('body_sp');
            body.removeClass('body_pc');
        } else {
            body.addClass('body_pc');
            body.removeClass('body_sp');
        }
    }
    windowWidth();

    //scroll
    $.fn.scroll_btn = function () {
        return $(this).on('click', function () {
            let speed = 800,
                href = $(this).attr("href"),
                target = $(href === "#" || href === "" ? 'html' : href),
                position = target.offset().top;

            if (href !== "#" || href !== "") {
                position = target.length ? target.offset().top - headerHight : '';
            }
            $('body,html').animate({
                scrollTop: position
            }, speed, 'swing');
            return false;
        });
    };
    $('.scroll_btn,.scroll_btns a').scroll_btn();

    //sp menu
    const menu_list = $('#fwh-header_nav_list');
    const sp_menu_btn = $('#fwh-header_nav_btn');
    if (menu_list.length) {
        let menu_link = menu_list.find('a');
        menu_link.scroll_btn();
        //menu_list.css('top', header.outerHeight() + $(window).width() * .024);

        if (sp_menu_btn.length) {
            sp_menu_btn.on('click', function () {
                $(this).toggleClass('show').find('span').toggleClass('show');
                menu_list.fadeToggle().css('display', 'flex').toggleClass('show');
            });
            if (body.hasClass('body_sp')) {
                menu_link.on('click', function () {
                    setTimeout(function () {
                        sp_menu_btn.removeClass('show').find('span').removeClass('show');
                        menu_list.fadeOut().removeClass('show');
                    }, 800);
                });
            }
        }
    }

    //scrollstop
    let scrollStopEvent = new $.Event("scrollstop");
    let delay = 400;
    let timer;

    function scrollStopEventTrigger() {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            $(window).trigger(scrollStopEvent)
        }, delay);
    }
    $(window).on("scroll resize", scrollStopEventTrigger);
    body.on("touchmove", scrollStopEventTrigger);

    //scroll
    $(window).on('scrollstop load', function () {

        if (body.hasClass('body_scroll')) {
            body.removeClass('body_scroll');
        }

        headerHightSet();
        kvHightSet();
        windowWidth();
        //footerHight();

    }).on('scroll resize touchmove', function () {

        if ($(window).scrollTop() >= kvHight) {
            body.addClass('body_sticky');
        } else {
            body.removeClass('body_sticky');
        }

        body.addClass('body_scroll body_scroll_on');

    });

    //open close
    const toggle_btn = $('.fwh-toggle_btn');
    toggle_btn.each(function () {
        let toggle_panel = $(this).next('.fwh-toggle_panel');
        if (!toggle_panel.length) {
            return;
        }
        toggle_panel.addClass('toggle_js').hide();
        let toggle_this = $(this);

        toggle_this.on('click', function () {
            toggle_panel.slideToggle(240).toggleClass('show');
            toggle_this.toggleClass('show');
        }).addClass('toggle_js');

        let toggle_close = toggle_panel.find('.fwh-toggle_close');
        if (toggle_close.length) {
            toggle_close.on('click', function () {
                toggle_panel.slideUp(240).removeClass('show');
                toggle_this.removeClass('show');
            }).addClass('toggle_js');
        }
    });

    //swiper
    const swiper1 = $('#swiper1');
    if (swiper1.length) {
        if (navigator.userAgent.match(/(msie|MSIE) 10/i) || navigator.userAgent.match(/(T|t)rident\/7\./)) {
            return;
        }
        const swipeOption = {
            autoplay: {
                delay: 4800
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            centeredSlides: true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            loopedSlides: 4,
            speed: 1200,
            slidesPerView: 3
        }
        const mySwiper = new Swiper('#swiper1', swipeOption);
    }

})(jQuery);
