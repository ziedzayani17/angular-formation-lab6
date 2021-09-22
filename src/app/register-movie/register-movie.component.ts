import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MockMovieService } from '../services/impl/movie-service.impl';


@Component({
  selector: 'app-register-movie',
  templateUrl: './register-movie.component.html',
  styleUrls: ['./register-movie.component.css']
})
export class RegisterMovieComponent implements OnInit {

  movieForm : FormGroup;
  submitted : boolean = false;
  message : string = "";

  constructor(private fb: FormBuilder,private mockMovieService: MockMovieService) {

    this.movieForm = fb.group({
      name: fb.control('',[Validators.required, Validators.minLength(4)]),
      pays: '',
      category: '',
      releaseDate: '',
      description:''

    });

   }

  ngOnInit(): void {
  }


  registerMovie():void{
    
    if(this.movieForm.invalid)
      return;
    this.mockMovieService.save(this.movieForm.value).subscribe(response => {
      this.submitted = true;
      this.movieForm.reset();
      this.message = "Votre film a été ajouté avec succès"
    },
    errorn => {
      this.submitted = true;
      this.message = "Problème lors de l'ajout de film"
    } 
    )
  }

}
