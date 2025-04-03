import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { PartnerService } from '../../services/partner.service';
import { PartnerCreateDTO } from '../../services/partner.model';
import {CommonModule} from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    ReactiveFormsModule,  CommonModule, NgxPaginationModule
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
    this.partnerService.getPartners(this.currentPage - 1, this.itemsPerPage)
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
      this.partnerService.createPartner(newPartner).subscribe(() => {
        this.partnerForm.reset();
        this.ngOnInit(); // Recharger la liste des partenaires
      });
    }
  }

  deletePartner(id: number): void {
    this.partnerService.deletePartner(id).subscribe(() => {
      this.ngOnInit(); // Recharger la liste après suppression
    });
  }
}
