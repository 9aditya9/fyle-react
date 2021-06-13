import React, { useState } from 'react';
import './BanksTable.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Favorite from '@material-ui/icons/Favorite'
import Checkbox from '@material-ui/core/Checkbox'

const Favorites = ({ favorites, removeFav }) => {
	const [favSearched, setFavSearched] = useState("")

	const useStyles = makeStyles({
		root: {
			fontWeight: 'bolder',
			fontStyle: 'italic',
		},
		paperContainer: {
			maxHeight: 440,
		},
	})


	return (
		<div>
			<Paper className="paperContainer">
				<TextField lable="Search" variant="outlined" onChange={(e) => setFavSearched(e.target.value)} />
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
							favorites.filter((val) => {
								if (favSearched === "") {
									return val
								} else if (val.ifsc.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								} else if (val.address.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								} else if (val.branch.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								} else if (val.city.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								} else if (val.state.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								} else if (val.bank_name.toLowerCase().includes(favSearched.toLowerCase())) {
									return val
								}
							}).map((element, index) => (
								<TableRow hover key={index}>
									<TableCell>
										<Checkbox onChange={removeFav} icon={<FavoriteBorderIcon />} checkedIcon={<Favorite />} name="checkedH" value={element.ifsc} checked={true} />
									</TableCell>
									<TableCell>{element.ifsc}</TableCell>
									<TableCell style={{ color: 'blue' }}>{element.bank_name}</TableCell>
									<TableCell>{element.branch}</TableCell>
									<TableCell>{element.address}</TableCell>
									<TableCell>{element.city}</TableCell>
									<TableCell>{element.district}</TableCell>
									<TableCell>{element.state}</TableCell>
								</TableRow>
							))

						}
					</TableBody>

				</Table>



			</Paper>
		</div>
	);
}

export default Favorites;