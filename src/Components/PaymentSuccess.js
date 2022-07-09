import React,{ Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class PaymentSuccess extends Component {

    render() {
        return(
            <div className="container" style={{ textAlign:"center"}}>
                <div class="alert alert-success">
                    <strong>Payment Success !</strong>

                </div>
                <link to ="/items" className="btn btn-info">Back to Items</link>
            </div> 
        )
    }
}

export default PaymentSuccess;