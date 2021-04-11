import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTeries } from "./Teries";
import { TeriesRule } from "./TeriesRule";
import { Direction, GameStatus, GameViewer } from "./type";

export class Game {
    // 游戏状态
    private gameStatus:GameStatus = GameStatus.init
    // 当前玩家操作的方块
    private curTeris?: SquareGroup
    // 下一个方块
    private nextTeris: SquareGroup = createTeries({x:0, y:0})
    //计时器
    private _timer?:number | NodeJS.Timeout
    // 自动下落的间隔时间
    private _duration:number = 1000
    constructor(private _viewer: GameViewer) {
        this.resetCenterPoint(GameConfig.nextSize.width, this.nextTeris)
        this._viewer.showNext(this.nextTeris)
    }
    /**
     * 游戏开始
     */
    start() {
        // 游戏状态的改变
        if(this.gameStatus === GameStatus.playing) {
            return
        }
        this.gameStatus = GameStatus.playing
        // 给当前的方块赋值
        if(!this.curTeris) {
           this.switchTeris()
        }
        // 控制当前方块自由下落
        this.autoDrop()
    }
    /**
     * 切换方块
     */
    private switchTeris() {
        this.curTeris = this.nextTeris
        this.resetCenterPoint(GameConfig.panelSize.width, this.curTeris)
        this.nextTeris = createTeries({x:0, y:0})
        this.resetCenterPoint(GameConfig.nextSize.width, this.nextTeris)
        this._viewer.switch(this.curTeris)
        this._viewer.showNext(this.nextTeris)
    }
    /**
     * 方块自由下落
     */
    private autoDrop() {
        if(this._timer || this.gameStatus !== GameStatus.playing) {
            return
        }
        this._timer = setInterval(() => {
            if(this.curTeris) {
                TeriesRule.move(this.curTeris, Direction.down)
            }
        }, this._duration)

    }
    /**
     * 设置中心点坐标,以达到让该方块出现在区域的中上方
     * @param width 
     * @param teries 
     */

    private resetCenterPoint(width: number, teries: SquareGroup) {
        const x = Math.ceil(width / 2 - 1)
        const y = 0
        teries.centerPoint = {x, y}
        while (teries.squares.some( it => it.point.y < 0)) {
            teries.squares.forEach( sq => sq.point = {
                x: sq.point.x,
                y: sq.point.y + 1
            })
        }
    }
    /**
     * 游戏暂停
     */
    pause() {
        if (this.gameStatus === GameStatus.playing) {
            this.gameStatus = GameStatus.pause
            clearInterval(this._timer as number)
            this._timer = undefined

        }
    }
    /**
     * 游戏控制类
     */
    control_left() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.left)
        }  
    }

    control_right() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.right)
        }  
    }

    control_down() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.down)
        }  
    }
    control_rotate() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.rotate(this.curTeris)
        }  
    }
}