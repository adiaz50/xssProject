(function ($) {

    $.leanModal = function (element, options) {

        var defaults = {
            top: 100,
            overlay: 0.5,
            closeButton: null,
            callback: function () { },
            closeCallback: function () { },
        }

        var plugin = this;
        plugin.settings = {}
        plugin.overlayId = "lean_overlay";

        var $element = $(element);
        var element = element;

        var showModal = function (modalId) {
            $(modalId).css({
                display: 'block',
                position: 'fixed',
                opacity: 0,
                'z-index': 11000,
                left: 0,
                right: 0,
                top: plugin.settings.top + "px"
            }).fadeTo(200, 1, function () {
                plugin.settings.callback();
            });
            $("body").append("<div id='" + plugin.overlayId + "'></div>");
            $("#" + plugin.overlayId).css(
                { display: 'block', opacity: 0 }).fadeTo(200, plugin.settings.overlay).on("click", function () {
                    hideModal(modalId);
                });
            //console.log("Open: " + modalId);
        }

        var hideModal = function (modalId) {
            $(modalId).css({ 'display': 'none' });
            $("#" + plugin.overlayId).fadeOut(200, function () {
                $(this).remove();
                plugin.settings.closeCallback();
            });
            //console.log("Close: " + modalId);
        }

        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            var modalId = $element.attr("href");

            $element.on("click", function (e) {
                showModal(modalId);
                e.preventDefault();
            });            
    
            /* 
            This could cause problems if there are other events tied to "click" 
            if model is initiated like $(".modal-class").leanModal( ... ) with
            <a href="#modal-id" class="modal-class">1</a>
            <a href="#modal-id" class="modal-class">2</a>
            <a href="#modal-id" class="modal-class">3</a>
            Without the unbind, on modal close the plugin will execute hideModal 3 times
            */
            $(modalId).unbind("click").on("click", ".close-modal", function (e) {
                hideModal(modalId);
                e.preventDefault();
            });           

        }

        plugin.destroy = function () {
            var modalId = $element.attr("href");
            $element.unbind("click");
            $(modalId + " .close-modal").unbind("click");
            $element.removeData();
        }

        plugin.init();

    }

    $.fn.leanModal = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('leanModal')) {
                //console.log("Init Modal: " + $(this).attr("href"));
                var modal = new $.leanModal(this, options);
                $(this).data('leanModal', modal);
            }
        });
    }

})(jQuery);