import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosService} from "../services/todos.service";

@Component({
	selector: 'tt-header',
	standalone: true,
	imports: [CommonModule],
	template: `
		<header class="header">
			<h1>todos</h1>
			<input
				class="new-todo"
				placeholder="What needs to be done?"
				autofocus
				[value]="text"
				(keyup)="changeText($event)"
				(keydown.enter)="addTodo()"
			>
		</header>
	`,
	styles: []
})
export class TodosHeaderComponent {
	public text: string = '';
	private todoService = inject(TodosService);

	public changeText(event: any) {
		const target = event.target as HTMLInputElement;
		this.text = target.value;
	}

	public addTodo() {
		this.todoService.addTodo(this.text);
		this.text = '';
	}
}
