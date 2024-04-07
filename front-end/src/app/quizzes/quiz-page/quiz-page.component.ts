import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {

  user_id: number = 0;
  constructor(private route: ActivatedRoute, public quizService: QuizService) { }

  ngOnInit(): void {
    this.user_id = +this.route.snapshot.paramMap.get('id')!;
    this.quizService.setUserId(this.user_id);
  }

}
