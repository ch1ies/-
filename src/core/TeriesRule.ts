import { SquareGroup } from "./SquareGroup";
import { Point, Shape, Direction } from "./type";
import GameConfig from "./GameConfig";
import { Square } from "./Suqare";


function isPoint(obj:any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false
    }
    return true
}
/**
 * 该类中提供一系列的函数，根据游戏规则判断各种情况
 */
export class TeriesRule {
    /**
     * 判断某个形状的方块是否能够移动到目标位置
     * @param params 
     */
    static  canIMove(shape: Shape, targetPoint: Point, exists:Square[]):boolean {
        // 假设 中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints:Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        // 边界判断
        let result = targetSquarePoints.some(p => {
            // 是否超出的边界
         return  ( p.x < 0 || p.x > GameConfig.panelSize.width - 1 ||
                p.y < 0 || p.y > GameConfig.panelSize.height - 1)
                
        })
        if (result) {
            return false
        }
        // 是否与已有的方块有重叠
        result = targetSquarePoints.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y)
        )
        if (result) {
            return false
        }
        return true
    }

    static move(teries: SquareGroup, targetPoint: Point,exists:Square[]): boolean
    static move(teries: SquareGroup, direction: Direction,exists:Square[]):boolean
    static move (teris:SquareGroup, targetPointOrDirection: Point | Direction, exists:Square[]):boolean {
        if (isPoint(targetPointOrDirection)) {
            
            if (this.canIMove(teris.shape, targetPointOrDirection, exists)) {
                teris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        } else {
            const direction = targetPointOrDirection;
            let targetPoint
            if (direction === Direction.down) {
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1
                }
            } else if (direction === Direction.left) {
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y
                }
            } else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y
                }
            }
            return this.move(teris, targetPoint, exists)
        }
    }
    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teries 
     * @param direction 
     */
    static moveDirectly(teries:SquareGroup, direction: Direction, exists: Square[]) {
        while(true) {
            if (!this.move(teries, direction, exists)) {
                break
            }

        }
    }
    static rotate(teries:SquareGroup,exists:Square[]):boolean {
        const newShape = teries.afterRorateShape() // 得到旋转之后的形状
        if (this.canIMove(newShape, teries.centerPoint,exists)) {
            teries.rotate()
            return true
        } else {
            return false
        }
    }
    /**
     * 根据y坐标，得到所有y坐标为此值的方块
     * @param exists 
     * @param y 
     */
    private static getLineSquare(exists:Square[], y:number) {
        return exists.filter(sq => sq.point.y === y)
    }
    /**
     * 从已存在的方块中进行消除，并返回消除的行数
     * @param exists 
     */
    static deleteSquare(exists:Square[]):number {
        // 1. 获得y坐标数组
        const ys = exists.map(sq => sq.point.y)
        // 2. 获得最大，最小的y坐标
        const maxY = Math.max(...ys)
        const minY = Math.min(...ys)
        // 3, 循环判断每一行是否可以消除
        let num = 0
        for( let i = minY; i <= maxY; i++) {
            if (this.deleteLine(exists, i)) {
                num++ 
            }
        }
        return num
    }
    private static deleteLine(exists:Square[], y:number):boolean {
        const squares = this.getLineSquare(exists, y)
            if (squares.length === GameConfig.panelSize.width) {
                // 这一行可以消除
                squares.forEach(sq => {
                    // 1. 从界面中移除
                    if(sq.viewer) {
                        sq.viewer.remove()
                    }
                    // 从数组中移除
                    const index = exists.indexOf(sq)
                    exists.splice(index, 1)
                })
                // 2. 剩下的，比y坐标的方块y + 1
                exists.filter(sq => sq.point.y < y).forEach(sq => {
                    sq.point = {
                        x: sq.point.x,
                        y: sq.point.y + 1
                    }
                })
                return true
            }
            return false
    }
}