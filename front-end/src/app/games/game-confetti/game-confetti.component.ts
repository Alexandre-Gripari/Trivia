import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-confetti',
  templateUrl: './game-confetti.component.html',
  styleUrls: ['./game-confetti.component.scss']
})
export class GameConfettiComponent implements OnInit {
  @ViewChild('confettiCanvas', { static: true }) confettiCanvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;
  private confettis: ConfettiParticle[] = [];

  ngOnInit(): void {
    this.context = this.confettiCanvas.nativeElement.getContext('2d')!;
  }

  startConfetti() {
    this.createConfettiParticles(150);
    this.animateConfetti();
  }

  createConfettiParticles(count: number) {
    for (let i = 0; i < count; i++) {
      this.confettis.push(new ConfettiParticle(this.confettiCanvas.nativeElement.width, this.confettiCanvas.nativeElement.height));
    }
  }

  animateConfetti() {
    this.context.clearRect(0, 0, this.confettiCanvas.nativeElement.width, this.confettiCanvas.nativeElement.height);
    this.confettis.forEach(particle => {
      particle.update();
      particle.draw(this.context);
    });
    requestAnimationFrame(this.animateConfetti.bind(this));
  }

  stopConfetti() {
    this.confettis = [];
  }
}

class ConfettiParticle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight - canvasHeight;
    this.r = Math.random() * 6 + 2;
    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 + 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.y > window.innerHeight) {
      this.y = -this.r;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

