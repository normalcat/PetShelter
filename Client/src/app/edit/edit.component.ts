import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	onePetID: any;
  	onePet = {name: "", type: "", description: "", skill1: "", skill2:"", skill3: ""};

  constructor(
  	private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {}
 
  ngOnInit() {
  	this._route.params.subscribe((params: Params) => console.log(params['id']));
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

    submitEdit(ID){
    	console.log(this.onePet);
    	let observable = this._httpService.editOnePet(ID, this.onePet);
        observable.subscribe(response => {
        	let data = response as any;
//            this.onePet = data.pets[0];
            console.log(data);
            this.goDetails();
        })
    }

   goDetails() {
    this._router.navigate(['../details']);
  }


}
