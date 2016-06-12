/*:
 * @plugindesc 
 * タイトル画面にテキストを表示します。
 * クレジット表記などにお使い下さい。
 * @author SakuraCrowd
 *
 * @param Text
 * @desc 表示するテキストの文字列です。
 * @default 
 *
 * @param X
 * @desc テキストを配置する左端の X 座標です。
 * @default 0
 *
 * @param  Y
 * @desc  テキストを配置する上端の Y 座標です。
 * @default 0
 *
 * @param Font Size
 * @desc テキストのフォントサイズです。
 * @default 16
 * 
 * @param Font Face
 * @desc テキストのフォント名です。
 * @default GameFont
 * 
 * @param Font Italic
 * @desc true ならばテキストを斜体にします。
 * @default false
 * 
 * @param Text Color
 * @desc テキストの色です。rgba(R,G,B,A) は、RGB の値を 0 ~ 255 、 A の値を 0.0 ~ 1.0 で指定します。
 * @default white
 * 
 * @param Outline Color
 * @desc テキストの外郭の色です。 rgba(R,G,B,A) は、RGB の値を 0 ~ 255 、 A の値を 0.0 ~ 1.0 で指定します。
 * @default rgba(0, 0, 0, 0.5)
 * 
 * @param Outline Width
 * @desc テキストの外郭の幅です。
 * @default 4
 * 
 * @help 
 * # 複数のテキストを表示する場合
 * 
 * このプラグインファイルを別の名前でコピーして、それを使用してください。
 * このとき、ソースコードの var filename = 'SCTitleText' の右辺を
 * 同じファイル名に変更してください。
 * 
 * たとえば、 SCTitleText.js をコピーして同じフォルダ内に
 *  SCTitleText2.js を作成した場合は
 * var filename = 'SCTitleText2'
 * に書き換えてください。
 * そして、プラグインマネージャで SCTitleText2 を選択して利用してください。
 * 
 * # ライセンス
 * このプラグインのライセンスは NYSL Version 0.9982 です。
 * 各自の責任においてご自由にお使い下さい。
 */

(function() {
    var filename = 'SCTitleText'
    var parameters = PluginManager.parameters(filename);
    var text = String(parameters['Text'] || '')
    var x = Number(parameters['X'] || 0);
    var y = Number(parameters['Y'] || 0);
    var fontSize = Number(parameters['Font Size'] || 16);
    var fontFace = String(parameters['Font Face'] || 'GameFont')
    var fontItalic = String(parameters['Font Italic'] || 'false') == 'true';
    var textColor = String(parameters['Text Color'] || 'white')
    var outlineColor = String(parameters['Outline Color'] || 'rgba(0, 0, 0, 0.5)');
    var outlineWidth = Number(parameters['Outline Width'] || 4)

    var _Scene_Title_prototype_createForeground = 
        Scene_Title.prototype.createForeground;
    Scene_Title.prototype.createForeground = function() {
        _Scene_Title_prototype_createForeground.call(this);

        var maxWidth = Graphics.width - x * 2;
        var maxHeight = Graphics.height - y;
        this._gameTitleSprite.bitmap.textColor = textColor;
        this._gameTitleSprite.bitmap.outlineColor = outlineColor;
        this._gameTitleSprite.bitmap.outlineWidth = outlineWidth;
        this._gameTitleSprite.bitmap.fontSize = fontSize;
        this._gameTitleSprite.bitmap.fontFace = fontFace;
        this._gameTitleSprite.bitmap.fontItalic = fontItalic;
        var width = this._gameTitleSprite.bitmap.measureTextWidth(text);
        var height = fontSize + 1;
        this._gameTitleSprite.bitmap.drawText(text, x, y, width, height);
    };

})();
