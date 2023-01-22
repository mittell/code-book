import './code-cell.css';
import { useEffect } from 'react';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCombinedCode } from '../hooks/use-combined-code';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	const combinedCode = useCombinedCode(cell.id);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, combinedCode);
			return;
		}

		const timer = setTimeout(async () => {
			createBundle(cell.id, combinedCode);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [combinedCode, cell.id, createBundle]);

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} bundlingStatus={bundle.error} />
					)}
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
