import { Square } from "../Suqare";
import $ from 'jquery'
import { IViewer } from "../type";
import PageConfig from "./PageConfig";

/**
 * 显示一个小方块到页面上
 * 接口是个契约， 联系数据处理类Square和具体的实现类 SquarePageViewer
 * Square 中只依赖接口，不依赖具体的实现类
 */
export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>
    private isRemove: Boolean = false // 默认没有移除
    constructor(
        private square: Square,
        private container:JQuery<HTMLElement>   // dom 对象
    ) {}
    show(): void {
        if(this.isRemove) {
            return
        }
        if (!this.dom) { //创建dom 对象， 先把不变的东西写下来
            this.dom = $("<div>").css({
                position: 'absolute',
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: '1px solid #ccc',
                boxSizing: 'border-box'
            }).appendTo(this.container)
        }
        this.dom.css({ // 记得相乘
            left:this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            background: this.square.color
        })
    }
    remove(): void {
        if (this.dom && !this.isRemove) {
            this.dom.remove()
            this.isRemove = true
        }
    }
}