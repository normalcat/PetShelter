import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	pets: any;

  constructor(private _httpService: HttpService) { }

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
    this._httpService.deleteOnePet(petID);
  }
}
