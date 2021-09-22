import { Injectable } from "@angular/core";
import { Movie } from "src/app/dto/movie.dto";
import { IMovieService } from "../interfaces/movie-service.interface";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


const URL = "http://35.180.103.223:8080/";

@Injectable({ providedIn: 'root' })
export class MockMovieService implements IMovieService{

    

    constructor(private http : HttpClient) { 
    }

    getMovies(): Observable<any>{

        return this.http.get(`${URL}api/v1/movies`);
    }

    save(movie : Movie): Observable<any>{
        return this.http.post(`${URL}api/v1/movies`,movie);
    }
}