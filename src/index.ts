import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'
import { SquareGroup } from "./core/SquareGroup";

/**
 * 组合方块
 */
const group = new SquareGroup([
    { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }
], { x: 3, y: 2 }, "red")

group.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq, $("#root"))
})


// 更改中心点坐标
// 向下移动
$('#btnDown').on('click',function() {
    group.centerPoint = {
        x:group.centerPoint.x,
        y: group.centerPoint.y + 1
    }
})
// 向左移动
$('#btnLeft').on('click', function() {
    group.centerPoint = {
        x:group.centerPoint.x -1,
        y: group.centerPoint.y
    }
})
// 向右移动
$('#btnRight').on('click', function() {
    group.centerPoint = {
        x:group.centerPoint.x + 1,
        y: group.centerPoint.y
    }
})

// 向上移动
$('#btnUp').on('click', function() {
    group.centerPoint = {
        x:group.centerPoint.x,
        y: group.centerPoint.y - 1
    }
})