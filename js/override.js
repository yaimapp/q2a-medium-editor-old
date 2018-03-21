function get_content(name) {
    var editor_elm = document.getElementsByName(name);

    if (editor_elm.length > 0) {
        var target = MediumEditor.getEditorFromElement(editor_elm[0]);
        var allContents = target.serialize();
        var editorId = target.elements[0].id;
        var tmp1 = allContents[editorId].value;
        var tmp2 = tmp1.replace(/<div class=\"video video-youtube\">.*?<\/div>/g, '');
        var tmp3 = tmp2.replace(/medium-insert-embeds-selected/g, '');
        var content = tmp3.replace(/<div class="medium-insert-buttons".*>[\s\S]*<\/div>/m, '');
    } else {
        var content = '';
    }
    return content;
}
