import { renderChangePercent } from '../../../helpers';
import { Link, withRouter } from 'react-router-dom';
import withFetch from '../../../hoc';

const Table = (props) => {
    const { currencies, history } = props;  
    
  

    const handleHistoryPush = currencyId => {
        history.push(`/currency/${currencyId}`)

    }
    return (
        <div className="Table-container">
             <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <th>
                            Cryptocurrency
                               
                            </th>
                            <th>Price</th>
                            <th>Symbol</th>
                            <th>Market Cap</th>
                            <th>24H Change</th>
                        </tr>
                    </thead>

                    <tbody className="Table-body">
                        {
                            currencies.map(currency => {
                                return (
                                    <tr key={currency.id} onClick={() => handleHistoryPush(currency.id)}>
                                        <td  className="currency-name"  >
                                            <span>
                                                <img src={currency.image} alt={currency.name}/>
                                            </span>

                                            <span>
                                            {currency.name}
                                            </span>
                                        </td>

                                        <td>
                                            <span className="Table-dollar">$</span>
                                            {currency.current_price}
                                        </td>

                                        <td>
                                            ( {currency.symbol} )
                                        </td>

                                        <td>
                                            <span className="Table-dollar">$</span>
                                            {currency.market_cap}
                                        </td>

                                        <td>
                                            {renderChangePercent(currency.price_change_24h)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        </div>
    )
};
export default withRouter(Table);