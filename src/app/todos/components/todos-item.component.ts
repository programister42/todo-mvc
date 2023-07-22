import {
	Component,
	ElementRef,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoInterface} from "../types/todo.interface";
import {TodosService} from "../services/todos.service";

@Component({
	selector: 'tt-todos-item',
	standalone: true,
	imports: [CommonModule],
	template: `
		<li [ngClass]="{
			editing: isEditing,
			completed: todo.isCompleted
		}">
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					[checked]="todo.isCompleted"
					(change)="toggleTodo()"
				/>
				<label (dblclick)="setTodoInEditMode()">{{todo.text}}</label>
				<button
					class="destroy"
					(click)="removeTodo(todo.id)"
				></button>
			</div>
			<ng-container *ngIf="isEditing">
				<input
					#textInput
					class="edit"
					[value]="editingText"
					(keyup)="changeText($event)"
					(keydown.enter)="changeTodo()"
				/>
			</ng-container>
		</li>
	`,
	styles: []
})
export class TodosItemComponent implements OnInit, OnChanges {
	@Input({required: true}) public todo!: TodoInterface;
	@Input({required: true}) public isEditing: boolean = false;
	@Output() setEditingId = new EventEmitter<string | null>();

	@ViewChild('textInput') textInput?: ElementRef;

	public editingText: string = '';
	private todosService = inject(TodosService);

	public ngOnChanges(changes: SimpleChanges) {
		if (changes['isEditing'].currentValue) {
			setTimeout(() => {
				this.textInput?.nativeElement.focus();
			}, 0);
		}
	}

	public ngOnInit() {
		this.editingText = this.todo.text;
	}

	public changeText(event: Event) {
		this.editingText = (event.target as HTMLInputElement).value;
	}

	public changeTodo() {
		this.todosService.changeTodo(
			this.todo.id,
			this.editingText
		);
		this.setEditingId.emit(null);
	}

	public setTodoInEditMode() {
		this.setEditingId.emit(this.todo.id);
	}

	public removeTodo(id: string) {
		this.todosService.removeTodo(this.todo.id);
	}

	public toggleTodo() {
		this.todosService.toggleTodo(this.todo.id);
	}
}
