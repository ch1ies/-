import { SquareGroup } from "./SquareGroup";
import { Point } from "./type";
import { getRandom } from "./utils";

export class TShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
             _centerPoint, _color
            );
    }
    
}
export class LShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
             _centerPoint, _color
            );
    }
    
}
export class SShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
             _centerPoint, _color
            );
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
    
}
export class SMirrirShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
             _centerPoint, _color
            );
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
    
}
// 田字型
export class STShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([ { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
             _centerPoint, _color
            );
    }
    afterRorateShape() {
        return this.shape
    }
    
}
export class LineShape extends SquareGroup {
    constructor(
        _centerPoint: Point,
        _color: string
    ) {
        super([ { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
             _centerPoint, _color
            );
    }
    rotate() {
        super.rotate()
        this.isClock = !this.isClock
    }
    
}
// export const TShape:Shape = [
//     { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 },

// ]
// export const LShape:Shape = [
//     { x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 },

// ]
// export const SShape:Shape = [
//     { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 },
// ]

// export const SMirrirShape:Shape = [
//     { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },

// ]
// export const STShape:Shape = [
//     { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 },

// ]
// export const LineShape:Shape = [
//     { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },

// ]
export const shapes = [
    // TShape,
    // SShape,
    // SShape,
    // LShape,
    STShape,
    // LineShape
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
export function createTeries (centerPoint: Point): SquareGroup {
    let index = getRandom(0, shapes.length)
    const shape = shapes[index]
    let index1 = getRandom(0, Colors.length)
    const color = Colors[index1]
    return new shape(centerPoint, color)
}




