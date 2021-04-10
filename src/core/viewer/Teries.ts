import { SquareGroup } from "../SquareGroup";
import { Point, Shape } from "../type";
import { getRandom } from "../utils";

export const TShape:Shape = [
    { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 },

]
export const LShape:Shape = [
    { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 },

]
export const SShape:Shape = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 },
]

export const SMirrirShape:Shape = [
    { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },

]
export const STShape:Shape = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },

]
export const LineShape:Shape = [
    { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },

]
export const shapes = [
    TShape,
    SShape,
    SShape,
    LShape,
    STShape,
    LineShape
]
export const Colors = [
    "red",
    "white",
    "orange",
    "blue",
    "green"
]
/**
 * 随机产生一个俄罗斯方块(颜色随机，形状随机)
 * @param centerPoint 中心点
 */
export function createTeries (centerPoint: Point) {
    let index = getRandom(0, shapes.length)
    const shape = shapes[index]
    let index1 = getRandom(0, Colors.length)
    const color = Colors[index1]
    return new SquareGroup(shape, centerPoint, color)
}




