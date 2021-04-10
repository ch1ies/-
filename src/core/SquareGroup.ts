import { Square } from "./Suqare";
import { Point, Shape } from "./type";

// 只做纯数据的处理，跟显示无关
export class SquareGroup {
    // 有哪些属性？
    // 小方块数组
    private _squares:ReadonlyArray<Square>

    public get squares() {
        return this._squares
    }
    public get shape() {
        return this._shape
    }
    public get centerPoint(): Point {
        return this._certerPiont
    }
    public set centerPoint(v: Point) {
        this._certerPiont = v
        // 同时设置其他所有小方块的坐标
        this.setSquarePoints()
    }
    constructor(private _shape: Shape, private _certerPiont:Point, private _color:string) {
        // 设置小方块数组
        const arr: Square[] = []
        this._shape.forEach(p => {
            const sq = new Square()
            sq.color = this._color
            // 每个小方块的实际坐标
            sq.point = {
                x: this._certerPiont.x + p.x,
                y: this._certerPiont.y + p.y
            }
            arr.push(sq)
        })
        this._squares = arr
        console.log(this._squares, '------')
    }
    /**
     * 根据中心点坐标，以及形状，设置每一个小方块的坐标
     */
    private setSquarePoints() {
        this._shape.forEach((p,i) => {
            // 每个具体小方块的实际坐标
            this.squares[i].point = {
                x: this._certerPiont.x + p.x,
                y: this._certerPiont.y + p.y
            }
        })
    }
    /**
     * 旋转方向是否为顺时针
     */
    protected isClock = true 
    afterRorateShape():Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newP: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newP
            })
        } else {
            return this._shape.map(p => {
                const newP: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newP
            })
        }
    }
    rotate() {
       const newShape =  this.afterRorateShape()
       this._shape = newShape
       this.setSquarePoints()
    }
}
