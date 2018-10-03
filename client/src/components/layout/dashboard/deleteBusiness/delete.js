import React, { Component } from 'react'
import { Responsive, Segment, Header, Loader, Button, Breadcrumb } from 'semantic-ui-react';
import { grabMany } from '../../../util/logic';

export default class Delete extends Component {
    
    state = {
        businessArray: [],
        loading: true
    }

    async componentDidMount() {
        console.log("did mount")
        const Token = JSON.parse(localStorage.getItem('okta-token-storage'));

        if (!Token.hasOwnProperty("userId")) {
            console.log("You have no token yet");
        } else {
            try {
                const data = await grabMany(Token.userId)

                console.log("grabMany returned:", data);

                this.setState({
                    businessArray: data,
                    loading: false
                })
            } catch (e) {
                console.log(e);
            }
        }
    }

    deleteCurrentBusiness = (businessID) => {
        
        this.props.history.push("/business/select")
    }
    

    render() {

        const businessList = this.state.businessArray.map((business) =>
            <Segment key={business._id}>
                <Header>
                    {business.businessName}
                </Header>
                <Button negative floated='right' type='submit'>Delete Business</Button>
                <span>Street Address: {business.streetAddress}</span>
                <br></br>
                <span>Email: {business.eMail}</span>
                <br></br>
                <span>Business Phone: {business.businessPhone}</span>
                <br></br>
                <span>Cell Phone: {business.cellPhone}</span>
            </Segment>);

        const ifLoading = this.state.loading ? (
            <Responsive>
                <Loader size='massive' active inline='centered'>Loading Content</Loader>
            </Responsive>
        ) : (
                <Responsive>
                    <Segment.Group className='shadow'>
                        {businessList}
                    </Segment.Group>
                </Responsive>
            );

        return (
            <div>
                {ifLoading}
            </div>
        )
    }
}
