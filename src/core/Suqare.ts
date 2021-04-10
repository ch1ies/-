import { IViewer, Point } from "./type"

/**
 * 小方块
 */
export class Square {
  // private _point: Point // 逻辑坐标x
//    private _y: Point  // 逻辑坐标y
  //  private _color: string

  // 属性： 显示者，管理显示， 对外开放
  private _viewer?: IViewer
  public get viewer () {  // c# 的写法，使用访问器
      return this._viewer
  }
  public set viewer (val) {
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
   public constructor(private _point: Point, private _color: string) {
       
   }
}

