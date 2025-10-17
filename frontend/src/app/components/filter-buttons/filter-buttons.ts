import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-buttons.html',
  styleUrls: ['./filter-buttons.css']
})
export class FilterButtonsComponent {
  @Input() filterOptions: string[] = [];
  @Input() typeColorMap: { [key: string]: string } = {};

  @Output() filterSelected = new EventEmitter<string>();

  public activeFilter = signal<string>('Todos os Tipos');

  public onSelectFilter(filter: string): void {
    this.activeFilter.set(filter);
    this.filterSelected.emit(filter);
  }

  public getButtonClasses(option: string): string {
    const isActive = this.activeFilter() === option;
    const color = this.typeColorMap[option] || 'gray';

    const base =
      'border font-semibold px-4 py-2 rounded-lg transition-colors duration-200';

    if (option === 'Todos os Tipos') {
      return isActive
        ? `${base} bg-orange-500 text-white border-orange-500`
        : `${base} bg-white text-gray-700 border-gray-300`;
    }

    // Aqui usamos um switch fixo para as cores Tailwind (não dinâmicas)
    switch (color) {
      case 'green':
        return isActive
          ? `${base} bg-green-500 text-white border-green-500`
          : `${base} bg-white text-green-500 border-green-500`;
      case 'red':
        return isActive
          ? `${base} bg-red-500 text-white border-red-500`
          : `${base} bg-white text-red-500 border-red-500`;
      case 'blue':
        return isActive
          ? `${base} bg-blue-500 text-white border-blue-500`
          : `${base} bg-white text-blue-500 border-blue-500`;
      case 'indigo':
        return isActive
          ? `${base} bg-indigo-500 text-white border-indigo-500`
          : `${base} bg-white text-indigo-500 border-indigo-500`;
      case 'lime':
        return isActive
          ? `${base} bg-lime-500 text-white border-lime-500`
          : `${base} bg-white text-lime-500 border-lime-500`;
      case 'purple':
        return isActive
          ? `${base} bg-purple-500 text-white border-purple-500`
          : `${base} bg-white text-purple-500 border-purple-500`;
      default:
        return isActive
          ? `${base} bg-gray-500 text-white border-gray-500`
          : `${base} bg-white text-gray-700 border-gray-300`;
    }
  }
}
