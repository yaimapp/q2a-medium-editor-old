<?php

/*
    Plugin Name: Medium Editor
    Plugin URI:
    Plugin Description: Provides the Medium Editor as WYSIWYG editor for your question2answer.
    Plugin Version: 1.0
    Plugin Date: 2016-09-26
    Plugin Author: 38qa.net
    Plugin Author URI: https://38qa.net/
    Plugin Minimum Question2Answer Version: 1.7
    Plugin Update Check URI:
    Licence: MIT
*/


    if (!defined('QA_VERSION')) { // don't allow this page to be requested directly from browser
        header('Location: ../../');
        exit;
    }

    @define( 'MEDIUM_EDITOR_DIR', dirname( __FILE__ ) );

    // editor module
    qa_register_plugin_module('editor', 'q2a-medium-editor.php', 'qa_medium_editor', 'Medium Editor');

    // upload page
    qa_register_plugin_module('page', 'q2a-medium-editor-upload.php', 'qa_medium_editor_upload', 'Medium Editor Upload');

    // layer to insert script in head
    qa_register_plugin_layer('q2a-medium-editor-layer.php', 'Medium Editor Layer');

    // language file
    qa_register_plugin_phrases('q2a-medium-editor-lang-*.php', 'q2a_medium_editor_lang');

/*
    Omit PHP closing tag to help avoid accidental output
*/
