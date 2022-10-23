import { Observable } from 'rxjs';
import { Course } from '../model/course';

export function createHttpObservable(url:string): Observable<any> {
    return new Observable<any>(observer => {

      fetch(url)
      .then(response => {

        if (response.ok) {
          return response.json();
        }
        else {
          observer.error('Request failed with status code: ' + response.status);
        }

      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
    });
  }