import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'
import { createTeries, LineShape } from "./core/viewer/Teries";
import { TeriesRule } from "./core/viewer/TeriesRule";
import { Direction } from "./core/type";

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
    // TeriesRule.move(Teries, {x: Teries.centerPoint.x, y:Teries.centerPoint.y + 1})
    TeriesRule.moveDirectly(Teries, Direction.down)
})
// 向左移动
$('#btnLeft').on('click', function() {
    TeriesRule.move(Teries, Direction.left)
})
// 向右移动
$('#btnRight').on('click', function() {
    TeriesRule.move(Teries, Direction.right)
})

// 向上移动
$('#btnUp').on('click', function() {
    Teries.centerPoint = {
        x:Teries.centerPoint.x,
        y: Teries.centerPoint.y - 1
    }
})