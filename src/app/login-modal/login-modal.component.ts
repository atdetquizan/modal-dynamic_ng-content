import { Component, OnInit, Inject } from "@angular/core";
import { ModalRef } from "../shared/modal-ref";

@Component({
  selector: "app-login-modal",
  template: `
    Login Modal Component <button (click)="onClickClose()">Close</button>
  `
})
export class LoginModalComponent implements OnInit {
  
  constructor(private modalRef: ModalRef) {}

  ngOnInit() {}

  onClickClose() {
    this.modalRef.close();
  }
}
