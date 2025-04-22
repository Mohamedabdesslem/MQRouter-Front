import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PartnerService } from '../../services/partner.service';
import { PartnerCreateDTO } from '../../services/partner.model';

import {NgxPaginationModule} from 'ngx-pagination';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxPaginationModule
],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  partners: PartnerCreateDTO[] = [];
  partnerForm: FormGroup;
  currentPage = 1;
  totalItems = 0;
  itemsPerPage = 5; // Nombre d'éléments par page
  paginationId = 'partners-pagination';
  errorMessage: string = '';
  subscription: Subscription= new Subscription();

  constructor(
    private partnerService: PartnerService,
    private fb: FormBuilder
  ) {
    this.partnerForm = this.fb.group({
      alias: ['', Validators.required],
      type: ['', Validators.required],
      direction: ['INBOUND', Validators.required],
      application: ['', Validators.required],
      processedFlowType: ['MESSAGE', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners() {
    this.subscription = this.partnerService.getPartners(this.currentPage - 1, this.itemsPerPage)
      .subscribe(response => {
        this.partners = response.content;
        this.totalItems = response.totalElements;
      });
  }

  pageChanged(event: number) {
    this.currentPage = event;
    this.loadPartners();
  }
  addPartner(): void {
    if (this.partnerForm.valid) {
      const newPartner: PartnerCreateDTO = this.partnerForm.value;
      this.subscription = this.partnerService.createPartner(newPartner).subscribe({
        next: () => {
          this.partnerForm.reset();
          this.loadPartners();
          this.errorMessage = '';
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Une erreur est survenue lors de l’ajout du partenaire.';
          }
        }
      });
    }
  }

  deletePartner(id: number): void {
    this.subscription =this.partnerService.deletePartner(id).subscribe(() => {
      this.loadPartners(); // Recharger la liste après suppression
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
