import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../type";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import PageConfig from "./PageConfig";

export class GamePaheViewer implements GameViewer {
    onGamePause(): void {
        this.msgDom.css({
            display: "flex"
        })
        this.msgDom.find('p').html("游戏暂停").css({
            display: 'block'
        })
    }
    onGameStart(): void {
        this.msgDom.hide()
    }
    onGameOver(): void {
        this.msgDom.show()
        this.msgDom.find('p').html('游戏结束')
    }
    showScore(score: number): void {
        this.scoreDom.html(score.toString())
    }
    private nextDom = $("#next")
    private panelDom = $("#panel")
    private scoreDom = $("#score")
    private msgDom = $("#msg")

    init(game: Game): void {
        // 1. 设置区域的宽高
        this.panelDom.css({
            width:GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height:GameConfig.panelSize.height * PageConfig.SquareSize.height
        })
        this.nextDom.css({
            width:GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height:GameConfig.nextSize.height * PageConfig.SquareSize.height
        })
        // 注册键盘事件
        $(document).on('keydown', (e)=> {
            console.log(e.key)
            if (e.key === 'ArrowLeft') {
                game.control_left()
            } else if(e.key === 'ArrowDown') {
                game.control_down()
            } else if (e.key === 'ArrowRight') {
                game.control_right()
            } else if (e.key === "ArrowUp") {
                game.control_rotate()
            }
             else if (e.key === "Alt") {
                game.control_Directly()
            }
            else if (e.key === 'Enter') {
                if (game.GameStatus === GameStatus.playing) {
                    game.pause()
                } else {
                    game.start()
                }
            }
        })
    }
    showNext(teries: SquareGroup): void {
        teries.squares.forEach( p => {
            p.viewer = new SquarePageViewer(p , this.nextDom )
        })
    }
    switch(teries: SquareGroup): void {
        teries.squares.forEach(sq => {
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq, this.panelDom)
        } )
    }
    
}