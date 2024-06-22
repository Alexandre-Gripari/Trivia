import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, private gameService : GameService) { }

  ngOnInit() {
  }

  gotoHomePage() {
    this.router.navigate(['/home-page']);
    this.gameService.setIsFinished(true);
  }

}
