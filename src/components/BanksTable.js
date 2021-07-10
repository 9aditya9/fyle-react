import React from 'react';
import './BanksTable.css'
import { useState, useEffect } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, TablePagination } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button'
import Favorite from '@material-ui/icons/Favorite'
import Checkbox from '@material-ui/core/Checkbox'
import BanksService from '../services/BanksService';
import { Link } from 'react-router-dom'

const BanksTable = ({ Banks, handleFav, favoritesIFSC }) => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(3)
	const [searched, setSearched] = useState("")
	const [searchOptions, setSearchOptions] = useState([])
	const[timer, setTimer] = useState("")

	const useStyles = makeStyles({
		root: {
			fontWeight: 'bolder',
			fontStyle: 'italic',
		},
		paperContainer: {
			maxHeight: 440,
		},
	})

	function debounce(func, timeout = 600){
		// console.log("hello", func);
		return (...args) => {
		  clearTimeout(timer);
		  const t = setTimeout(func, timeout);
		  setTimer(t)
		};
	      }
	function handleApiCall() {
		BanksService.GetSearchCompletion({ searched })
			.then(result => setSearchOptions(result))
			.catch(error => {
				alert('Search Completion Not Working')
			})
	}
	
	const handleDebounce = debounce(handleApiCall)
	useEffect(() => {
		// console.log(searched)
		handleDebounce()
	}, [searched])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value)
	}
	return (
		<div>

			<Paper className="paperContainer">
				<Autocomplete
					onClose={() => setSearched("")}
					options={searchOptions.map((val) => {
						if (searched === "") {
							return ""
						} else if (val.ifsc.toLowerCase().includes(searched.toLowerCase())) {
							return val.ifsc
						} else if (val.address.toLowerCase().includes(searched.toLowerCase())) {
							return val.address
						} else if (val.branch.toLowerCase().includes(searched.toLowerCase())) {
							return val.branch
						} else if (val.city.toLowerCase().includes(searched.toLowerCase())) {
							return val.city
						} else if (val.state.toLowerCase().includes(searched.toLowerCase())) {
							return val.state
						} else if (val.bank_name.toLowerCase().includes(searched.toLowerCase())) {
							return val.bank_name
						} else {
							return ""
						}
					}
					)}
					renderInput={(params) => {
						console.log(params);
						return (
							<TextField {...params} label="Search" margin="20px" variant="outlined" onChange={(event) => {
								if (event.target.value) {
									console.log(searched)
									setSearched(event.target.value)
								}
								else {
									console.log(searched)
									setSearched("")

								}
							}} />
						)
					}}
				/>


				<Table>
					<TableHead style={useStyles.root}>
						<TableRow>
							<TableCell><Button endIcon={<FavoriteBorderIcon />} >Fav</Button></TableCell>
							<TableCell>IFSC</TableCell>
							<TableCell>Bank Name</TableCell>
							<TableCell>Branch</TableCell>
							<TableCell>Address</TableCell>
							<TableCell>City</TableCell>
							<TableCell>District</TableCell>
							<TableCell>State</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							Banks.filter((val) => {

								if (searched === "") {
									return val
								} else if (val.ifsc.toLowerCase().includes(searched.toLowerCase())) {
									return val
								} else if (val.address.toLowerCase().includes(searched.toLowerCase())) {
									return val
								} else if (val.branch.toLowerCase().includes(searched.toLowerCase())) {
									return val
								} else if (val.city.toLowerCase().includes(searched.toLowerCase())) {
									return val
								} else if (val.state.toLowerCase().includes(searched.toLowerCase())) {
									return val
								} else if (val.bank_name.toLowerCase().includes(searched.toLowerCase())) {
									return val
								}
							}).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element, index) => {
								return (
									<TableRow hover key={index}>
										<TableCell>
											<Checkbox onChange={handleFav} icon={<FavoriteBorderIcon />} checkedIcon={<Favorite />} name="checkedH" checked={favoritesIFSC.includes(element.ifsc)} value={element.ifsc} />
										</TableCell>
										<TableCell>{element.ifsc}</TableCell>
										<TableCell style={{ color: 'blue' }}><Link to={"/fyle-react/banks/" + element.ifsc}>{element.bank_name}</Link></TableCell>
										<TableCell>{element.branch}</TableCell>
										<TableCell>{element.address}</TableCell>
										<TableCell>{element.city}</TableCell>
										<TableCell>{element.district}</TableCell>
										<TableCell>{element.state}</TableCell>
									</TableRow>
								)
							})
						}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[3, 5, 10, 24]}
					component='div'
					count={Banks.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
export default BanksTable;