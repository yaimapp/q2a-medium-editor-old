<?php

/*
    Plugin Name: Medium Editor
*/


class qa_html_theme_layer extends qa_html_theme_base {

    private $components = QA_HTML_THEME_LAYER_URLTOROOT . 'bower_components/';
    const EDITOR_NAME = 'Medium Editor';

    function head_script()
    {
        qa_html_theme_base::head_script();
        if(($this->template === 'ask' && qa_opt('editor_for_qs') === self::EDITOR_NAME)
        || ($this->template === 'question' && qa_opt('editor_for_as') === self::EDITOR_NAME)
        || ($this->template === 'question' && qa_opt('editor_for_cs') === self::EDITOR_NAME)) {
            $this->output_css();
            $this->output_js();
        }
    }

    private function output_css()
    {
        // CSS files
        $this->output('<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">');
        $css_files = array(
            'medium-editor/dist/css/medium-editor.min.css',
            'medium-editor/dist/css/themes/default.min.css',
            'medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css'
        );
        foreach ($css_files as $css) {
            $this->output('<link rel="stylesheet" type="text/css" href="' . $this->components . $css .'" />');
        }
        $editor_height = qa_opt('medium_editor_height');
        $default_height = <<<EOS
    <style>
        .medium-editor-element {
            min-height: {$editor_height}px;
        }
    </style>
EOS;
        $this->output($default_height);
        $this->output('<link rel="stylesheet" type="text/css" href="'.QA_HTML_THEME_LAYER_URLTOROOT.'css/custom.css" />');
    }

    private function output_js()
    {
        // JS files
        $js_files = array(
            'medium-editor/dist/js/medium-editor.js',
            'handlebars/handlebars.runtime.min.js',
            'jquery-sortable/source/js/jquery-sortable-min.js',
            'jquery-sortable/source/js/jquery-sortable-min.js',
            'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
            'blueimp-file-upload/js/jquery.iframe-transport.js',
            'blueimp-file-upload/js/jquery.fileupload.js',
            'medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin.min.js',
        );
        foreach ($js_files as $js) {
            $this->output('<script src="'. $this->components . $js . '"></script>');
        }
    }

} // end qa_html_theme_layer


/*
    Omit PHP closing tag to help avoid accidental output
*/
