import { Game } from "./core/Game";
import { GamePaheViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'

const g = new Game(new GamePaheViewer())
$("#btnStart").on('click', () => {
  g.start()  
})
$("#btnPause").on('click', () => {
    g.pause() 
  })

  $("#btnLeft").on('click', () => {
    g.control_left()
  })

  $("#btnDown").on('click', () => {
    g.control_down()
  })

  $("#btnRight").on('click', () => {
    g.control_right()
  })


  $("#rotateClock").on('click', () => {
    g.control_rotate()
  })
  $("#btnAwalyDown").on('click', () => {
    g.control_Directly()
  })