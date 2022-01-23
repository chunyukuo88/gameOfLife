import Cell from "./Cell.svelte";
import { fireEvent, render } from '@testing-library/svelte';
import "@testing-library/jest-dom";
import { cellClickHandler } from './CellUtils';
import { getContext } from 'svelte'; // This is active despite the gray color.

jest.mock('svelte', ()=>{
  const originalModule = jest.requireActual('svelte');
  return {
    __esModule: true,
    ...originalModule,
    getContext: () => ({
      gridStore: {
        subscribe: () => function unsubscribe(){
          return null;
        },
      },
      isTickingStore: {
        subscribe: () => function unsubscribe(){
          return null;
        },
      },
      speedStore: {
        subscribe: () => function unsubscribe(){
          return null;
        },
      },
      updateGrid: jest.fn(),
      stopTicking: jest.fn(),
      startTicking: jest.fn(),
      updateSpeed: jest.fn(),
    }),
  };
});

jest.mock('./CellUtils');
const mockCellClickHandler = cellClickHandler as jest.Mock<unknown>;


describe("Cell.svelte", () => {
  const props = {
    i: 34,
    j: 12,
    row: 3,
    value: -1
  };
  afterEach(()=>{
    jest.clearAllMocks();
  });
  describe("Layout", () => {
    describe("WHEN: Given a val argument of 1", () => {
      it("THEN: It displays a living cell", () => {
        props.value = 1;

        const { getByText } =  render(Cell, props);
        const cell = getByText(props.value);

        expect(cell).toHaveClass('living');
        expect(cell).toHaveTextContent('1');
      });
    });
    describe("WHEN: Given a val argument of -1", () => {
      it("THEN: It displays a dead cell", () => {
        props.value = -1;

        const { getByText } =  render(Cell, props);
        const cell = getByText(props.value);

        expect(cell).toHaveClass('dead');
        expect(cell).toHaveTextContent('-1');
      });
    });
  });
  describe("Interaction", () => {
    describe("WHEN: The user clicks the cell,", () => {
      it("THEN: The click handler is invoked.", () => {
        mockCellClickHandler.mockImplementation(jest.fn());

        render(Cell, props);
        const cell = document.querySelector('td');

        fireEvent.click(cell);

        expect(mockCellClickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
