import './DataTable.css';
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

export default function DataTable({items, selectedItemIds, onClickRowCheckbox, onClickHeaderCheckbox, activePageNumber, onPageChange, pageCount, pageLength, pageLengthOptions, onChangePageLength, onClickSort, sorted}) {
	return (
		<Table celled selectable sortable className="data-table">
			<TableHeader>
				<TableRow>
					<TableHeaderCell>
						<Checkbox
							indeterminate={!(items.length === selectedItemIds.length && items.length > 0) && selectedItemIds.length > 0}
							checked={items.length === selectedItemIds.length && items.length > 0}
							onClick={onClickHeaderCheckbox}
						/>
					</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "id" ? sorted.direction : null} 				onClick={() => onClickSort("id")}>ID</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "category" ? sorted.direction : null} 		onClick={() => onClickSort("category")}>Category</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "image" ? sorted.direction : null}			onClick={() => onClickSort("image")}>Image</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "name" ? sorted.direction : null} 			onClick={() => onClickSort("name")}>Name</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "description" ? sorted.direction : null} 	onClick={() => onClickSort("description")}>Description</TableHeaderCell>
					<TableHeaderCell sorted={sorted.column === "fullName" ? sorted.direction : null} 		onClick={() => onClickSort("fullName")}>Full Name</TableHeaderCell>
				</TableRow>
			</TableHeader>

			<TableBody>
				{items.map((i) => 
					<TableRow key={i.id} active={selectedItemIds.includes(i.id)}>
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
						<div className="pagination-cell">
							<Dropdown
								compact
								options={pageLengthOptions}
								value={pageLength}
								selection
								onChange={(e, {value}) => onChangePageLength(value)}
							/>

							<Pagination
								activePage={activePageNumber}
								totalPages={pageCount}
								boundaryRange={1}
								siblingRange={1}
								onPageChange={(e, {activePage}) => onPageChange(activePage)}
							/>
						</div>
					</TableHeaderCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}