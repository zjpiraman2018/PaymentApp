import { Component, OnInit } from '@angular/core';
import {PaymentDetailService} from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})

export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastrserv: ToastrService) { }

  ngOnInit(): void {
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.paymentDetailId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }
  
  
  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastrserv.success("submitted successfully",'Payment');
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }


  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastrserv.info("updated successfully",'Payment');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  onDelete(id:number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(id)
        .subscribe(res => {
          this.toastrserv.error("deleted successfully",'Payment');
          this.service.refreshList();
        },
        err => { console.log(err); })
    }
  }
}


