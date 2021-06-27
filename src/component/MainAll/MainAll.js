import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import styles from './MainAll.module.sass'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MicNone } from '@material-ui/icons';

function MainAll() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // // Note: the empty deps array [] means
    // // this useEffect will run once
    // // similar to componentDidMount()
    useEffect(() => {
        fetch("https://mis.twse.com.tw/stock/data/all_etf.txt", {
            mode: 'cors'
            // cache: 'no-cache'
            // header: {
            //     'Access-Control-Allow-Origin': '*'
            // }
        })
            .then(res => res.json())
            // .then(res => console.log(res))
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {/* {items.map(item => (
                    <li key={item.id}>
                        {item.name} {item.price}
                    </li>
                ))} */}
            </ul>
        );
    }
    // return (
    //     <div>
    //         <Search></Search>
    //         <ETFTable></ETFTable>
    //     </div>
    // )
}

function Search() {

    return (
        <Paper component="form" className={styles.root}>
            {/* <IconButton className={styles.search.iconButton} aria-label="menu">
            </IconButton> */}
            <InputBase
                className={styles.input}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton className={styles.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}


var data = {
    header: [
        "代碼", "名稱", "淨值", "市值", "折溢價", "折溢%"
    ],
    content: [
        {
            number: "0050",
            name: "元大台灣50",
            net_worth: "137.24",
            market_price: "136.95",
            discount: -0.29,
            discount_rate: -0.21
        },
        {
            number: "0050",
            name: "元大台灣50",
            net_worth: "137.24",
            market_price: "136.95",
            discount: -0.29,
            discount_rate: -0.21
        },
        {
            number: "0050",
            name: "元大台灣50",
            net_worth: "137.24",
            market_price: "136.95",
            discount: -0.29,
            discount_rate: -0.21
        }
    ]
}

function ETFTable() {

    return (
        <TableContainer component={Paper}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {data.header.map((col) => (
                            <TableCell >{col}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.content.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.number}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.net_worth}</TableCell>
                            <TableCell>{row.market_price}</TableCell>
                            <TableCell>{row.discount}</TableCell>
                            <TableCell>{row.discount_rate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MainAll;
