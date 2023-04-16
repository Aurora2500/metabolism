import { Container, Divider, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import Result from './Result';
import { Stat } from './types';

const numRegex = /^(\d*.\d+|\d+)([Ee][+-]?\d+)?$/;

type StatsForm = {
	gender: 'male' | 'female' | null,
	age: string,
	weight: string,
	height: string,
}


const toStat = (form: StatsForm):Stat | null => {
	const {gender, age, weight, height} = form;
	if(gender == undefined) return null;
	if(!numRegex.test(age)) return null;
	if(!numRegex.test(weight)) return null;
	if(!numRegex.test(height)) return null;

	return {
		gender,
		age: parseFloat(age),
		weight: parseFloat(weight),
		height: parseFloat(height),
	};
};

const Input = ({label, value, onChange, unit}: {label: string, value: string, onChange: (x: string) => void, unit: string}) => {
	return (
		<TextField
			label={label}
			value={value}
			onChange={x => onChange(x.target.value)}
			error={value !== '' && !numRegex.test(value)}
			helperText={value !== '' && !numRegex.test(value) ? 'Must be a number' : ''}
			InputProps={{
				endAdornment: <InputAdornment position="end" >{unit}</InputAdornment>,
			}}
		/>
	);
};

function App() {

	const [form, setForm] = useState({
		gender: null as 'male' | 'female' | null,
		age: '',
		weight: '',
		height: '',
	});

	const stats = toStat(form);


	return (
		<Container sx={{mt: 10}}>
			<Stack gap={4}>
				<Paper sx={{p: 5}}>
					<Stack direction="row" gap={8}>
						<Stack gap={5} sx={{minWidth: 200}}>
							<FormControl>
								<FormLabel>Gender</FormLabel>
								<RadioGroup
									row
									value={form.gender}
									onChange={x => setForm(s => ({...s, gender: x.target.value as 'male' | 'female'}))}
								>
									<FormControlLabel value="male" control={<Radio />} label="Male"/>
									<FormControlLabel value="female" control={<Radio />} label="Female"/>
								</RadioGroup>
							</FormControl>
							<Input
								label="age"
								value={form.age}
								onChange={x => setForm(s => ({...s, age: x}))}
								unit="years"
							/>
							<Input
								label="height"
								value={form.height}
								onChange={x => setForm(s => ({...s, height: x}))}
								unit="cm"
							/>
							<Input
								label="weight"
								value={form.weight}
								onChange={x => setForm(s => ({...s, weight: x}))}
								unit="kg"
							/>
						</Stack>
						<Divider orientation='vertical' flexItem/>
						<Typography>
							This is a toy app to calculate your BMR and BMI, along with some graphics & predictions.
							This was made by me, <a href="https://github.com/Aurora2500">Aurora</a>, someone who is into software development and web development.
							Notably, I am not a nutritionist or a doctor, so please don&apos;t take this as medical advice.
							The formulas and equations used are from the first results of google searches. 
						</Typography>
					</Stack>
				</Paper>
				<Paper sx={{p: 5}}>
					<Typography variant='h5' color='primary'>Results</Typography>
					{
						stats == null ? (
							<Typography variant='h6' color='error'>Please fill out all fields</Typography>
						) : (
							<Result stats={stats}/>
						)
					}
				</Paper>
			</Stack>
		</Container>
	);
}

export default App;
