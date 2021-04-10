export interface Point {
   readonly x: number,
   readonly y: number
}

export interface IViewer {
    show():void   //显示
    remove():void  // 移除,不再显示
}