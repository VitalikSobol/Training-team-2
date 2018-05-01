import { Component, Input, Output, EventEmitter }  from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() range: string;
  @Input() total: number;
  @Input() currentRows: number;

  @Output()
  changeRows: EventEmitter<number> = new EventEmitter<number>();

  setCurrentRows(event): void{
    this.currentRows = event.target.innerText;
    this.changeRows.emit(this.currentRows);
  }

  @Output()
  goToPage: EventEmitter<string> = new EventEmitter<string>();

  setDirection(classDirection): void{
    this.goToPage.emit(classDirection);
  }



}
