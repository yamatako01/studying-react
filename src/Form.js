import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
	root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	textField: {
	  marginLeft: theme.spacing.unit,
	  marginRight: theme.spacing.unit,
	  width: 200,
	},
	textAreaField: {
	  marginLeft: theme.spacing.unit,
	  marginRight: theme.spacing.unit,
	  width: 500,
	},

	formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
	},
	button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
	},
	div: {
		clear: "both",
		float: 'left',
		marginRight: "40px",
		paddingTop: "8px",
	},
	divCr: {
		float: 'left',
		/* height: "80px",*/
	},
	divCrTextArea: {
		clear: "both",
	},

	radio: {
		float: 'left',
		marginTop: "16px",
	},
  });
  
/** 投稿フォーム */
class Form extends Component {

	state = {
		...this.createInitialForm()
	}

	/** フォームの初期表示内容を構築する */
	createInitialForm() {
		return {
			name: "",
			sex: "1",
			birthDay: "1990-01-01",
			age: "",
			body: "",
		};
	}

	/** 名前への入力を処理する */
	handleChangeName(event) {
		this.setState({
			name: event.target.value
		});
	}

	/** 性別への入力を処理する */
	handleChangeSex(event) {
    this.setState({
			sex: event.target.value
		});
	}
	
	/** 生年月日への入力を処理する */
	handleChangeBirthDay(event) {
    this.setState({
			birthDay: event.target.value
		});
	}

	/** 年齢への入力を処理する */
	handleChangeAge(event) {
		this.setState({
			age: event.target.value
		});
	}

	/** 本文への入力を処理する */
	handleChangeBody(event) {
		this.setState({
			body: event.target.value
		});
	}
  
	/** 投稿処理を行う */
	handleSubmit(event) {
		// submitのデフォルト動作では
		// 画面が再描画されてしまうので阻止する
		event.preventDefault();

		const { name,
						sex,
						birthDay,
						age,
						body,
						} = this.state;

		// 名前のバリデーション
		if ( !name || name.length === 0 ) {
			alert("名前が未入力です");
			return;
		}

		// 本文のバリデーション
		if ( !body || name.body === 0 ) {
			alert("本文が未入力です");
			return;
		}

		// 投稿内容を作成する
		const newPost = {
			name,
			sex,
			birthDay,
			age,
			body,
		};

		// 投稿する
		this.props.onSubmitNewPost(newPost);

		// フォームの内容をリセットする
		this.setState({
			...this.createInitialForm()
		});
	}

  ajaxJson() {
		console.log(this.props.posts);
		const datas = JSON.stringify({
			datas: this.props.posts
		});
		console.log(datas);
		/*
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: this.refs.newText.value
      }),
      headers: new Headers({ 'Content-type' : 'application/json' })
    }).then( () => {
      // 送信成功

		})
		*/
  }
 
	render() {
		const { classes } = this.props;
		return (
			<form onSubmit={(event) => this.handleSubmit(event)}
					noValidate autoComplete="off"> 
				<div className={classes.root}>
					<AppBar position="static">
						<Toolbar>
							<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.grow}>
								メンバー登録
							</Typography>
							<Button color="inherit">Login</Button>
						</Toolbar>
					</AppBar>
				</div>

				{/* 単一行テキスト */}
				<div className={classes.div}>
					<TextField
						id="standard-name"
						label="名前"
						className={classes.textField}
						value={this.state.name}
						onChange={(event) => this.handleChangeName(event)}
						margin="normal"
        			/>
				</div>
				{/* ラジオボタン */}
				<div className={classes.divCr}>
					<FormControlLabel className={classes.radio}
						control={
							<Radio
							checked={this.state.sex === '1'}
							onChange={(event) => this.handleChangeSex(event)}
							value="1"
							name="radio-button-sex"
							aria-label="1"
						/>
							}
						label="男性"
					/>
					<FormControlLabel className={classes.radio}
						control={
							<Radio
							checked={this.state.sex === '2'}
							onChange={(event) => this.handleChangeSex(event)}
							value="2"
							name="radio-button-sex"
							aria-label="2"
						/>
							}
						label="女性"
					/>
				</div>
				{/* Date picker */}
				<div className={classes.div}>
					<TextField
						id="birthDay"
						label="生年月日"
						type="date"
						defaultValue={this.state.birthDay}
						className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				{/* セレクトボックス */}
				<div className={classes.divCr}>
					<FormControl className={classes.formControl}>
        	  <InputLabel htmlFor="age-simple">年齢</InputLabel>
						<Select
							value={this.state.age}
							onChange={(event) => this.handleChangeAge(event)}
							inputProps={{
								name: 'age',
								id: 'age-simple',
							}}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={Ages.TEEN}>10代</MenuItem>
							<MenuItem value={Ages.TWENTIES}>20代</MenuItem>
							<MenuItem value={Ages.THIRTIES}>30代</MenuItem>
							<MenuItem value={Ages.FOURTIES}>40代</MenuItem>
							<MenuItem value={Ages.FIFTIES}>50代</MenuItem>
						</Select>
        	</FormControl>
				</div>
				{/* 複数行テキスト */}
				<div className={classes.divCrTextArea}>
					<TextField
						id="standard-multiline-flexible"
						label="本文"
						multiline
						rowsMax="10"
						value={this.state.body}
						onChange={(event) => this.handleChangeBody(event)} 
						className={classes.textAreaField}
						margin="normal"
      		/>
				</div>
				<div>
					<Button type="submit" variant="contained" color="primary" className={classes.button}>
						追加
					</Button>
					<Button variant="contained" className={classes.button} onClick={(event) => this.ajaxJson(event)}>
						送信
					</Button>
				</div>
			</form>
		);
	}
}

export const Ages = {
	TEEN: "teen",
	TWENTIES: "twenties",
	THIRTIES: "thirties",
	FOURTIES: "fourties",
	FIFTIES: "fifties",
};
Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);

//export default Form;