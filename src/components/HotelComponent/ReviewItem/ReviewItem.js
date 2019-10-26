import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
    card: {
        marginLeft: '10rem',
        marginRight: '10rem',
        marginBottom: '2rem'

    },
    cardContent: {
        padding: '0',
    },
    fabStyles: {
        color: 'white',
        backgroundColor: '#1a7d9f'
    }

});

function renderPositiveFab(classes, content, index) {

    return <Grid item xs={2} style={{ paddingTop: '1rem' }}>
        <Fab classes={{ root: classes.fabStyles }} >
            {content[index].positive ? <AddIcon /> : <RemoveIcon />}
        </Fab>
    </Grid>
}

function renderName(content, index) {
    return <Grid container style={{ textAlign: 'left' }}>
        <Grid item xs={8}>
            <Typography variant="h5" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                {content[index].name}
            </Typography>
        </Grid>
        <Grid item xs={4}>
        </Grid>
    </Grid>
}

function renderComment(content, index) {
    return <Grid container style={{ textAlign: 'left' }}>
        <Typography variant="body2" style={{ paddingBottom: '1rem' }}>
            {content[index].comment}
        </Typography>
    </Grid>
}

function RenderReview(props, index) {
    const classes = useStyles();
    const { content } = props;

    if (content[index]) {
        return (
            <Grid container >
                {renderPositiveFab(classes, content, index)}
                <Grid item xs={10}>
                    {renderName(content, index)}
                    {renderComment(content, index)}
                </Grid>
            </Grid>
        )
    }

}


const ReviewItem = (props) => {

    return (
        <React.Fragment>
            {RenderReview(props, 0)}
            <Divider variant="middle" />
            {RenderReview(props, 1)}
        </React.Fragment>

    )
}
export default ReviewItem;