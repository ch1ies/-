import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface Point {
   readonly x: number,
   readonly y: number
}

export interface GameViewer {
    /**
     * 
     * @param teries 下一个方块对象
     */
    showNext(teries: SquareGroup):void
    /**
     * 
     * @param teries 切换的方块对象
     */
    switch(teries:SquareGroup): void
    // 完成界面的初始化
    init(game:Game):void
    showScore(score:number):void
    onGamePause():void
    onGameStart():void
    onGameOver():void
}
export interface IViewer {
    show():void   //显示
    remove():void  // 移除,不再显示
}
/**
 * 形状
 */
export type Shape = Point[]

/**
 * 移动方向
 */
export enum Direction {
    left,
    right,
    down
}

export enum GameStatus {
    init,
    playing,
    pause,
    over
}