;(function($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Videos', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-video-camera"></span>',
        };



    /**
     * Custom Addon object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Videos(el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_' + pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Videos.prototype.init = function() {
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Videos.prototype.events = function() {
        this.$el
            .on('click', '.medium-insert-videos', $.proxy(this, 'selectVideo'))
    };


    Videos.prototype.selectVideo = function(e) {

        var that = this,
            $video;
            $video= $(e.target).hasClass('medium-insert-videos') ? $(e.target) : $(e.target).closest('.medium-insert-videos');
            $video.addClass('medium-insert-image-active');
      }

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Videos.prototype.getCore = function() {
        return this.core;
    };

    /**
     * Add custom content
     *
     * This function is called when user click on the addon's icon
     *
     * @return {void}
     */

    Videos.prototype.add = function() {
        var $place = this.$el.find('.medium-insert-active');
        if ($place.is('p')) { // replace p to div because p cannot have children
            $place.replaceWith('<div class="medium-insert-active">' + $place.html() + '</div>');
            $place = this.$el.find('.medium-insert-active');
            if ($place.next().is('p')) {
                this.core.moveCaret($place.next());
            } else {
                $place.after('<p><br></p>'); // add empty paragraph so we can move the caret to the next line.
                this.core.moveCaret($place.next());
            }
        }

        $place.addClass('medium-insert-videos');
      /*
        var videoDialog = document.querySelector('#video-dialog');
        videoDialog.showModal();
        */
        var uploadedData = {};
        uploadedData['image_thumb'] =  'https://s3-ap-northeast-1.amazonaws.com/test.transloadit.38qa.net/71349b002a5111e79a838156ee3fb127/image_thumb.jpg';
        uploadedData['video_mp4'] = 'https://s3-ap-northeast-1.amazonaws.com/test.transloadit.38qa.net/71349b002a5111e79a838156ee3fb127/video_mp4.mp4';
        uploadedData['video_webm'] = 'https://s3-ap-northeast-1.amazonaws.com/test.transloadit.38qa.net/71349b002a5111e79a838156ee3fb127/video_webm.webm';

        $('.medium-editor-insert-plugin .medium-insert-videos').html(
          '<figure><video class="video-js" controls preload="auto" width="640" poster="' + uploadedData['image_thumb'] + '" data-setup="{}">' +
          '<source id="mp4-source" type="video/mp4" src="' + uploadedData['video_mp4'] + '">' +
          '<source id="webm-source" src="' + uploadedData['video_webm'] + '" type="video/webm">' +
          '</video>' +
          '<div class="video-transloadit-id">[uploaded-video="71349b002a5111e79a838156ee3fb127"]</div><figure>'
        );




        this.core.hideButtons();
    };


    /** Addon initialization */

    $.fn[pluginName + addonName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Videos(this, options));
            }
        });
    };
})(jQuery, window, document);
