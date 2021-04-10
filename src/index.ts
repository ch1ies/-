import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'
import { createTeries, LineShape } from "./core/viewer/Teries";

/**
 * 组合方块
 */
const Teries = createTeries({x:3, y:2})

Teries.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $("#root"))
})


// 更改中心点坐标
// 向下移动
$('#btnDown').on('click',function() {
    Teries.centerPoint = {
        x:Teries.centerPoint.x,
        y: Teries.centerPoint.y + 1
    }
})
// 向左移动
$('#btnLeft').on('click', function() {
    Teries.centerPoint = {
        x:Teries.centerPoint.x -1,
        y: Teries.centerPoint.y
    }
})
// 向右移动
$('#btnRight').on('click', function() {
    Teries.centerPoint = {
        x:Teries.centerPoint.x + 1,
        y: Teries.centerPoint.y
    }
})

// 向上移动
$('#btnUp').on('click', function() {
    Teries.centerPoint = {
        x:Teries.centerPoint.x,
        y: Teries.centerPoint.y - 1
    }
})