import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
	pet: any;
	petID: any;
  constructor(private _http: HttpClient) { }

  addPet(pet) {
  		this.pet = pet;
        return this._http.post('/new', this.pet);
  }

  getPets() {
        return this._http.get('/pets');
   }

   setID(ID) {
        this.petID = ID;
    }

   getOnePetID(){
   	return this.petID;
   }

   getOnePet(ID) {
        let url = '/pets/' + ID;
        return this._http.get(url);
    }

    likePet(ID){
    	let url = "/pets/like/" + ID;
    	console.log(url);
    	return this._http.put(url, {id: ID});
    }

   editOnePet(ID, pet){
   		let url = "/pets/" + ID;
   		//console.log(pet);
   		//console.log(url);
   		return this._http.put(url, pet);
   }

   deleteOnePet(ID){
     let url = "/pets/" + ID;
     console.log("HTTP service " + url);
     return this._http.delete(url);
   }
/*
   deleteOnePet(ID){
     let url = '/pets/'+ ID;
     console.log("In http servie " + url);
     return this._http.delete(url)
   }
 
   deleteOnePet(ID){
     let url = '/pets/delete/' + ID;
     console.log("In http servie " + url);
     return this._http.get(url);
   }
*/
}
