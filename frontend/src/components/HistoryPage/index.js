import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Paper, TextField, Divider } from "@material-ui/core";
import GetData from '../GetData';
import GetDatePicker from '../DatePicker';

const useStyles = makeStyles({
  paperResult: {
    margin: "1vh",
    padding: "1vh",
    textAlign: "center",
  },
});

const HistoryPage = () => {
  const classes = useStyles();
  const [symbol, setSymbol] = React.useState([]);
  const [error, seterror] = React.useState();
  const [fromDate, setFromDate] = React.useState();
  const [toDate, setToDate] = React.useState();
  const [populateArray, setPopulateArray] = React.useState();
  const [requestName, setRequestName] = React.useState();
  const [requestOpenPrice, setRequestOpenPrice] = React.useState();
  const [requestPricedAt, setRequestPricedAt] = React.useState();

  const handleChangeSymbol = (event) => {
    setSymbol(event.target.value);
  }

  const submit = async () => {
    const query = {
      "from": fromDate,
      "to": toDate
    };
    try {
      const result = await GetData("get", `/stocks/${symbol}/history`, query);
      const { name, lastPrice, pricedAt } = result;
      setRequestName(name);
      setRequestOpenPrice(String(lastPrice.toFixed(2)).replace(".", ","));
      setRequestPricedAt(pricedAt);
    } catch (err) {
      seterror(err);
    }
  }

  const getDates = async () => {
    try {
      const result = await GetData("get", `/stocks/${symbol}/populate`);
      setPopulateArray(result);
    } catch (err) {
      seterror(err);
    }
  }


  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6} >
        <Paper elevation={4} style={{ padding: "5vh", textAlign: "center" }}>
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item xs={6}>
              <TextField
                size="small"
                id="stock-quote"
                style={{ marginTop: "2vh" }}
                label="Código Ação"
                placeholder="ex.: PETR4.SAO"
                value={symbol}
                onChange={handleChangeSymbol}
                required
                variant="outlined"
              />
              <Button
                style={{ margin: "2vh" }}
                size="medium"
                type="submit"
                color="primary"
                variant="outlined"
                onClick={() => getDates()}
              >Datas</Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" >
            <Grid item xs={4}>
              Data Inicial
              <GetDatePicker onDateChange={setFromDate} />
            </Grid>
            <Grid item xs={4}>
              Data Final
              <GetDatePicker onDateChange={setToDate} />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="flex-end" >
            <Button
              style={{ margin: "2vh" }}
              size="medium"
              type="submit"
              color="primary"
              variant="outlined"
              onClick={() => submit()}
            >
              Buscar
            </Button>
          </Grid>
          {(requestName
            ? <React.Fragment>
              <Divider />
              <Grid container justifyContent="center" alignItems="center" >
                <Grid item xs={12} >
                  <Paper className={classes.paperResult} >
                    Data da Cotação: {requestPricedAt}
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Paper className={classes.paperResult}>
                    Código Ação: {requestName}
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Paper className={classes.paperResult}>
                    Valor Atual (em reais): R${requestOpenPrice}
                  </Paper>
                </Grid>
              </Grid>
            </React.Fragment>
            : error
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default HistoryPage;