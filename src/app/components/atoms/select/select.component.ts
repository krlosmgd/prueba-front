import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {

  @Input() options: any[] = [];
  @Output() onSelector: EventEmitter<any> = new EventEmitter();

  handleSelectorChange() {
    this.onSelector.emit();
  }
}
