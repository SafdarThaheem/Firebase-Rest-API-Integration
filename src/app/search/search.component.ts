import {
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputTextModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  SearchValue!: string;
  @Output() searchValueChange = new EventEmitter<string>();

  ngOnInit(): void {}

  onSearchChange() {
    this.searchValueChange.emit(this.SearchValue);
  }
}
