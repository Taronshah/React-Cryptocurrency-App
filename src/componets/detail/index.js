import React from 'react';
import { API_URL } from '../../config';
import Loading from '../common/loading';
import { renderChangePercent, filterCurrencyData } from '../../helpers';
import './index.css';

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            currency: {
               
            },
            error: null,
            loading: false,
            isOpenPriceList: false,
            priceInput: ''
        }
    }
    componentDidMount() {
        this.setState({
            loading: true
        })

        const currencyId = this.props.match.params.id;
        fetch(`${API_URL}/coins/${currencyId}`)
        .then(resp => {
            return resp.json()
        })
        .then(dataCurrency => {
            this.setState({
                loading: false,
                currency: filterCurrencyData(dataCurrency)
            })
        })
    }


    handleIsOpenPriceList = () => {
        this.setState({
            isOpenPriceList: !this.state.isOpenPriceList
        })
    };

    filterCurrency() {
        const { priceInput, currency : {currencyList} } = this.state;
        
        if (priceInput.trim()) {
            const result = currencyList.filter((item) => {
                return item.name.match(priceInput)
            });

           return result
        }
        return currencyList;
    }

    handleChangeInput = (e) => {
        let { name, value } = e.target;
      
        this.setState({
            [name]: value.toLowerCase()
        })
        
    }

    renderPriceTypeList() {
        const { currency, error, loading } = this.state;
        console.log(this.state, 'state')
        return (
            <div className="Search-result-container">
                {
                    this.filterCurrency().map(item => {
                        return (
                            <div className="Search-result">
                                ({item.name}) {item.value} 
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const { currency, error, loading, isOpenPriceList } = this.state;
        console.log(this.state.currency);
        if (loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            );
        }

    
        return (
            <div className="Detail">
                 <h1 className="Detail-heading">
                     <span>
                        {currency.name} ({currency.symbol})  
                     </span>
                    <img src={currency.currencyImg} alt=""/>
                </h1>

                <div className="Detail-container">
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currency.marketCapRank}</span>
                    </div>

                    <div className="Detail-item">
                        24H change
                        <span className="Detail-value">
                            {renderChangePercent(currency.priceChange24h)}
                        </span>
                    </div>
                    <div className="Detail-item">
                        <div>
                            <span onClick={this.handleIsOpenPriceList}> 
                                Current Price 
                            </span>
                            <span className="Detail-value">(usd) 5490</span>
                        </div>

                       <div>
                        { isOpenPriceList && (
                            <div>
                                <input 
                                    type="text"
                                    name="priceInput"
                                    className="Search-input"
                                    placeholder="Currency Price"
                                    onChange={this.handleChangeInput}
                                />
                                {this.renderPriceTypeList()}
                            </div>
                        )}
                       </div>
                    </div>
                </div>
            </div>
        )
    }
};


export default Detail;