import { Observable } from 'rxjs';
import { Course } from '../model/course';

export function createHttpObservable(url:string): Observable<any> {
    return new Observable<any>(observer => {
      console.log(url);
      fetch(url)
      .then(response => {
        return response.json();
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