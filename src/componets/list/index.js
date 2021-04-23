import React, { Component } from 'react';
import { API_URL } from '../../config';
import { renderChangePercent } from '../../helpers'; 
import Loading from '../common/loading';
import Table from './table';
import Pagination from './pagination';
import './index.css';

class List extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            totalPages: 0,
            perPage: 5,
            currencies: [],
            loading: false,
            error: null,
        };
        
    }

    handleFetchCurrencies() {
        this.setState({
            loading: true
        });

        const { page, perPage } = this.state;
        fetch(`${API_URL}/coins/markets/?vs_currency=usd&page=${page}&per_page=${perPage}`)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            this.setState({
                currencies: data,
                loading: false
            })
        })
    }

    componentDidMount() {
        this.handleFetchCurrencies()
    }
     
    componentDidUpdate(x, prevState) {
        if (prevState.page !== this.state.page) {
            this.handleFetchCurrencies();
        }

        if(prevState.perPage !== this.state.perPage) {
            this.handleFetchCurrencies();
        }
    }

    handlePaginationClick = (direction) => {
        let page = this.state.page;
        page = direction === 'next' ? page + 1 : page - 1;
        this.setState({
            page
        })

        // this.setState({
        //     page
        // }, () => {
        //     this.handleFetchCurrencies()
        // })
    }

    handleSelectChange = e => {
        const { value } = e.target;
        console.log(e.target.value);
        this.setState({
            perPage: value
        })
    }

    

    render() {
        const { currencies, loading, page, perPage } = this.state;
        if (loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            )
        }

        return (
            <>
                <select onChange={this.handleSelectChange} value={perPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                </select>
                <Table 
                   currencies={currencies} 
                />

                <Pagination 
                    page={page}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </>
        )
    }
}

export default List;
