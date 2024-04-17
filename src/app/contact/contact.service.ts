import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, map } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/compat/firestore";
import { from, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>

  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<Contact>('contacts/contact');
    this.contactsRef = this.db.collection<Contact>('contacts');
  }

  getContactObservable(id: string | null): Observable<Contact | any> {
    return this.db.doc<Contact>(`contacts/${id}`).valueChanges();
  }

  getContactsObservable(): Observable<Contact[]> {
    return this.contactsRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
        
      );
  }

/*   savecontact(contact: contact) {
    this.contactsRef.add({
      name: contact.name,
    })
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editcontact(contact: contact) {
    this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deletecontact(id: string | null) {
    if(id !== null){
      this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('remove', error));
    }
  } */

}