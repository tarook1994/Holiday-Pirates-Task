import React, { PureComponent } from 'react';
import { Button, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import HotelComponent from '../../components/HotelComponent/HotelComponent'
import Card from '@material-ui/core/Card';
import axios from 'axios'


const styles = {
    contained: {
        background: '#1a7d9f',
        border: 0,
        borderRadius: 3,
        color: 'white',
        height: 48,
        width: '12rem',
        padding: '0 30px',
        minWidth: '5rem',
        '&:hover': {
            backgroundColor: '#289cc4',
        },
    },
    colorPrimary: {
        color: 'white',

    },
    errorCardStyle: {
        margin: '2rem 4rem 2rem 4rem',
        minHeight: '4rem'
    }
};


class HotelsContainer extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            hotels: [],
            loading: false,
            reviewShowed: "",
            reviews: []

        }
    }

    toggleReviewDisplay = (id) => {
        const { reviewShowed } = this.state;
        let currentViewedReview = reviewShowed;
        if (reviewShowed == id) {
            currentViewedReview = "";
            this.setState({ reviewShowed: currentViewedReview })

        } else {
            this.loadReviewsForHotel(id);
        }

    }

    loadReviewsForHotel = (hotelId) => {
        axios.get("http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=" + hotelId)
            .then(response => {
                const newReview = []
                newReview.push(response.data[0]);
                newReview.push(response.data[1]);
                this.setState({ reviews: newReview, reviewShowed: hotelId });
            })
            .catch(err => console.log(err))
    }

    onLoadClick = () => {
        this.setState({
            loading: true
        }, () => {
            axios.get("http://fake-hotel-api.herokuapp.com/api/hotels?count=10")
                .then(result => {
                    this.setState({ hotels: result.data, loading: false, error: false })
                })
                .catch(err => {
                    this.setState({ error: true, loading: false })
                });
        });
    }

    capitalizeName = (name) => {
        return name.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
    }

    render() {
        const { classes } = this.props;
        const { hotels, loading, error } = this.state;
        let errorView = null;
        if (error) {
            errorView = <Card classes={{ root: classes.errorCardStyle }}>
                <CardContent>
                    <Typography>An error occured. Please try again. </Typography>
                </CardContent>
            </Card>
        }

        let loadingButton = <Button
            variant="contained"
            size="large"
            classes={{ contained: classes.contained }}
            onClick={this.onLoadClick}>
            Load Hotels
             </Button>

        if (loading) {
            loadingButton = <Button variant="contained" size="large" classes={{ contained: classes.contained }}
                onClick={this.onLoadClick}>
                <CircularProgress color='primary' classes={{ circle: classes.colorPrimary }} />
            </Button>
        }


        return (
            <React.Fragment>

                {loadingButton}
                {errorView}
                {!error ? hotels.map(hotel => {
                    const { reviewShowed, reviews } = this.state;
                    const capticalInitialsName = this.capitalizeName(hotel.name);
                    const hotelObject = {
                        id: hotel.id,
                        name: capticalInitialsName,
                        city: hotel.city,
                        country: hotel.country,
                        description: hotel.description,
                        startDate: hotel.date_start,
                        endDate: hotel.date_end,
                        image: hotel.images[0],
                        stars: hotel.stars,
                        price: hotel.price,

                    }
                    return <HotelComponent
                        hotelObject={hotelObject}
                        key={hotel.id}
                        toggleReviewDisplay={this.toggleReviewDisplay}
                        showReview={reviewShowed.includes(hotel.id) ? true : false}
                        reviews={reviews}
                    />
                }) : null}
            </React.Fragment>
        )

    }
}

export default withStyles(styles)(HotelsContainer);