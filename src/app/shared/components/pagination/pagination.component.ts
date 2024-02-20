import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalPage = 0;
  @Input() pageIndex = 1;
  @Input() numberOfPage = 0;

  @Output() pageIndexChange = new EventEmitter<number>();

  setPage(index: number) {
    this.pageIndex = index;
    this.pageIndexChange.emit(index);
  }
}
