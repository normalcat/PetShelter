import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	pets: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {}

  ngOnInit() {
  	this.getAllPets();
  }


  getAllPets() {
        let observable = this._httpService.getPets();
        observable.subscribe(response => {
            let data = response as any;
            this.pets = data.pets;
        });
        
    }

  sendData(petID) {
        this._httpService.setID(petID);
    }

  deleteOne(petID){
    console.log("we are inside the function" + petID);
    let observable = this._httpService.deleteOnePet(petID);
    observable.subscribe(response => {    //need to subscribe, otherwise it won't call the server
      this._router.navigate(['']);
    })
  }
}
