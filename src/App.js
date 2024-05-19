import './App.css';
import DataTable from './components/DataTable';
import { useEffect, useState } from 'react';
import items from './database.json';

function sortItemsByColumn(column, direction) {
	let sortedItems = [...items];
	if (column === "id"){
		sortedItems.sort((a,b) => {
			if (direction === "descending") return b[column] - a[column];
			else if (direction === "ascending") return a[column] - b[column];
			else return a.id - b.id;
		});
	}
	else if (column !== null) {
		sortedItems.sort((a,b) => {
			if (direction === "descending") return b[column].localeCompare(a[column]);
			else if (direction === "ascending") return a[column].localeCompare(b[column]);
			else return a.id - b.id;
		})
	}

	return sortedItems;
}

function App() {
	const pageLengthOptions = [
		{text: 5, value: 5},
		{text: 10, value: 10},
		{text: 20, value: 20},
		{text: 50, value: 50},
		{text: 100, value: 100},
	];
	const [selectedItemIds, setSelectedItemIds] = useState([1]);
	const [paginatedItems, setPaginatedItems] = useState([items[0]]);
	const [pageLength, setPageLength] = useState(10);
	const [activePageNumber, setActivePageNumber] = useState(1);
	const [pageCount, setPageCount] = useState(1);
	const [sorted, setSorted] = useState({column: null, direction: null});

	useEffect(() => {setSelectedItemIds([])}, []);

	useEffect(() => {
		const allItems = sortItemsByColumn(sorted.column, sorted.direction);
		setPaginatedItems(allItems.filter((e, i) => i >= pageLength * (activePageNumber-1) && i < pageLength * activePageNumber));
		const newPageCount = Math.ceil(allItems.length / pageLength);
		setPageCount(newPageCount);
		setActivePageNumber(Math.min(newPageCount, activePageNumber));
		setSelectedItemIds([]);
	}, [pageLength, activePageNumber, sorted]);

	const handleRowSelect = (id) => {
		if (selectedItemIds.includes(id)) setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
		else setSelectedItemIds([...selectedItemIds, id]);
	}

	const handleClickHeaderCheckbox = () => {
		if (paginatedItems.length === selectedItemIds.length && paginatedItems.length > 0) setSelectedItemIds([]);
		else setSelectedItemIds(paginatedItems.map((i) => i.id));
	}

	const handlePageChange = (newActivePageNumber) => {
		setActivePageNumber(newActivePageNumber);
	}

	const handleChangePageLength = (newPageLength) => {
		setPageLength(newPageLength);
	}

	const handleSortChange = (column) => {
		const newSortedState = {...sorted}

		if (sorted.column === column) {
			if (sorted.direction === "ascending") {
				newSortedState.direction = "descending";
			}
			else {
				newSortedState.direction = null;
				newSortedState.column = null;
			}
		}
		else {
			newSortedState.column = column;
			newSortedState.direction = "ascending";
		}

		setSorted(newSortedState);
	}

	return (
		<div className="App">
			<DataTable
				items={paginatedItems}
				selectedItemIds={selectedItemIds}
				activePageNumber={activePageNumber}
				pageCount={pageCount}
				pageLength={pageLength}
				pageLengthOptions={pageLengthOptions}
				sorted={sorted}
				onClickRowCheckbox={handleRowSelect}
				onClickHeaderCheckbox={handleClickHeaderCheckbox}
				onPageChange={handlePageChange}
				onChangePageLength={handleChangePageLength}
				onClickSort={handleSortChange}
			/>
		</div>
	);
}

export default App;
