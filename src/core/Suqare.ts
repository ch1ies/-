import { IViewer, Point } from "./type"

/**
 * 小方块
 */
export class Square {
  private _point: Point = {
    x: 0,
    y: 0
  } // 逻辑坐标x
//    private _y: Point  // 逻辑坐标y
   private _color: string = "white"

  // 属性： 显示者，管理显示， 对外开放
  private _viewer?: IViewer
  public get viewer () {  // c# 的写法，使用访问器
      return this._viewer
  }
  public set viewer (val) {
    if (val) {
      val.show() // 手动调用，解决重新创建时手动调用
    }
    this._viewer = val
  }
   public get point() {
       return this._point
   }
   public set point(val) {
    this._point = val
    // 完成显示,当坐标发生变化
    if (this._viewer) {
        this._viewer.show()
    }

   }
   public get color() {
       return this._color
   }
   public set color(c) {
    this._color = c
   }
}

