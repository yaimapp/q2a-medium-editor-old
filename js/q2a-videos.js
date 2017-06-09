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
        
        if (this.core.getEditor()) {
            this.core.getEditor()._serializePreVideos = this.core.getEditor().serialize;
            this.core.getEditor().serialize = this.editorSerialize;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Videos.prototype.init = function() {
        
        var $videos = this.$el.find('.medium-insert-videos');
        $videos.attr('contenteditable', false);
        $videos.each(function () {
            if ($(this).find('.medium-insert-videos-overlay').length === 0) {
                $(this).append($('<div />').addClass('medium-insert-videos-overlay'));
            }
        });

        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Videos.prototype.events = function() {
        $(document)
            .on('click', $.proxy(this, 'unselectVideo'))
            .on('keydown', $.proxy(this, 'removeVideo'))
            .on('click', '.medium-insert-embeds-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
            .on('click', '.medium-insert-embeds-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

        this.$el
            .on('click', '.medium-insert-videos', $.proxy(this, 'selectVideo'))
            .on('click', '.medium-insert-videos-overlay', $.proxy(this, 'clickVideo'))
    };

    Videos.prototype.editorSerialize = function() {
        var data = this._serializePreVideos();
        
        $.each(data, function(key) {
            var $data = $('<div />').html(data[key].value);
            
            $data.find('.medium-insert-videos').removeAttr('contenteditable');
            $data.find('.medium-insert-videos-overlay').remove();
            
            data[key].value = $data.html();
        });
        
        return data;
    }

    Videos.prototype.selectVideo = function(e) {

        var that = this,
            $video;
            $video= $(e.target).hasClass('medium-insert-videos') ? $(e.target) : $(e.target).closest('.medium-insert-videos');
            $video.addClass('medium-insert-image-active');
      }

    Videos.prototype.clickVideo = function(e) {

        var that = this,
            $video;
        if (this.core.options.enabled) {
            $video = $(e.target).hasClass('medium-insert-videos') ? $(e.target) : $(e.target).closest('.medium-insert-videos');
            
            $video.addClass('medium-insert-videos-selected');
            
            setTimeout(function() {
                that.addToolbar();
                
                if (that.options.captions) {
                    taht.core.addCaption($video.find('figure'), that.captions.captionPlaceholder);
                }
            })
        }
    }

    Videos.prototype.addToolbar = function () {
        var $video = this.$el.find('.medium-insert-videos-selected'),
            active = false,
            $toolbar, $toolbar2, mediumEditor, toolbarContainer;

        if ($video.length === 0) {
            return;
        }

        mediumEditor = this.core.getEditor();
        toolbarContainer = mediumEditor.options.elementsContainer || 'body';

        $(toolbarContainer).append(this.templates['src/js/templates/embeds-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions
        }).trim());

        $toolbar = $('.medium-embeds-videos-toolbar');
        $toolbar2 = $('.medium-embeds-videos-toolbar2');

        $toolbar.find('button').each(function () {
            if ($video.hasClass('medium-insert-videos-' + $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }

        this.repositionToolbars();
        $toolbar.fadeIn();
        $toolbar2.fadeIn();
    };

    Videos.prototype.repositionToolbars = function () {
        var $toolbar = $('.medium-insert-embeds-toolbar'),
            $toolbar2 = $('.medium-insert-embeds-toolbar2'),
            $embed = this.$el.find('.medium-insert-videos-selected'),
            elementsContainer = this.core.getEditor().options.elementsContainer,
            elementsContainerAbsolute = ['absolute', 'fixed'].indexOf(window.getComputedStyle(elementsContainer).getPropertyValue('position')) > -1,
            elementsContainerBoundary = elementsContainerAbsolute ? elementsContainer.getBoundingClientRect() : null,
            containerWidth = $(window).width(),
            position = {};

        if ($toolbar2.length) {
            position.top = $embed.offset().top + 2; // 2px - distance from a border
            position.left = $embed.offset().left + $embed.width() - $toolbar2.width() - 4; // 4px - distance from a border

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
                containerWidth = $(elementsContainer).width();
            }

            if (position.left + $toolbar2.width() > containerWidth) {
                position.left = containerWidth - $toolbar2.width();
            }

            $toolbar2.css(position);
        }

        if ($toolbar.length) {
            position.left = $embed.offset().left + $embed.width() / 2 - $toolbar.width() / 2;
            position.top = $embed.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an embed outset, 5px - distance from an embed

            if (elementsContainerAbsolute) {
                position.top += elementsContainer.scrollTop - elementsContainerBoundary.top;
                position.left -= elementsContainerBoundary.left;
            }

            if (position.top < 0) {
                position.top = 0;
            }

            $toolbar.css(position);
        }
    };

    /**
     * Unselect selected video
     *
     * @param {Event} e
     * @returns {void}
     */

    Videos.prototype.unselectVideo = function (e) {
        var $el = $(e.target).hasClass('medium-insert-videos') ? $(e.target) : $(e.target).closest('.medium-insert-videos'),
            $video = this.$el.find('.medium-insert-videos-selected');

        if ($el.hasClass('medium-insert-videos-selected')) {
            $embed.not($el).removeClass('medium-insert-videos-selected');
            $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
            this.core.removeCaptions($el.find('figcaption'));

            if ($(e.target).is('.medium-insert-caption-placeholder') || $(e.target).is('figcaption')) {
                $el.removeClass('medium-insert-videos-selected');
                this.core.removeCaptionPlaceholder($el.find('figure'));
            }
            return;
        }

        $video.removeClass('medium-insert-videos-selected');
        $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

        if ($(e.target).is('.medium-insert-caption-placeholder')) {
            this.core.removeCaptionPlaceholder($el.find('figure'));
        } else if ($(e.target).is('figcaption') === false) {
            this.core.removeCaptions();
        }
    };

    /**
     * Remove Video
     *
     * @param {Event} e
     * @returns {void}
     */

    Videos.prototype.removeVideo = function (e) {
        var $video, $empty;

        if (e.which === 8 || e.which === 46) {
            $video = this.$el.find('.medium-insert-videos-selected');

            if ($video.length) {
                e.preventDefault();

                $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

                $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                $video.before($empty);
                $video.remove();

                // Hide addons
                this.core.hideAddons();

                this.core.moveCaret($empty);
                this.core.triggerInput();
            }
        }
    };
    
    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */
    Videos.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $vido = this.$el.find('.medium-insert-videos-selected'),
            that = this;
        
        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('memedium-editor-button-active');
        
        $lis.find('button').each(function () {
            var className = 'medium-insert-videos-' + $(this).data('action');
            
            if ($(this).hasClass('medium-editor-button-active')) {
                $video.addClass(className);
                
                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($video);
                }
            } else {
                $video.removeClass(className);
                
                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($video);
                }
            }
        });
        
        this.core.triggerInput();
    }

    /**
     * Fires toolbar2 action
     * 
     * @param {Event} e
     * @returns {void}
     */

    Videos.prototype.toolbar2Action = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            callback = this.options.actions[$button.data('action')].clicked;
        
        if (callback) {
            callback(this.$el.find('.medium-insert-videos-selected'));
        }
        
        this.core.triggerInput();
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
        var videoDialog = document.querySelector('#video-dialog');
        videoDialog.showModal();
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
