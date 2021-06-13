import { makeStyles } from '@material-ui/core';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
const useStyles = makeStyles((theme) => ({
	button: {
		display: 'block',
	},
	root: {
		minWidth: 120,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		justify: 'center',
		width: '100%',
		marginTop: theme.spacing(5),
	},
	select: {
		fontSize: '30px',
		padding: '2px',
	},
}))

const Dropdown = ({ city, cityOptions, handleCityChange }) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	return (
		<div>
			<FormControl className={classes.root}>
				<Select className={classes.select}
					open={open}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					value={city}
					onChange={handleCityChange}
				>
					{
						cityOptions.map((city) => (
							<MenuItem value={city.value} key={city.value}>{city.label}</MenuItem>

						))}
				</Select>
			</FormControl>
		</div>
	);
}

export default Dropdown;