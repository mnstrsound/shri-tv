$(document).ready(function () {
    (function () {
        var counter;
        $('.program__inner').hover(function (e) {
            var $el = $(this);
            var $desc = $el.find('.program__desc');
            if (counter) clearTimeout(counter);
            if ($el.offset().top - $(window).scrollTop() - $desc.outerHeight() / 2 < 0) {
                if ($(window).scrollTop() > 0) {
                    $desc.css({top: $(window).scrollTop() - $el.offset().top + 10});
                } else {
                    $desc.css({top: 0});
                }
            }
            else {
                if ($el.offset().top - $(window).scrollTop() + ($desc.outerHeight() / 2) > $(window).outerHeight()) {
                    $desc.css({top: -($el.offset().top - $(window).scrollTop() - $(window).outerHeight() + $desc.outerHeight() + 10)});
                } else {
                    $desc.css({top: -$desc.outerHeight() / 2});
                }
            }

            if ($el.offset().left + $el.outerWidth() + parseInt($desc.css('width')) > $(document).outerWidth()) $desc.css({right: '100%'});
            else $desc.css({left: '100%'});
            console.log($el.offset().left, $el.outerWidth(), $desc.outerWidth());
            console.log($(document).outerWidth());

            counter = setTimeout(function () {
                $desc.fadeIn();
            }, .3 * 1000);
        }, function () {
            clearTimeout(counter);
            var $el = $(this);
            var $desc = $el.find('.program__desc');
            $desc.fadeOut(300, function () {
                var $desc = $el.find('.program__desc');
            });
        });
    })();

    (function () {
        var today = new Date();
        var dayOfWeek = today.getDay() - 1;
        if (dayOfWeek < 0) dayOfWeek = 6;
        $('.channels__row').eq(dayOfWeek).addClass('channels__row--visible');
        $('.week__day').eq(dayOfWeek).addClass('week__day--selected')
        $('.week__day').click(function () {
            var $day = $(this);
            var index = $day.index();
            showDayProgram(index);
        });
        $('.week__next-day').click(function () {
            var index = $('.week__day--selected').index();
            if (index == 6) index = -1;
            showDayProgram(index + 1)
        });
        function showDayProgram(index) {
            $('.channels__row--visible').removeClass('channels__row--visible');
            $('.week__day--selected').removeClass('week__day--selected');
            $('.channels__row').eq(index).addClass('channels__row--visible');
            $('.week__day').eq(index).addClass('week__day--selected');
        }
    })();

    (function () {
        $('.select-type').change(function () {
            var $checkbox = $(this);
            var type = $checkbox.attr('value');
            if ($checkbox.is(':checked')) {
                $('.channels').find('.program--' + type).addClass('program--selected');
            } else {
                $('.channels').find('.program--' + type).removeClass('program--selected');
            }
        });
    })();

    (function () {
        var $popup = $('.popup');
        var $popupIframe = $popup.find('.popup__iframe');
        var $iframe;
        $('.popup').click(function (e) {
            $(document.body).append($iframe);
            $popup.removeClass('popup--visible');
        });
        $('.popup__iframe').click(function (e) {
            e.stopPropagation();
        });
        $('.channel__watch').find('a').click(function (e) {
            e.preventDefault();
            var $btn = $(this);
            $iframe = $($btn.attr('href'));
            console.log($iframe);
            $popupIframe.append($iframe);
            $popup.addClass('popup--visible');
        })
    })();

var channels = [];
$('.tv-channel').each(function () {
    var $channel = $(this);
    var channel = {};
    channel.name = $channel.find('.tv-channel-title__text').text();
    channel.programs = [];
    channel.logo = $channel.find('.b-tv-image__picture').css('background-image');
    $channel.find('.tv-channel-events__item').each(function () {
        var $program = $(this);
        var program = {};
        program.time = $program.find('.tv-event__time-text').text();
        program.name = $program.find('.tv-event__title-inner').text();
        channel.programs.push(program);
        var bem = JSON.parse($program.find('.tv-event').attr('data-bem'));
        program.genre = {};
        program.genre.name = bem['tv-event'].genre;
                switch (program.genre.name) {
            case 'сериалы':
                program.genre.key = 'serial';
                break;
            case 'фильмы':
                program.genre.key = 'film';
                break;
            case 'спорт':
                program.genre.key = 'sport';
                break;
            default:
                program.genre.key = 'other';
                break;
        }

    });
    channels.push(channel);
});
console.log(JSON.stringify(channels));


});