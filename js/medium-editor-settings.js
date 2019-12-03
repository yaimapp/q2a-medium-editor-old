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
    autoLink: false
});
$(function() {
    $('#^fieldname').mediumInsert({
        editor: editor,
        addons: {
            images: false,
            images2: ^imagesoption,
            videos: ^videosoption,
            embeds: false,
            embeds2: {
                styles: null,
                placeholder: '^embed_placeholder',
            },
        },
    });
});
