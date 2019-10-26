import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import AspectRatio from 'react-aspect-ratio';
import 'react-aspect-ratio/aspect-ratio.css'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import ReviewItem from './ReviewItem/ReviewItem'
import Moment from 'react-moment';

const useStyles = makeStyles({
    card: {

        margin: '2rem 10rem 2rem 10rem'

    },
    cardContent: {
        padding: '0',
        paddingBottom: '0',
        /* This is due to Material UI adding paddingButton to every card Content
        */
        '&:last-child': {
            paddingBottom: '0',
        },
    },
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
    }

});

function renderImage(hotelObject) {

    return <Grid item xs={4}>
        <AspectRatio ratio="4/3" style={{ maxWidth: '40rem' }}>
            <img src={hotelObject.image} alt="" />
        </AspectRatio>
    </Grid>
}

function renderTitle(hotelObject) {
    return <Grid item xs={9}>
        <Typography variant="h4" >
            {hotelObject.name}
        </Typography>
    </Grid>
}

function renderRating(hotelObject) {
    return <Grid item xs={3}>
        <Rating name="disabled" value={hotelObject.stars} disabled />
    </Grid>
}

function renderCountryAndCity(hotelObject) {
    return <Typography variant="body2" gutterBottom>
        {`${hotelObject.city} - ${hotelObject.country}`}
    </Typography>
}

function renderDescription(hotelObject) {
    return <Typography variant="body2" gutterBottom>
        {hotelObject.description}
    </Typography>
}

function renderStartEndDates(hotelObject) {
    return <Typography>
        <Moment format="MM.DD.YYYY">
            {hotelObject.startDate}
        </Moment>
        {` - `}
        <Moment format="MM.DD.YYYY">
            {hotelObject.endDate}
        </Moment>
    </Typography>
}

function renderShowHideReviews(classes, props) {
    return <Grid item xs={3}>
        <Button variant="contained" component="span" classes={{ contained: classes.contained }} onClick={() => props.toggleReviewDisplay(props.hotelObject.id)}>
            {props.showReview ? 'Hide Reviews' : 'Show Reviews'}
        </Button>
    </Grid>
}

export default function HotelComponent(props) {
    const classes = useStyles();
    const { showReview, hotelObject } = props;

    return (
        <Card className={classes.card}>
            <CardContent classes={{ root: classes.cardContent }}>
                <Grid container >
                    {renderImage(hotelObject)}
                    <Grid item xs={8}>
                        <Grid container style={{ paddingTop: '1.5rem', paddingLeft: '1rem', textAlign: 'left' }}>
                            {renderTitle(hotelObject)}
                            {renderRating(hotelObject)}
                        </Grid>
                        <Grid container style={{ paddingLeft: '1rem' }}>
                            {renderCountryAndCity(hotelObject)}
                        </Grid>
                        <Grid container style={{ paddingLeft: '1rem', paddingRight: '1rem', minHeight: '6rem', marginTop: '2rem', textAlign: 'left' }} >
                            {renderDescription(hotelObject)}
                        </Grid>
                        <Grid container style={{ paddingLeft: '1rem' }}>
                            {renderShowHideReviews(classes, props)}
                            <Grid item xs={6} />
                            <Grid item xs={3}>
                                <Grid container>
                                    <Typography variant="h4">{`${props.hotelObject.price} €`}</Typography>
                                </Grid>
                                <Grid container>
                                    {renderStartEndDates(hotelObject)}
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {showReview ? <ReviewItem content={props.reviews} /> : null}

            </CardContent>
        </Card>
    )
}
