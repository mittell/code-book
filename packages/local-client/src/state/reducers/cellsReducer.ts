import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellState = {
	loading: false,
	error: null,
	order: ['o7d', 'lgq', 'e8n', '52y', 'ecv', '0cv', 'rts', '0m2', '6yd'],
	data: {
		o7d: {
			content:
				'# Welcome to CodeBook\n\nCodeBook is an interactive documentation platform, where you can write instructions in Markdown, and practical code examples, along with live-code transpilation in order to see the rendered code as you write.\n\nHere is your first example:',
			type: 'text',
			id: 'o7d',
		},
		lgq: {
			content:
				'// Assign the value "Hello World" to a variable.\nconst value = "Hello World";\n\n// Use the "show" helper method to render the code intantly!\nshow(value);',
			type: 'code',
			id: 'lgq',
		},
		e8n: {
			content:
				'The "show()" helper method allows you to easily display your code within the browser window, instead of having to write complex display logic.\n\nHere is a more complex example using a React component:\n',
			type: 'text',
			id: 'e8n',
		},
		'52y': {
			content:
				"const App = ({ value }) => {\n  return <h1>{value}</h1>;\n};\n\nshow(<App value={'Hello World!'} />);",
			type: 'code',
			id: '52y',
		},
		ecv: {
			content:
				'Context is shared across each code snippet too!\n\nHere is an example referencing the previously declared "App" variable:',
			type: 'text',
			id: 'ecv',
		},
		'0cv': {
			content: "show(<App value={'Hello World Again!'} />);",
			type: 'code',
			id: '0cv',
		},
		rts: {
			content:
				"Notice how we didn't have to import React or ReactDOM?\n\nThat's because CodeBook will automatically download them in order to make writing both JavaScript and React examples easier.\n\nHowever, if you wish to use another library instead, you can just declare it within the code window, and CodeBook will take care of the rest:",
			type: 'text',
			id: 'rts',
		},
		'0m2': {
			content:
				'import \'@picocss/pico@1.5.6/css/pico.min.css\';\n\nconst Example = () => {\n  return (\n    <main class="container">\n      <nav>\n        <ul>\n          <li>\n            <strong>Brand</strong>\n          </li>\n        </ul>\n        <ul>\n          <li>\n            <a href="#">Link</a>\n          </li>\n          <li>\n            <a href="#">Link</a>\n          </li>\n          <li>\n            <a href="#" role="button">\n              Button\n            </a>\n          </li>\n        </ul>\n      </nav>\n    </main>\n  );\n};\n\nshow(<Example />);',
			type: 'code',
			id: '0m2',
		},
		'6yd': {
			content:
				'It\'s that easy to get up and running with CodeBook!\n\nAlso, each time you write Markdown or Code, the data will be saved to either the default "notebook.js" file, or to filename you specified when running CodeBook.\n\nSo you can come back to this again, and again, adding, removed, editing, whatever you want!\n\nHave fun!',
			type: 'text',
			id: '6yd',
		},
	},
};

const reducer = produce(
	(state: CellState = initialState, action: Action): CellState | void => {
		switch (action.type) {
			case ActionType.SAVE_CELLS_ERROR: {
				state.error = action.payload;

				return state;
			}

			case ActionType.FETCH_CELLS: {
				state.loading = true;
				state.error = null;

				return state;
			}

			case ActionType.FETCH_CELLS_COMPLETE: {
				state.loading = false;
				state.order = action.payload.map((cell) => cell.id);
				state.data = action.payload.reduce((acc, cell) => {
					acc[cell.id] = cell;
					return acc;
				}, {} as CellState['data']);

				return state;
			}

			case ActionType.FETCH_CELLS_ERROR: {
				state.loading = false;
				state.error = action.payload;

				return state;
			}

			case ActionType.UPDATE_CELL: {
				const { id, content } = action.payload;
				state.data[id].content = content;

				return state;
			}

			case ActionType.DELETE_CELL: {
				delete state.data[action.payload];
				state.order = state.order.filter((id) => id !== action.payload);

				return state;
			}
			case ActionType.MOVE_CELL: {
				const { direction } = action.payload;
				const index = state.order.findIndex((id) => id === action.payload.id);
				const targetIndex = direction === 'up' ? index - 1 : index + 1;

				if (targetIndex < 0 || targetIndex > state.order.length - 1) {
					return;
				}

				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;

				return state;
			}
			case ActionType.INSERT_CELL_AFTER: {
				const cell: Cell = {
					content: '',
					type: action.payload.type,
					id: randomId(),
				};

				state.data[cell.id] = cell;

				const index = state.order.findIndex((id) => id === action.payload.id);

				if (index < 0) {
					state.order.unshift(cell.id);
				} else {
					state.order.splice(index + 1, 0, cell.id);
				}

				return state;
			}
			default: {
				return state;
			}
		}
	},
	initialState
);

const randomId = () => {
	return Math.random().toString(36).substring(2, 5);
};

export default reducer;
