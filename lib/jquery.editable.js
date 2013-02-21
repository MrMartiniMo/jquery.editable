/**
 * Editable 1.0
 *
 * Very simple edit in place plugin for jQuery.
 *
 * Copyright (c) 2013 Moritz Krause (moritz.krause@winice.de); Licensed MIT
 */

(function ($) {
    'use strict';
    $.fn.editable = function (options) {
        var default_settings = {
            type: 'text',
            default_text: '(Click here to edit)',
            background: 'transparent',
            background_hover: '#efefef',
            cursor: "pointer"
        };

        var settings = $.extend({}, default_settings, options);

        function Editable($this) {
            var input = null;
            var content = "";

            var out = {
                init: function () {
                    // set Cursor
                    $this.css('cursor', settings.cursor);
                    // set default text
                    this.setDefaultText();
                    // set default background
                    this.hideHoverEffect();
                    // add click and hover events
                    this.addEvents();
                },
                setDefaultText: function () {
                    if ($this.html() === '') {
                        // set value to default text if empty
                        $this.html(settings.default_text);
                        content = "";
                    } else {
                        // set content to current value
                        content = $this.html();
                    }
                },
                addEvents: function () {
                    var that = this;
                    // set click and hover events
                    $this.bind('click.editable', function () { that.openEditor(); });
                    $this.bind('mouseenter.editable', function () { that.showHoverEffect(); });
                    $this.bind('mouseleave.editable', function () { that.hideHoverEffect(); });
                },
                removeEvents: function () {
                    // remove all events
                    $this.unbind('.editable');
                    this.hideHoverEffect();
                },
                showHoverEffect: function () {
                    // change background color
                    $this.css('background-color', settings.background_hover);
                },
                hideHoverEffect: function () {
                    // change background color
                    $this.css('background-color', settings.background);
                },
                openEditor: function () {
                    // remove all events
                    this.removeEvents();
                    // create and show input
                    this.showInput();
                },
                showInput: function () {
                    // remove all elements
                    $this.empty();
                    // create input and set text to current content
                    if (settings.type === 'textarea') {
                        input = $('<textarea class="input"/>').val(content);
                    }  else {
                        input = $('<input class="input" type="text"/>').val(content);
                        this.addKeyReturnEvent();
                    }
                    this.addKeyEscapeEvent();
                    this.addBlurEvent();

                    // append input
                    $this.append(input);
                    // select input text
                    input.select();
                },
                addKeyReturnEvent: function () {
                    var that = this;
                    // set key-event
                    input.keyup(function (e) {
                        if (e.which === 13) {
                            // Return
                            that.updateContent();
                            that.closeEditor();
                        }
                    });
                },
                addKeyEscapeEvent: function () {
                    var that = this;
                    // set key-event
                    input.keyup(function (e) {
                        if (e.which === 27) {
                            // Escape
                            that.closeEditor();
                        }
                    });
                },
                addBlurEvent: function () {
                    var that = this;
                    // set on blur event
                    input.on('blur', function () {
                        that.updateContent();
                        that.closeEditor();
                    });
                },
                updateContent: function () {
                    // update content to current value
                    content = $this.find('.input').val();
                },
                closeEditor: function () {
                    // remove all elements
                    $this.empty();
                    // set current content
                    $this.html(content);
                    // add click and hover events
                    this.addEvents();
                }
            };

            return out;
        }

        return this.each(function () {
            var $this = $(this);

            if (!$this.data('editable')) {
                $this.data('editable', true);

                var editable = new Editable($this);
                editable.init();
            }
        });
    };
}(jQuery));