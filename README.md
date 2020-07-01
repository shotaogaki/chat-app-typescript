#react-hooks-chat-app
概要：react hooksを利用したチャットの内容をリアルタイムで通訳するアプリケーションです。
通常のチャット機能に加え、チャットの内容を通訳してくれます。
また、ログインしなくても利用出来ます。
日常の中で英語に触れるチャンスを増やすことで英語の上達が望めます。
ブラウザのタブを二つ用意し、メッセージを送信いただくとリアルタイムで受信されるのを確認することができます。
また、データが永続化されるため、いつでも確認可能です。

#機能一覧：
・googleログイン機能（firebase）
・テキスト通訳機能（firebase Extension）
・リアルタイムアップデート（firebase onSnapshot()メソッド）
・メッセージの永続化（firebase firestore）
・チャット機能

#ソフトウェア構成
    react: 16.13.1,
    react-dom: 16.13.1,
    react-scripts: 3.4.1
    @material-ui/core: 4.10.1,
    @material-ui/icons: 4.9.1,
    @testing-library/jest-dom: 4.2.4,
    @testing-library/react: 9.5.0,
    @testing-library/user-event: 7.2.1,
    dotenv: 8.2.0,
    firebase: 7.15.0,
