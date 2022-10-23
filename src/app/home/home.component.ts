import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delayWhen, map,finalize, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {
    }

    ngOnInit() {
        const http$: Observable<Course[]> = createHttpObservable('/api/courses');

        const courses$ = http$
            .pipe(
                tap(() => console.log("Http ok")),
                map((res) => Object.values(res["payload"]) ),
                shareReplay(),
                catchError(err => {
                    console.log('Error ocurred', err);
                    return throwError(err);
                }),
                finalize(() => {
                    console.log('Finalize executed..');
                })
            );

        this.beginnerCourses$ = courses$
            .pipe(
                map((courses: Course[]) => courses
                    .filter((course: Course) => course.category === "BEGINNER")));

        this.advancedCourses$ = courses$
            .pipe(
                map((courses: Course[]) => courses
                    .filter((course: Course) => course.category === "ADVANCED")));

    }

}
