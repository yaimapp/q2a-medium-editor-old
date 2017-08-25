<?php

require_once(MEDIUM_EDITOR_DIR.'/vendor/phpQuery-onefile.php');

/*
 * プログレスバーを削除する
 */
function qme_remove_progressbar($content)
{
    $pq = phpQuery::newDocument($content);
    
    $elements = $pq['div.mdl-progress'];
    
    foreach ($elements as $elem) {
        pq($elem)->remove();
    }
    
    $html = $pq->html();
    $pq = null;
    return $html;
}

/*
 * 指定したタグに style 属性ある場合にそのタグを削除する
 * タグ内のコンテンツは残す
 */
function qme_remove_style($tag, $content)
{
    $pq = phpQuery::newDocument($content);

    $elements = $pq[$tag];

    foreach ($elements as $elem) {
        if (!empty(pq($elem)->attr('style'))) {
            pq($elem)->contentsUnwrap();
        }
    }

    return $pq->html();
}