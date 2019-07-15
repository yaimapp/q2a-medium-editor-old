# Medium Editor Plugin

## Description
Provides the Medium Editor as WYSIWYG editor for your question2answer.

## Installations
Install nodejs and npm with nvm
```
git clone git://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

nvm -help

nvm install 4.6.0
```
Install bower
```
npm install bower -g
```
Install medium-editor and insert-plugin
```
cd q2a-medioum-editor
bower install
```




## 仕様(2019年8月現在)

### 概要

* [Q2A](https://www.question2answer.org/)というオープンソースQ&Aシステムを利用
* [Medium Editor](https://yabwe.github.io/medium-editor/)というjQueryプラグインでMediumライクな投稿UIを利用
* 動画アップロードは、[transloadit](https://transloadit.com/docs/#39-jquery) のjQuery SDKで実装
* 拡張性・保守性が低い(jQuery)
* 動作が不安定(バグがあったり)
* ユーザビリティが低い

##  画像のアップロード機能詳細

* [js/q2a-images.js](https://github.com/yshiga/q2a-medium-editor/blob/master/js/q2a-images.js) が主な処理
* `/medium-editor-upload`にPostリクエストを行う。[q2a-medium-editor-upload.php](https://github.com/yshiga/q2a-medium-editor/blob/master/q2a-medium-editor-upload.php) がハンドルする
* Q2AのPHP処理を行い、AWSにアップロードする。この部分の処理も複雑です。
* Q2Aのコアで画像のサイズ変更などの処理を行い、別のプラグインでAWSにPHPのSDKでアップロードしている
* さらにAWSのlamdaで、サムネイル画像の生成処理などを行う
* アップロード中はローディング表示
* レスポンスが以下のように返却されるので、エディタ上に表示する
```
{
	"files":[
		{"url":"https:\/\/d3dlv5ug8g5jts.cloudfront.net\/043\/4315813625816965655.jpeg",
		"name":"17917852473440024532 (1).jpeg",
		"type":"image\/jpeg"}
	]
}
```

## 動画のアップロード機能詳細
* [js/q2a-videos.js](https://github.com/yshiga/q2a-medium-editor/blob/master/js/q2a-videos.js)が主な処理
* transloaditのSDKを叩くと、transloaditがmovやmp4等の様々な形式のファイルを変換してAWSに保存
