import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @Input() title: string = 'Modal Title';
  @Input() id!: string;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @ViewChild('modal') modalElement!: ElementRef;

  private modalInstance!: any;

  constructor(private modalService: ModalService) {}

  ngAfterViewInit(): void {
    this.modalService.registerModal(this.id); // Registrar el modal
    this.modalInstance = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    
    // Suscribirse al estado del modal usando el ID
    this.modalService.getModalState(this.id)?.subscribe(isVisible => {
      if (isVisible) {
        this.openModal();
      } else {
        this.closeModal();
      }
    });
  }

  openModal() {
    this.modalInstance.show();
  }

  closeModal() {
    this.modalInstance.hide();
    this.close.emit(); // Emitir el evento de cierre
  }

  confirmModal() {
    this.modalInstance.hide();
    this.confirm.emit();
  }
}
