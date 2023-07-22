import {computed, Injectable, signal} from '@angular/core';
import {TodoInterface} from "../types/todo.interface";
import {FilterEnum} from "../types/filter.enum";

@Injectable({
	providedIn: 'root'
})
export class TodosService {
	public todosSignal = signal<TodoInterface[]>([]);
	public filterSignal = signal<FilterEnum>(FilterEnum.ALL);
	public isTodosEmptySignal = computed(() =>
		this.todosSignal().length === 0
	);

	public changeFilter(filterName: FilterEnum) {
		this.filterSignal.update(() => filterName);
	}

	public addTodo(text: string) {
		const newTodo: TodoInterface = {
			text,
			isCompleted: false,
			id: Math.random().toString(16),
		};
		this.todosSignal.update((todos) => [...todos, newTodo]);
	}

	public changeTodo(id: string, text: string) {
		this.todosSignal.update((todos) =>
			todos.map((todo) =>
				todo.id === id
					? {
						...todo,
						text
					}
					: todo
			)
		);
	}

	public removeTodo(id: string) {
		this.todosSignal.update((todos) =>
			todos.filter((todo) => todo.id !== id)
		);
	}

	public toggleTodo(id: string) {
		this.todosSignal.update((todos) =>
			todos.map((todo) =>
				todo.id === id
					? {
						...todo,
						isCompleted: !todo.isCompleted
					}
					: todo
			)
		);
	}

	public toggleAllTodos(isCompleted: boolean) {
		this.todosSignal.update((todos) =>
			todos.map((todo) => ({
					...todo,
					isCompleted
				})
			)
		);
	}
}
