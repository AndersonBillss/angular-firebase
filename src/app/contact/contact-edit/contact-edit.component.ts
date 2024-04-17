import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  id: string | null
  contact$: Observable<Contact>
  private contactsRef: AngularFirestoreCollection<Contact>
  

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {
    this.id = '';
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })


    if(this.id === 'new'){
      const newContact: Contact = {
        name: '',
      }
      this.contact$ = of(newContact)
    } else {
      this.contact$ = this.contactService.getContactObservable(this.id);
      console.log(this.contact$)
    }

    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  ngOnInit() {
  }

  saveContact(contact: any) {
    this.contactsRef.add({
      name: contact.name,
    })
      .then(_ => this.router.navigate(['/contact/all']))
      .catch(error => console.log('add', error));
  }

  editContact(contact: any) {
    if(this.id){
      this.contactsRef.doc(this.id).update(contact)
        .then(_ => this.router.navigate(['/contact/all']))
        .catch(error => console.log('update', error));
    } else {
      console.log('no id')
    }
  }

  deleteContact(id: string | null) {
    if(id !== null){
      this.contactsRef.doc(id).delete()
      .then(_ => this.router.navigate(['/contact/all']))
      .catch(error => console.log('delete', error));
    }
  }


}