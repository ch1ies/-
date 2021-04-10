import { Square } from "./core/Suqare";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const sq = new Square()
sq.viewer = new SquarePageViewer(sq, $("#root"))

sq.color = "white"
sq.point = {
    x: 3,
    y: 0
}

$('#btnDown').on('click',function() {
    sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
    }
})
$('#btnMove').on('click', function() {
    console.log('121221')
    sq.viewer?.remove()
})
$('#btnAdd').on('click', () => {
    sq.viewer = new SquarePageViewer(sq, $('#root'))
    // sq.viewer.show() //或者写在构造函数中
})
// setInterval(() => {
//     console.log("exexur")
//     sq.point = {
//         x: sq.point.x + 1,
//         y: sq.point.y + 1
//     }
//     console.log(sq.point, '------')
// },1000)