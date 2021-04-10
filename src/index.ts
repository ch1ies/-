import { Square } from "./core/Suqare";
import { IViewer } from "./core/type";

// 输出控制台类，实现具体的接口
// Square 实现核心逻辑， SquareConsoleViewer 实现接口,提供方法
// Square 的实例的属性调用 SquareConsoleViewer 提供的方法
// 符合 单一职责原则，开闭原则
class SquareConsoleViewer implements IViewer {
    constructor(private square:Square
        ) {
    } 

    show(): void {
        console.log(this.square.point.x + this.square.color)
    }
    remove(): void {
    }
    
}
const s = new Square({x:0, y:0},"color")

s.viewer = new SquareConsoleViewer(s)  // 连接两个类功能的桥梁

s.viewer.show()

s.point = {
    x : 3,
    y: 12
}
