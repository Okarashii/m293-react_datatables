import './App.css';
import DataTable from './components/DataTable';
import { useEffect, useState } from 'react';
import items from './database.json';

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
	useEffect(() => {setSelectedItemIds([])}, []);

	useEffect(() => {
		setPaginatedItems(items.filter((e, i) => i >= pageLength * (activePageNumber-1) && i < pageLength * activePageNumber));
		setPageCount(Math.ceil(items.length / pageLength))
	}, [pageLength, activePageNumber]);

	const handleRowSelect = (id) => {
		if (selectedItemIds.includes(id)) setSelectedItemIds(selectedItemIds.filter((i) => i !== id));
		else setSelectedItemIds([...selectedItemIds, id]);
	}

	const handleClickHeaderCheckbox = () => {
		if (paginatedItems.length === selectedItemIds.length && paginatedItems.length > 0) setSelectedItemIds([]);
		else setSelectedItemIds(paginatedItems.map((i) => i.id));
	}

	const handlePageChange = (activePage) => {
		setSelectedItemIds([]);
		setActivePageNumber(activePage);
	}

	const handleChangePageLength = (newPageLength) => {
		setPageLength(newPageLength);
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
				onClickRowCheckbox={handleRowSelect}
				onClickHeaderCheckbox={handleClickHeaderCheckbox}
				onPageChange={handlePageChange}
				onChangePageLength={handleChangePageLength}
			/>
		</div>
	);
}

export default App;
