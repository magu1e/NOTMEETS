import { Component, ElementRef, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { ModalService } from './modal.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @Input() title: string = 'Modal Title';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @ViewChild('modal') modalElement!: ElementRef;

  private modalInstance!: any;

  constructor(private modalService: ModalService) {} // Inyección del servicio

  ngAfterViewInit(): void {
    this.modalInstance = new (window as any).bootstrap.Modal(this.modalElement.nativeElement);
    
    // Suscribirse al estado del modal
    this.modalService.isModalVisible$.subscribe(isVisible => {
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
    this.close.emit();
  }

  confirmModal() {
    this.modalInstance.hide();
    this.confirm.emit();
  }
}
