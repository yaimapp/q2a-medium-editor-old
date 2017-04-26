var editor = new MediumEditor('#^fieldname', {
    placeholder: {
        text: '^placeholder',
        hydOnClick: true
    },
    paste: {
        forcePlainText: true,
    },
    spellcheck: false,
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
                    acceptFileTypesError: 'サポートしていないフォーマットです: ',
                    maxFileSizeError: 'ファイルサイズが大きすぎます\\n ^max_image_filesize_mb MB以下でお願いします: ',
                    mdlThemeDialog: ^is_mdl
                }
            },
            videos: true,
            embeds: false,
            embeds2: {
                styles: null,
                placeholder: '^embed_placeholder',
            },
        },
    });
});

function get_content(name) {
    var editor_elm = document.getElementsByName(name);

    if (editor_elm.length > 0) {
        var target = MediumEditor.getEditorFromElement(editor_elm[0]);
        var allContents = target.serialize();
        var editorId = target.elements[0].id;
        var content = allContents[editorId].value;
        content = content.replace(/<div class=\"video video-youtube\">.*?<\/div>/g, '');
        content = content.replace(/medium-insert-embeds-selected/g, '');
    } else {
        content = '';
    }
    return content;
}
