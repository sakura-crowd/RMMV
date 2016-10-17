/*:ja
 * @plugindesc ２つのイベントまたはイベントと座標との距離を求めます。
 * @author SakuraCrowd
 *
 * @help
 *
 * Plugin Command:
 *  SCGetDistance eventId1 eventId2 varId
 * 	  eventId1 から eventId2 までの距離を計測して、変数 varId に結果を格納します。
 *
 *    eventId = 0 →プラグインコマンドを呼び出したイベント
 *    eventId = -1 →プレイヤー
 *    varId = 計算結果を格納する変数の番号。
 *
 *    example
 *      SCGetDistance 0, -1, 20
 *      if (#gameVariables.value(20) > 2)
 *      {
 *        // approaching
 *      }
 *
 *  SCGetDistance eventId x y varId
 *    eventId から座標(x, y)までの距離を計算して、変数 varId に結果を格納します。
 *    x, y = 好きな座標
 *
 */

(function() {
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	    _Game_Interpreter_pluginCommand.call(this, command, args);
		
		if (command.toUpperCase() === 'SCGETDISTANCE') {
			var _eventFrom = this.character(eval(args[0]));
			
			var _varId = 0;
			var _toX = 0;
			var _toY = 0;
			if (args.length > 3)
			{		// args.length == 4
      			_xTo = args[1];
      			_yTo = args[2];
      			_varId = args[3];
			}
			else	// args.length == 3
			{
				var _eventTo = this.character(eval(args[1]));
				_xTo = _eventTo.x;
				_yTo = _eventTo.y;
				_varId = args[2];
			}

			var _xDiff = _xTo - _eventFrom.x;
			var _yDiff = _yTo - _eventFrom.y;
			var _distance = Math.sqrt(_xDiff * _xDiff + _yDiff * _yDiff);
      
			$gameVariables.setValue(_varId, _distance)
		}
	};
})();
