import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosService} from "../services/todos.service";
import {FilterEnum} from "../types/filter.enum";

@Component({
	selector: 'tt-footer',
	standalone: true,
	imports: [CommonModule],
	template: `
		<footer
			class="footer"
			[ngClass]="{hidden: isTodosEmptySignal()}"
		>
			<span class="todo-count">
				<strong>{{activeCountSignal()}}</strong>
				{{itemsLeftTextSignal()}}
			</span>
			<ul class="filters">
				<li>
					<a
						href="/"
						[ngClass]="{selected: filterSignal() === filterEnum.ALL}"
						(click)="changeFilter($event, filterEnum.ALL)"
					>All</a>
				</li>
				<li>
					<a
						href="/"
						[ngClass]="{selected: filterSignal() === filterEnum.ACTIVE}"
						(click)="changeFilter($event, filterEnum.ACTIVE)"
					>Active</a>
				</li>
				<li>
					<a
						href="/"
						[ngClass]="{selected: filterSignal() === filterEnum.COMPLETED}"
						(click)="changeFilter($event, filterEnum.COMPLETED)"
					>Completed</a>
				</li>
			</ul>
		</footer>
	`,
	styles: []
})
export class TodosFooterComponent {
	public filterEnum = FilterEnum;
	private todosService = inject(TodosService);
	public filterSignal = this.todosService.filterSignal;
	public activeCountSignal = computed(() =>
		this.todosService.todosSignal()
			.filter((todo) => !todo.isCompleted)
			.length
	);
	public itemsLeftTextSignal = computed(() =>
		`item${this.activeCountSignal() === 1 ? '' : 's'} left`
	);
	public isTodosEmptySignal = this.todosService.isTodosEmptySignal;

	public changeFilter(event: Event, filterName: FilterEnum) {
		event.preventDefault();
		this.todosService.changeFilter(filterName);
	}
}
