<?php

	if (!defined('QA_VERSION')) { // don't allow this page to be requested directly from browser
		header('Location: ../');
		exit;
	}

	class q2a_medium_editor_filter {

		private $directory;

		function load_module($directory, $urltoroot)
		{
			$this->directory = $directory;
		}

		function filter_question(&$question, &$errors, $oldquestion)
		{
			if (qa_opt('editor_for_qs') === 'Medium Editor') {
				$question['content'] = $this->remove_tags($question['content']);
			}
		}

		function filter_answer(&$answer, &$errors, $question, $oldanswer)
		{
			if (qa_opt('editor_for_as') === 'Medium Editor') {
				$answer['content'] = $this->remove_tags($answer['content']);
			}
		}

		function filter_comment(&$comment, &$errors, $question, $parent, $oldcomment)
		{
			if (qa_opt('editor_for_cs') === 'Medium Editor') {
				$comment['content'] = $this->remove_tags($comment['content']);
			}
		}

		/*
		 * 不要なタグの削除
		 */
		private function remove_tags($content) {
			// remove progressbar
			$tmp = qme_remove_progressbar($content);
			// remove span style
			$tmp = qme_remove_style('span', $tmp);
			// remove br tags at the end of contents
			$new_content = $this->remove_br_tags($tmp);

			return $new_content;
		}

		/*
		 * 本文末尾の改行を削除
		 */
		private function remove_br_tags($content)
		{
			$regex = "/<p class=\"medium-insert-active\">(<br>)*<\/p>/Us";
			$regex2 = "/(<p class=\"\">(<br>)*<\/p>)*$/Us";
			$tmp = preg_replace($regex, "", $content);
			return preg_replace($regex2, "", $tmp);
		}

	}


/*
	Omit PHP closing tag to help avoid accidental output
*/
