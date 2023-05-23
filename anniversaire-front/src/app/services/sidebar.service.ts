import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  showSidebar$ = new Subject<boolean>();

  constructor() { }
  updateSidebar(show: boolean) {
    this.showSidebar$.next(show);
  }
}