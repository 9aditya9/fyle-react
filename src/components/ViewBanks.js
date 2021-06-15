import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		overflowX: 'auto',
		justifySelf: 'center',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 30,
		borderRadius: 50,
		boxShadow: '20px 20px 60px #f8f8fcdc, -20px -20px 60px #9998a844',
	},
	pos: {
		marginBottom: 12,
	},
	table: {
		display: 'block',
		// backgroundColor: 'aliceblue',

		alignItems: 'center',
		justifySelf: 'center',
		justifyContent: 'center',
	},
	tableItem: {
		borderRadius: 50,

	}

});




const ViewBanks = ({ Banks, banksid }) => {
	const classes = useStyles();
	console.log(banksid, Banks)
	if (!banksid || !Banks) {
		return <h1>Please provide a bank id to show it's details!</h1>
	}
	var bank = Banks.filter((value) => value.ifsc === banksid)[0]
	if (!bank) {
		return <h1>Please provide a bank id to show it's details!</h1>
	}
	console.log(bank)
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} color="black" gutterBottom>
					Bank's Detail
				</Typography>
				<Typography className={classes.table}>
					{
						Object.keys(bank).map((key) => (
								<table>
									{/* <th>{key}</th> */}
									<tr className={classes.tableItem}>
										<td><h4>{key.toUpperCase()}</h4></td>
										<td style={{fontSize: '30px'}}>~</td>
										<td style={{fontSize: '22px', color: 'rgb(157, 5, 212)'}}>{bank[key]}</td>
									</tr>
										<br/>
								</table>

						))
					}
				</Typography>
			</CardContent>
		</Card>
	)
};

export default ViewBanks;