import GamePanel from './GamePanel.svelte';
import { render, fireEvent, screen } from '@testing-library/svelte';

describe('GIVEN: The grid renders', ()=>{
	beforeEach(()=>{
		render(GamePanel);
	});
	describe('WHEN: The user clicks a cell', ()=>{
		it('THEN: The cell changes color.', ()=>{
			let cell = document.querySelector('td');

			expect(cell).toHaveTextContent('-1');

			fireEvent.click(cell);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('1');
		});
	});
	describe('WHEN: The user clicks a cell and then clicks "reset"', ()=>{
		it('THEN: The cell changes color, then the whole grid is blank.', ()=>{
			let cell = document.querySelector('td');
			const resetButton = document.querySelectorAll('button')[1];

			expect(cell).toHaveTextContent('-1');

			fireEvent.click(cell);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('1');

			fireEvent.click(resetButton);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('-1');
		});
	});
	describe('WHEN: The user clicks a cell and then clicks "step"', ()=>{
		it('THEN: The cell changes color, then the whole grid is blank.', ()=>{
			let cell = document.querySelector('td');
			const tickButton = document.querySelectorAll('button')[0];

			expect(cell).toHaveTextContent('-1');

			fireEvent.click(cell);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('1');

			fireEvent.click(tickButton);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('-1');
		});
	});
	describe('WHEN: The user clicks a cell and then clicks "on/off"', ()=>{
		it('THEN: The cell changes color, then the whole grid is blank.', async ()=>{
			let cell = document.querySelector('td');
			const onOffButton = document.querySelectorAll('button')[2];

			expect(cell).toHaveTextContent('-1');

			await fireEvent.click(cell);
			cell = document.querySelector('td');

			expect(cell).toHaveTextContent('1');

			await fireEvent.click(onOffButton);
			cell = document.querySelector('td'),

			setTimeout(
				() => expect(cell).toHaveTextContent('-1'),
				100
			)
		});
	});
	describe('WHEN: The user clicks the Grid Lines button twice', ()=>{
		it('THEN: The grid lines appear and disappear.', async ()=>{
			const gridLinesButton = document.querySelector('.grid-lines-button');
			const blackBorder = {
				border: '1px solid #000000FF',
			};

			await fireEvent.click(gridLinesButton);
			let cell = document.querySelector('td');

			expect(cell).toHaveStyle(blackBorder);

			await fireEvent.click(gridLinesButton);
			cell = document.querySelector('td');

			expect(cell).not.toHaveStyle(blackBorder);
		});
	});
});
