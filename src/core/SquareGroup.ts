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
    public get centerPoint(): Point {
        return this._certerPiont
    }
    public set centerPoint(v: Point) {
        this._certerPiont = v
        // 同时设置其他所有小方块的坐标
        this._shape.forEach((p,i) => {
            // 每个具体小方块的实际坐标
            this.squares[i].point = {
                x: this._certerPiont.x + p.x,
                y: this._certerPiont.y + p.y
            }
        })
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
}