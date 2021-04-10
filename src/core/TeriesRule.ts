import { SquareGroup } from "./SquareGroup";
import { Point, Shape, Direction } from "./type";
import GameConfig from "./GameConfig";


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
    static  canIMove(shape: Shape, targetPoint: Point):boolean {
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
        return true
    }

    static move(teries: SquareGroup, targetPoint: Point): boolean
    static move(teries: SquareGroup, direction: Direction):boolean
    static move (teris:SquareGroup, targetPointOrDirection: Point | Direction):boolean {
        if (isPoint(targetPointOrDirection)) {
            
            if (this.canIMove(teris.shape, targetPointOrDirection)) {
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
            return this.move(teris, targetPoint)
        }
    }
    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teries 
     * @param direction 
     */
    static moveDirectly(teries:SquareGroup, direction: Direction) {
        while(true) {
            if (!this.move(teries, direction)) {
                break
            }

        }
    }
    static rotate(teries:SquareGroup):boolean {
        const newShape = teries.afterRorateShape() // 得到旋转之后的形状
        if (this.canIMove(newShape, teries.centerPoint)) {
            teries.rotate()
            return true
        } else {
            return false
        }
    }
}