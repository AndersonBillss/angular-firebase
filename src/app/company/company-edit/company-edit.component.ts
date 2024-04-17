import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../../models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  id: string | null
  company$: Observable<Company>
  private companiesRef: AngularFirestoreCollection<Company>
  

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {
    this.id = '';
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    })


    if(this.id === 'new'){
      const newCompany: Company = {
        name: '',
      }
      this.company$ = of(newCompany)
    } else {
      this.company$ = this.companyService.getCompanyObservable(this.id);
    }

    this.companiesRef = this.db.collection<Company>('companies');
  }

  ngOnInit() {
  }

  saveCompany(company: any) {
    this.companiesRef.add({
      name: company.name,
    })
      .then(_ => this.router.navigate(['/companies']))
      .catch(error => console.log('add', error));
  }

  editCompany(company: any) {
    if(this.id){
      this.companiesRef.doc(this.id).update(company)
        .then(_ => this.router.navigate(['/companies']))
        .catch(error => console.log('update', error));
    } else {
      console.log('no id')
    }
  }

  deleteCompany(id: string | null) {
    if(id !== null){
      this.companiesRef.doc(id).delete()
      .then(_ => this.router.navigate(['/companies']))
      .catch(error => console.log('delete', error));
    }
  }


}