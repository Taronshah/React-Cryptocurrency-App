import React from 'react';

const partnersDataModel = {
    firstName: '',
    lastName: '',
    password: '',
}

const regEx = {
    // name: /x/
}

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            ...partnersDataModel,
            isShowPassword: false,
            partners: [

            ]
        }
    }

    handleChangeInput = e => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    };

    handleAddPartner = (e) => {
        e.preventDefault();
        const { partners, ...partnersDataInfo } = this.state;
        partners.push(partnersDataInfo);
        this.setState({
            partners,
            ...partnersDataModel
        })
    }

    handleShowPassword = e => {
        const isChecked = e.target.checked;
        this.setState({
            isShowPassword: isChecked
        })
    };

    handleValidation = () => {
        let isValid = true;
        const { firstName, lastName, password } = this.state;
        if (firstName && lastName && password) {
            isValid = false;
        }

        return isValid;
    };

    render() {
        var number = '(077)00-10-35 Davo' ;
        const reg = /\(\d{3}\)\d{2}\-\d{2}\-\d{2}/;
        console.log(number.match(reg));

        const { firstName, lastName, password, isShowPassword } = this.state;
        return (
            <form onSubmit={this.handleAddPartner}>
                <input 
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChangeInput}
                />

                <input 
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChangeInput}
                />

                <label>
                    <input 
                        type="checkbox"
                        onChange={this.handleShowPassword}
                    />
                    <input 
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="password"
                        name="password"
                        value={password}
                        onChange={this.handleChangeInput}
                    />
                </label>
                

                <button disabled={this.handleValidation()}>
                    Submit
                </button>
                <div>
                    <pre>
                        {JSON.stringify(this.state.partners, null, 2)}
                    </pre>
                </div>

            </form>
        )
    }
}

export default Form;