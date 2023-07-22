import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosHeaderComponent} from "./components/todos-header.component";
import {TodosMainComponent} from "./components/todos-main.component";
import {TodosFooterComponent} from "./components/todos-footer.component";

@Component({
	selector: 'tt-todos',
	standalone: true,
	imports: [CommonModule, TodosHeaderComponent, TodosMainComponent, TodosFooterComponent],
	template: `
		<div class="todoapp">
			<tt-header/>
			<tt-main/>
			<tt-footer/>
		</div>
	`,
	styles: []
})
export class TodosComponent {
}
