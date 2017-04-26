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
