import React from 'react';

const withFetch = (Component) => {
    return class extends React.Component {
        constructor() {
            super();
        }

        getData() {
            console.log('data')
        }
        render() {
            
            return (
                <Component 
                    {...this.props}
                    onGetData={this.getData}
                    x={10}
                />
        )
        }
    }
};

export default withFetch;

