import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _httpService: HttpService) { }

  onePet = {name: "", type: "", description: "", skill1: "", skill2:"", skill3: ""};
  onePetID: any;

  ngOnInit() {
  	this.onePetID = this._httpService.getOnePetID();
  	this.getOnePet(this.onePetID);
  }

  getOnePet(ID) {
        let observable = this._httpService.getOnePet(ID);
        observable.subscribe(response => {
        	let data = response as any;
            this.onePet = data.pets[0];
            console.log(this.onePet);
        })
    }

  likePetFront(ID){
  	console.log("We are in ts file");
  	let observable = this._httpService.likePet(ID);
        observable.subscribe(response => {
        	let data = response as any;
            console.log(data);
            this.getOnePet(this.onePetID);
        })
  }
}
