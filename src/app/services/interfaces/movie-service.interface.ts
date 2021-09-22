
import { Movie } from "src/app/dto/movie.dto";
import { Observable} from 'rxjs'


export interface IMovieService {

getMovies(): Observable<any>;

save(movie : Movie): Observable<Movie>;

}