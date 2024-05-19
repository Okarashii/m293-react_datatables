import React from "react";
import {
	TableRow,
	TableHeaderCell,
	TableHeader,
	TableFooter,
	TableCell,
	TableBody,
	Checkbox,
	Table,
	Pagination,
	Dropdown
} from "semantic-ui-react";

export default function DataTable({items, selectedItemIds, onClickRowCheckbox, onClickHeaderCheckbox, activePageNumber, onPageChange, pageCount, pageLength, pageLengthOptions, onChangePageLength}) {
	return (
		<Table celled>
			<TableHeader>
				<TableRow>
					<TableHeaderCell>
						<Checkbox
							indeterminate={!(items.length === selectedItemIds.length && items.length > 0) && selectedItemIds.length > 0}
							checked={items.length === selectedItemIds.length && items.length > 0}
							onClick={onClickHeaderCheckbox}
						/>
					</TableHeaderCell>
					<TableHeaderCell>ID</TableHeaderCell>
					<TableHeaderCell>Category</TableHeaderCell>
					<TableHeaderCell>Image</TableHeaderCell>
					<TableHeaderCell>Name</TableHeaderCell>
					<TableHeaderCell>Description</TableHeaderCell>
					<TableHeaderCell>Full Name</TableHeaderCell>
				</TableRow>
			</TableHeader>

			<TableBody>
				{items.map((i) => 
					<TableRow key={i.id}>
						<TableCell>
							<Checkbox checked={selectedItemIds.includes(i.id)} onClick={() => onClickRowCheckbox(i.id)}/>
						</TableCell>
						<TableCell>{i.id}</TableCell>
						<TableCell>{i.category}</TableCell>
						<TableCell>{i.image}</TableCell>
						<TableCell>{i.name}</TableCell>
						<TableCell>{i.description}</TableCell>
						<TableCell>{i.fullName}</TableCell>
					</TableRow>
				)}
			</TableBody>

			<TableFooter>
				<TableRow>
					<TableHeaderCell colSpan="7">
						<Pagination
							activePage={activePageNumber}
							totalPages={pageCount}
							boundaryRange={1}
							siblingRange={1}
							onPageChange={(e, {activePage}) => onPageChange(activePage)}
						/>
						<Dropdown options={pageLengthOptions} value={pageLength} onChange={(e, {value}) => onChangePageLength(value)}/>
					</TableHeaderCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

// export default DataTable;
