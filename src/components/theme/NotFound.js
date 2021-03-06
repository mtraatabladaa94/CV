/*
    No se encontró
*/
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100%',
    },
    image: {
        height: '100px',
    },
    informationSection: {
        maxWidth: '280px',
    },
    title: {
        fontSize: '18px',
        color: blueGrey[900],
        margin: '0px',
    },
    description: {
        fontSize: '16px',
        margin: '0px',
    },
});

const NotFound = ({classes, title, description, minHeight}) => {
    return(
        <section
            style={
                minHeight && {
                    minHeight: minHeight,
                }
            }
        >
            <section
                className={classes.container}
            >
                <img
                    className={classes.image}
                    src={process.env.PUBLIC_URL + '/res/not-found.webp'}
                    alt={'Not-Found.webp'}
                />
                <section
                    className={classes.informationSection}
                >
                    <h1
                        className={classes.title}
                    >
                        {title}
                    </h1>
                    <p
                        className={classes.description}
                    >
                        {description}
                    </p>
                </section>
            </section>
        </section>
    )
};

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    minHeight: PropTypes.string,
};

export default withStyles(styles)(NotFound);