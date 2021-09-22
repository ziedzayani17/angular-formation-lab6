import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { finalize,tap } from 'rxjs/operators';
  
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercept method")
    const started = Date.now();
      const cloneReq = req.clone({ 
        setHeaders: { "header-interceptor": "test http interceptor" } 
      })
      let ok: string;
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
      
    }

  }