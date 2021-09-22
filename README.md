# LAB 6
## _Les points à voir :_

- Utilisation du module HttpClientModule
- Implémentation et création des intercepteurs

<br/>

## _prérequis :_

- Récuperer le code du LAB5 (https://github.com/ziedzayani17/angular-formation-lab5.git)
- voir la définition de service rest http://35.180.103.223:8080/swagger-ui.html

<br/>
<br/>

### 1. Importer le module *HttpClientModule* dans le module racine

```js

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```


### 2. Injecter le service *HttpClient* dane le service *movieService*

```js
import { HttpClient } from '@angular/common/http';
...
 constructor(private http : HttpClient) { 
}
```

### 2. Modifier la méthode *getMovies()* pour faire un appel rest au bon endpoint *http://35.180.103.223:8080/swagger-ui.html*

> changer le type de retour de la méthode , on va travailler avec les observables
>
```js
const URL = "http://35.180.103.223:8080/";

@Injectable({ providedIn: 'root' })
export class MockMovieService implements IMovieService{
  ...
getMovies(): Observable<any>{
        return this.http.get(`${URL}/api/v1/movies`);
 }

```

### 3. ajouter une inscription dans la méthode de composant *MoviesComponent* qui utiliser *getMovie*

```js

 ngOnInit(): void {
    this.mockMovieService.getMovies().subscribe(response => {
      this.movies = response;
    });
  }

```

### 3. HTTP POST
<br>

### 3.1 Ajouter une nouvelle méthode *save* dans le service *movieService*


```js
save(movie : Movie): Observable<any>{
        return this.http.post(`${URL}api/v1/movies`,movie);
    }

```

### 3.2 Injecter *MovieService* dans le composant *RegisterMovie* et utiliser la méthode *save*

```js

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

```

### 3.3 Ajouter le champs *description* dans le formulaire

>voici le html 
>```html
>   <div class="field">
>      <label>Text</label>
>      <textarea formControlName="description" ></textarea>
>    </div>
>```

### 3.4 Afficher le message de résultat de l'appel

```html

...
<button style="float: right;" class="ui submit button" type="submit" >Enregistrer</button>

  </form>

  <div *ngIf="message" class="ui floating message">
    <p>{{ message }}</p>
  </div>

</div>
</div>

```

### 4. Ajout d'un http intercepteur
<br>

### 4.1 Créer un nouveau fichier *api.interceptor.ts* dans *src/app/services*


> Vous devez cloner la requête pour la mettre à jour (les requêtes sont immuables)
> vous pouvez utiliser angular cli avec la commande : ng g interceptor api-interceptor

```js
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs"
  
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

      const cloneReq = req.clone({ 
        setHeaders: { "header-interceptor": "test http interceptor" } 
      })

      return next.handle(cloneReq)
    }

  }

```

>La méthode intercpt transforme la réquete en Observable qui rétourne HTTP response

### 4.2 Ajouter l'intercepteur au tableau HTTP_INTERCEPTORS grâce à l’injection de dépendances

```js
...
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
...

providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],

```

### 4.3 Intervenir à la réponse

```js
...
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpResponse} from "@angular/common/http";
...
return next.handle(cloneReq).pipe(
        tap(
          event => {
            if(event instanceof HttpResponse)
              console.log(event)
          }
        ),
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `L'execution à pris ${elapsed} ms.`;
          console.log(msg);
        })
      )
```
