$(function () {

    $('#resources ul.tabs li:first a').addClass('active-tab');
    $('.resources-wrapper section').hide();
    $('.resources-wrapper section:first').addClass('active-content');
    $('.resources-wrapper section:first').show();
    $('#resources ul.tabs li a').on('click', function () {
        $('#resources ul.tabs li a').removeClass('active-tab');
        $(this).addClass('active-tab')
        $('.resources-wrapper section').hide();
        $('.resources-wrapper section').removeClass('active-content');
        var activeTab = $(this).attr('href');
        $(activeTab).show();
        $(activeTab).addClass('active-content');
        return false;
    });

    $('#calendar-events ul.tabs li:first a').addClass('active-tab');
    $('#calendar-events ul.tabs li a').on('click', function () {
        $('#calendar-events ul.tabs li a').removeClass('active-tab');
        $(this).addClass('active-tab')
        $('#calendar-events section').hide();
        var activeTab = $(this).attr('href');
        $(activeTab).show();
        $(activeTab).addClass('active-content');
        newsPosition();
        return false;
    });

    function newsPosition() {
        var $calHeight = $('#calendar-events').height();
        var $featHeight = $('#featured-items').height();
        var $newsMargin;
        if (($featHeight < $calHeight) && ($(window).width() > 900)) {
            $newsMargin = $featHeight - $calHeight + 40;
        } 
        else {
            $newsMargin = 30
        }
        $('#news-feed').css("margin-top", $newsMargin + "px")
    }
    newsPosition();

    $(window).resize(function () { newsPosition(); });

    var bound = false;

    // if window size is less than 630px than bind accordion function
    if ($(window).width() <= 630) {
        $('body').addClass('mobile');
        bindAccordion();
    }

    // if window is resized then check the size once more
    $(window).resize(function () {
        if ($(window).width() <= 630) {
            $('body').addClass('mobile');
            bindAccordion();
        }
        else if ($(window).width() > 630) {
            unbindAccordion();
            $('body').removeClass('mobile');
            var li_cat = $('li.category-links');
            $('.panel ul', li_cat).removeAttr('style');
            $('h4', li_cat).removeClass('active-list');
        }
    });

    // bind function 
    function bindAccordion() {
        if (false === bound) {
            $('.mobile li.category-links h4').click(function () {
                accordion(this);
            });
            bound = true;
        }
    }

    //unbind function
    function unbindAccordion() {
        if (true === bound) {
            $('.mobile li.category-links h4').each(function (i, e) {
                $(e).unbind('click');
            });
            bound = false;
        }
    }

    function accordion(elem) {
        $this = $(elem);
        $target = $(".panel ul", $this.parent());
        if ($target.hasClass('open')) {
            $target.removeClass('open').slideUp();
            $this.removeClass('active-list');
            $('li.category-links .panel ul').slideUp(300).removeClass('open');
        }
        else {
            $('li.category-links h4').removeClass('active-list');
            $('li.category-links .panel ul').slideUp(300).removeClass('open');
            $target.addClass('open').slideDown();
            $this.addClass('active-list');
        }
    }

});