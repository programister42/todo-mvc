import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosService} from "../services/todos.service";
import {FilterEnum} from "../types/filter.enum";
import {TodosItemComponent} from "./todos-item.component";

@Component({
	selector: 'tt-main',
	standalone: true,
	imports: [CommonModule, TodosItemComponent],
	template: `
		<section
			class="main"
			[ngClass]="{hidden: isTodosEmptySignal()}"
		>
			<input
				id="toggle-all"
				class="toggle-all"
				type="checkbox"
				[checked]="isAllTodosSelectedSignal()"
				(change)="toggleAllTodos($event)"
			/>
			<label for="toggle-all">Mark all as completed</label>
			<ul class="todo-list">
				<tt-todos-item
					*ngFor="let todo of visibleTodosSignal()"
					[todo]="todo"
					[isEditing]="editingId === todo.id"
					(setEditingId)="setEditingId($event)"
				/>
			</ul>
		</section>
	`,
	styles: []
})
export class TodosMainComponent {
	public editingId: string | null = null;
	private todosService = inject(TodosService);
	public visibleTodosSignal = computed(() => {
		const todos = this.todosService.todosSignal();
		const filter = this.todosService.filterSignal();
		switch (filter) {
			case FilterEnum.ACTIVE:
				return todos.filter((todo) => !todo.isCompleted);
			case FilterEnum.COMPLETED:
				return todos.filter((todo) => todo.isCompleted);
			default:
				return todos;
		}
	});
	public isAllTodosSelectedSignal = computed(() =>
		this.todosService.todosSignal().every((todo) => todo.isCompleted)
	);
	public isTodosEmptySignal = this.todosService.isTodosEmptySignal;

	public setEditingId(id: string | null) {
		this.editingId = id;
	}

	public toggleAllTodos(event: Event) {
		const target = event.target as HTMLInputElement;
		this.todosService.toggleAllTodos(target.checked);
	}
}
