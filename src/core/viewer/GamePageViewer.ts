import { SquareGroup } from "../SquareGroup";
import { GameViewer } from "../type";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class GamePaheViewer implements GameViewer {
    showNext(teries: SquareGroup): void {
        teries.squares.forEach( p => {
            p.viewer = new SquarePageViewer(p , $('#next') )
        })
    }
    switch(teries: SquareGroup): void {
        teries.squares.forEach(sq => {
            sq.viewer!.remove()
            sq.viewer = new SquarePageViewer(sq, $('#panel'))
        } )
    }
    
}