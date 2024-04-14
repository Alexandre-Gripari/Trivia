import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-confetti',
  templateUrl: './game-confetti.component.html',
  styleUrls: ['./game-confetti.component.scss']
})
export class GameConfettiComponent implements OnInit {
  confettis: { left: number, speed: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Add some confetti
    for (let i = 0; i < 30; i++) {
      this.confettis.push({
        left: Math.random() * window.innerWidth, // Random left position
        speed: Math.random() * 3 + 1 // Random speed between 1 and 4
      });
    }
  }

}
