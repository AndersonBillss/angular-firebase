import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { Observable, map } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/compat/firestore";
import { from, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyRef: AngularFirestoreDocument<Company>;
  private companiesRef: AngularFirestoreCollection<Company>

  constructor(private db: AngularFirestore) {
    this.companyRef = this.db.doc<Company>('companies/company');
    this.companiesRef = this.db.collection<Company>('companies');
  }

  getCompanyObservable(id: string | null): Observable<Company | any> {
    return this.db.doc<Company>(`companies/${id}`).valueChanges();
  }

  getCompaniesObservable(): Observable<Company[]> {
    return this.companiesRef.snapshotChanges()
      .pipe(

        map((items: DocumentChangeAction<Company>[]): Company[] => {
          return items.map((item: DocumentChangeAction<Company>): Company => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        })
        
      );
  }

/*   saveCompany(company: Company) {
    this.companiesRef.add({
      name: company.name,
    })
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editCompany(company: Company) {
    this.companiesRef.doc(company.id).update(company)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteCompany(id: string | null) {
    if(id !== null){
      this.companiesRef.doc(id).delete()
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('remove', error));
    }
  } */

}