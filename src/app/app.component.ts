import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {TodosComponent} from './todos/todos.component';

@Component({
	selector: 'tt-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, TodosComponent],
	template: `
		<tt-todos/>`,
	styles: [],
})
export class AppComponent {
}
