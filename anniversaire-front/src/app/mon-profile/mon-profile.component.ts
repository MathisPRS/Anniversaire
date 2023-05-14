import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-monprofile',
  templateUrl: './mon-profile.component.html',
  styleUrls: ['./mon-profile.component.css']
})
export class MonprofileComponent implements OnInit {
  profile: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api/user_profile/').subscribe(
      data => {
        this.profile = data;
      },
      error => console.log(error)
    );
  }
}