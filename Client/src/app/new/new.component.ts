import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	newPet: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService)
  {
  	this.newPet = {name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => console.log(params['id']));
  }

  goHome() {
    this._router.navigate(['/home']);
  }

  submitPet(){
  	let observable = this._httpService.addPet(this.newPet);
        observable.subscribe(response => {
            let data = response as any;
            if(data.error){

            }
            console.log(data);
        })
        this.newPet = {name: '', type: '', description: '', skill1: '', skill2: '', skill3: ''};
    this.goHome();
  }

}
