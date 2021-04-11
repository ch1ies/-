import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Suqare";
import { createTeries } from "./Teries";
import { TeriesRule } from "./TeriesRule";
import { Direction, GameStatus, GameViewer } from "./type";

export class Game {
    // 游戏状态
    private gameStatus:GameStatus = GameStatus.init
    public get GameStatus() {
        return this.gameStatus
    }
    // 当前玩家操作的方块
    private curTeris?: SquareGroup
    // 下一个方块
    private nextTeris: SquareGroup
    //计时器
    private _timer?:number | NodeJS.Timeout
    // 自动下落的间隔时间
    private _duration:number
    // 当前游戏中已存在的小方块
    private exists:Square[] = []
    // 积分
    private _score:number = 0

    public get score() {
        return this._score
    }
    public set score(val) {
        this._score = val
        this._viewer.showScore(val)
        const level = GameConfig.levels.filter(it => it.score <= val).pop()!
        if (level.duration === this._duration) {
            return
        }
        // 级别发生变化
        if (this._timer) {
            clearInterval(this._timer as number)
            this._duration = level.duration
            this._timer = undefined
            this.autoDrop()
        } 

    }
    constructor(private _viewer: GameViewer) {
        this._duration = GameConfig.levels[0].duration
        this.nextTeris = createTeries({x:0, y:0}) // 没有实际含义的代码，ts检测不到在构造函数中调用方法
        // this.resetCenterPoint(GameConfig.nextSize.width, this.nextTeris)
        // this._viewer.showNext(this.nextTeris)
        this.createNext()
        this._viewer.init(this)
        this._viewer.showScore(this._score)
    }
    private createNext() {
        this.nextTeris = createTeries({x:0, y:0})
        this.resetCenterPoint(GameConfig.nextSize.width, this.nextTeris)
        this._viewer.showNext(this.nextTeris)
    }
    private init() {
        this.exists.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this.exists = []
        this.createNext()
        this.curTeris = undefined
        this.score = 0
    }
    /**
     * 游戏开始
     */
    start() {
        // 游戏状态的改变
        if(this.gameStatus === GameStatus.playing) {
            return
        }
        // 从游戏结束到开始
        if (this.gameStatus === GameStatus.over) {
            // 初始化操作
            this.init()
        }
        this.gameStatus = GameStatus.playing
        // 给当前的方块赋值
        if(!this.curTeris) {
           this.switchTeris()
        }
        // 控制当前方块自由下落
        this.autoDrop()
        this._viewer.onGameStart()
    }
    /**
     * 切换方块
     */
    private switchTeris() {
        this.curTeris = this.nextTeris
        this.curTeris.squares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this.resetCenterPoint(GameConfig.panelSize.width, this.curTeris)
        // 有可能出问题，当前方块一出现时，就已经跟之前的方块重叠了
        if (!TeriesRule.canIMove(this.curTeris.shape, this.curTeris.centerPoint, this.exists)) {
            // 游戏结束
            this.gameStatus = GameStatus.over
            clearInterval(this._timer as number)
            this._timer = undefined
            this._viewer.onGameOver()
            return
        }
        this.createNext()
        this._viewer.switch(this.curTeris)
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
                if (!TeriesRule.move(this.curTeris, Direction.down, this.exists)) {
                    // 触底
                    this.hitbutton()
                }
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
            teries.centerPoint = {
                x: teries.centerPoint.x,
                y: teries.centerPoint.y + 1
            }
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
            this._viewer.onGamePause()

        }
    }
    /**
     * 游戏控制类
     */
    control_left() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.left, this.exists)
        }  
    }

    control_right() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.right, this.exists)
        }  
    }

    control_down() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.move(this.curTeris, Direction.down, this.exists)
            //触底 不需要判断
            // this.hitbutton()
        }  
    }
    control_rotate() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.rotate(this.curTeris, this.exists)
        }  
    }
    control_Directly() {
        if(this.curTeris && this.gameStatus === GameStatus.playing) {
            TeriesRule.moveDirectly(this.curTeris, Direction.down, this.exists)
            // 触底
            this.hitbutton()
        }  
    }
    
    /**
     * 触底处理
     */
    private hitbutton() {
        // 将当前的俄罗斯方块包含的小方块，加入到已存在的方块数组中
        // this.exists.push(...this.curTeris!.squares)
        this.exists = this.exists.concat(this.curTeris!.squares)
        // console.log(this.exists, 'exist---------')
        // 处理移除
        const num = TeriesRule.deleteSquare(this.exists)
        // 增加积分
        this.addScore(num)
        console.log(num)
        // 切换方块
        this.switchTeris()

    }
    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return
        } else if (lineNum === 1) {
            this.score += 10
        } else if (lineNum === 2) {
            this.score +=20
        } else if (lineNum ===3) {
            this.score += 50
        } else if (lineNum ===4) {
        this.score += 100
    }
    }

}