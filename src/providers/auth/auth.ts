import { Injectable } from '@angular/core';
import 'firebase/database';
import firebase , {User} from 'firebase/app';
import 'firebase/auth';
import {AlertController} from 'ionic-angular';
import {Platform} from "ionic-angular";

@Injectable()
export class AuthProvider {

  userProfile:firebase.database.Reference;
  currentUser:User;

  constructor() {
    console.log('Hello AuthProvider Provider');

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`/userProfile/${user.uid}`)
      }
    })

  }
  
 //login as a guest not a registered app user
 anonLogin(): Promise<any> {

  return firebase.auth().signInAnonymously()
    .then(response => {
      console.log(response);
    })
}
//saves user information of profile page to firebase
saveProfile(username:string,email:string,phone:string):any{
  return this.userProfile.update({username,email,phone})

 }


}
