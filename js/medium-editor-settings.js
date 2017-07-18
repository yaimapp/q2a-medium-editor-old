var editor = new MediumEditor('#^fieldname', {
    placeholder: {
        text: '^placeholder',
        hydOnClick: true
    },
    paste: {
        forcePlainText: true,
    },
    spellcheck: false,
    toolbar: false,
});
$(function() {
    $('#^fieldname').mediumInsert({
        editor: editor,
        addons: {
            images: false,
            images2: {
                preview: false,
                captions: false,
                fileUploadOptions: {
                    url: '^site_urlmedium-editor-upload',
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    maxFileSize: ^max_image_filesize
                },
                messages: {
                    acceptFileTypesError: '^image_type_error',
                    maxFileSizeError: '^image_size_error',
                    mdlThemeDialog: ^is_mdl
                }
            },
            videos: {
                actions: {
                    remove: {
                        label: '<span class="fa fa-times"></span>',
                        clicked: function () {
                            var $event = $.Event('keydown');

                            $event.which = 8;
                            $(document).trigger($event);
                        }
                    }
                },
            },
            embeds: false,
            embeds2: {
                styles: null,
                placeholder: '^embed_placeholder',
            },
        },
    });
});
